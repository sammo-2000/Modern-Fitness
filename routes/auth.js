import express from 'express'
const router = express.Router()
import auth from '../controller/auth.js'
import middleware from '../middleware/auth.js'

// Pages
router.get('/login', middleware.guest, (req, res) => { res.render('auth/login', { title: 'Login', session: req.session }) })
router.get('/signup', middleware.guest, (req, res) => { res.render('auth/signup', { title: 'Signup', session: req.session }) })

// API
router.post('/api/login', middleware.guest, auth.login_post)
router.post('/api/signup', middleware.guest, auth.signup_post)

export default router