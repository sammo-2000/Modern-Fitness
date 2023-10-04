import express from 'express'
const router = express.Router()
import auth from '../controller/auth.js'

// Pages
router.get('/login', (req, res) => { res.render('auth/login', { title: 'Login' }) })
router.get('/signup', (req, res) => { res.render('auth/signup', { title: 'Signup' }) })

// API
router.post('/login', auth.login_post)
router.post('/signup', auth.signup_post)
router.get('/logout', auth.logout_get)

export default router