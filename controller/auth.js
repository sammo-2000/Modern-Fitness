import bcrypt from 'bcrypt'
import util from 'util';
import login_schema from '../schema/login_schema.js'
import signup_schema from '../schema/signup_schema.js'
import User_Model from '../models/user.js'
import _email from '../email/send_mail.js'

const User = new User_Model()

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
                    console.log('send email')
                    await _email.main(email, "Welcome to " + process.env.APP_NAME, 'welcome', {
                        first_name: User.first_name,
                        last_name: User.last_name,
                        access_code: User.access_code
                    })
                    console.log('email sent')
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

        login_post(req, res)
    } catch (error) {
        console.error('Controller auth:', error);
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

export default { login_post, signup_post }