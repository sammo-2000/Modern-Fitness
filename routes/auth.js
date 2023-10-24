import express from 'express'
const router = express.Router()
import auth from '../controller/auth.js'
import middleware from '../middleware/auth.js'

// Pages
router.get('/login', middleware.guest, (req, res) => { res.render('auth/login', { title: 'Login', session: req.session }) })
router.get('/signup', middleware.guest, (req, res) => { res.render('auth/signup', { title: 'Signup', session: req.session }) })
router.get('/reset-password', middleware.guest, (req, res) => { res.render('auth/reset-password', { title: 'Reset Password', session: req.session }) })
router.get('/reset-password/:id', middleware.guest, auth.load_reset_password_page)

// API
router.post('/api/login', middleware.guest, auth.login_post)
router.post('/api/signup', middleware.guest, auth.signup_post)
router.post('/api/reset-password', middleware.guest, auth.password_reset_get_email)
router.post('/api/reset-password/:id', middleware.guest, auth.password_reset)

export default router