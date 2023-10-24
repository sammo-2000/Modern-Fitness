import bcrypt from 'bcrypt'
import util from 'util';
import login_schema from '../schema/login_schema.js'
import signup_schema from '../schema/signup_schema.js'
import password_schema from '../schema/password_schema.js'
import User_Model from '../models/user.js'
import Password_Model from '../models/Password.js'
import _email from '../email/send_mail.js'
import crypto from 'crypto'

const User = new User_Model()
const Password = new Password_Model()

const login_post = async (req, res) => {
    const { email, password } = req.body

    // Handle errors
    const { error, value } = login_schema(req.body)
    if (error) {
        return res.status(400).json({ type: 'error', message: error.details[0].message })
    }

    // Try to login
    try {
        const data = await User.get_user_by_email(email);
        if (data) {
            const compareAsync = util.promisify(bcrypt.compare);
            const result = await compareAsync(password, data.password);

            if (result) {
                if (User.id) {
                    req.session.user_id = User.id;
                    req.session.first_name = User.first_name;
                    req.session.last_name = User.last_name;
                    req.session.role = User.role;
                    return res.status(200).json({ type: 'success', message: 'User logged in successfully' });
                } else {
                    return res.status(500).json({ type: 'error', message: 'Internal server error' });
                }
            } else {
                // Incorrect password
                return res.status(400).json({ type: 'error', message: 'Incorrect credentials' });
            }
        } else {
            // Incorrect email
            return res.status(400).json({ type: 'error', message: 'Incorrect credentials' });
        }
    } catch (error) {
        console.error('Controller auth:', error);
        return res.status(500).json({ type: 'error', message: 'Internal server error' });
    }
}


const signup_post = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    // Handle errors
    const { error, value } = signup_schema(req.body)
    if (error) {
        return res.status(400).json({ type: 'error', message: error.details[0].message })
    }

    // Try to create new user 
    try {
        const data = await User.get_user_by_email(email)
        if (data) {
            // Email already taken
            return res.status(400).json({ type: 'error', message: 'Email already in use' })
        }

        const access_code = await get_access_code()

        const hashAsync = util.promisify(bcrypt.hash);
        const hashed_password = await hashAsync(password, 10)

        await User.signup(first_name, last_name, email, hashed_password, access_code)

        await User.get_user_by_email(email)

        await _email.main(email, "Welcome to " + process.env.APP_NAME, 'welcome', {
            first_name: User.first_name,
            last_name: User.last_name,
            access_code: User.access_code
        })

        login_post(req, res)
    } catch (error) {
        console.error('Controller auth:', error);
        return res.status(500).json({ type: 'error', message: 'Internal server error' })
    }

}

const password_reset_get_email = async (req, res) => {
    const { email } = req.body

    // Handle errors
    const { error, value } = password_schema(req.body)
    if (error) {
        return res.status(400).json({ type: 'error', message: error.details[0].message })
    }

    try {
        const data = await User.get_user_by_email(email)
        if (data) {
            // Delete old password reset data
            await Password.delete_old_data()
            // Check if email already sent
            const password_data = await Password.get_data_by_email(email)
            if (password_data) {
                return res.status(400).json({ type: 'error', message: 'Email already sent' })
            } else {
                // Create unique ID for password reset
                const reset_link = process.env.HTTP + process.env.DOMAIN + ':' + process.env.PORT + '/reset-password/' + crypto.randomBytes(32).toString('hex')
                // Save it in database
                await Password.insert_data(email, reset_link)
                // Send email with link to reset password
                await _email.main(email, "Reset your password", 'reset_password', {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    reset_link: reset_link
                })
                return res.status(200).json({ type: 'success', message: 'Email sent' })
            }
        } else {
            return res.status(400).json({ type: 'error', message: 'Email not found' })
        }
    } catch (error) {
        console.error('Controller auth:', error)
        return res.status(500).json({ type: 'error', message: 'Internal server error' })
    }
}

const load_reset_password_page = async (req, res) => {
    const reset_link = process.env.HTTP + process.env.DOMAIN + ':' + process.env.PORT + '/reset-password/' + req.params.id
    const data = await Password.get_data_by_link(reset_link)
    if (data) {
        res.render('auth/reset-password-link', { title: 'Reset Password', session: req.session, id: req.params.id })
    } else {
        res.status(404).render('404', { title: 'Page not found', session: req.session })
    }
}

const password_reset = async (req, res) => {
    try {
        // Get data from request
        const { email, password } = req.body

        // Handle errors
        const { error, value } = password_schema(req.body)
        if (error) {
            return res.status(400).json({ type: 'error', message: error.details[0].message })
        }

        // Check if password is empty
        if (typeof password === 'undefined') {
            return res.status(400).json({ type: 'error', message: 'Password cannot be empty' })
        }

        const reset_link = process.env.HTTP + process.env.DOMAIN + ':' + process.env.PORT + '/reset-password/' + req.params.id
        const data = await Password.get_data_by_link(reset_link)

        // Check if link exists
        if (!data) {
            return res.status(400).json({ type: 'error', message: 'Link expired' })
        }

        // Check if email is correct
        if (data.email !== email) {
            return res.status(400).json({ type: 'error', message: 'Email incorrect' })
        }

        // Hash password
        const hashAsync = util.promisify(bcrypt.hash);
        const hashed_password = await hashAsync(password, 10)

        // Update password
        await User.update_password(email, hashed_password)

        // Delete link
        await Password.delete_link(data.id)

        // Send JSON
        return res.status(200).json({ type: 'success', message: 'Password updated' })
    } catch (error) {
        console.error('Controller auth - password_reset:', error)
        return res.status(500).json({ type: 'error', message: 'Internal server error' })
    }
}

const get_access_code = async () => {
    const access_code = Math.floor(Math.random() * 900000) + 100000
    const data = await User.access_code_exists(access_code)
    if (!data) {
        return access_code
    } else {
        get_access_code()
    }
}

export default { login_post, signup_post, password_reset_get_email, load_reset_password_page, password_reset }