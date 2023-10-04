import conn from '../models/Db.js'
import bcrypt from 'bcrypt'
import login_schema from '../schema/login_schema.js'

const login_post = async (req, res) => {
    const { username, password } = req.body

    // Handle errors
    const { error, value } = login_schema(req.body)
    if (error) {
        return res.status(400).json({ type: 'error', message: error.details[0].message })
    }

    // Try to login
    try {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `username` = ?', [username])
        if (data) {
            bcrypt.compare(password, data.password, (err, result) => {
                if (err) {
                    // Error comparing the password
                    console.error(err);
                    return res.status(500).json({ type: 'error', message: 'Internal server error' })
                } else {
                    if (result) {
                        // Correct detail
                        res.status(200).json({ type: 'success', message: 'Login successful' })
                    } else {
                        // Incorrect password
                        return res.status(400).json({ type: 'error', message: 'Incorrect credentials' })
                    }
                }
            });
        } else {
            // Incorrect username
            return res.status(400).json({ type: 'error', message: 'Incorrect credentials' })
        }
    } catch (error) {
        console.error('Controller auth:', error);
        return res.status(500).json({ type: 'error', message: 'Internal server error' })
    }
}

const signup_post = async (req, res) => {
    const { username, password } = req.body

    // Handle errors
    const { error, value } = login_schema(req.body)
    if (error) {
        return res.status(400).json({ type: 'error', message: error.details[0].message })
    }

    // Try to create new user 
    try {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `username` = ?', [username])
        if (data) {
            // Username already taken
            return res.status(400).json({ type: 'error', message: 'Username already taken' })
        }

        // Hash the passowrd
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                // Error hashing the password
                console.error(err);
                return res.status(500).json({ type: 'error', message: 'Internal server error' })
            } else {
                // Add user into database
                conn.insert('INSERT INTO `user`(`username`, `password`) VALUES (?, ?)', [username, hash])
                res.status(200).json({ type: 'success', message: 'Sign up successful' })
            }
        });
    } catch (error) {
        console.error('Controller auth:', error);
        return res.status(500).json({ type: 'error', message: 'Internal server error' })
    }

}

const logout_get = (req, res) => {
    // Logout logic here
}

export default { login_post, signup_post, logout_get }