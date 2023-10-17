import express from 'express'
const router = express.Router()
import middleware from '../middleware/auth.js'
import profile from '../controller/profile.js'

// Pages
router.get('/profile', middleware.logged_on, (req, res) => { res.render('profile/profile', { title: 'Profile', session: req.session }) })
router.get('/profile/setting', middleware.logged_on, (req, res) => { res.render('profile/setting', { title: 'Setting', session: req.session }) })

// API
router.get('/api/profile', middleware.logged_on, profile.profile_detail)

export default router