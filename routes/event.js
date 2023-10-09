import express from 'express'
const router = express.Router()
import event from '../controller/event.js'

// Pages
router.get('/', (req, res) => { res.render('event/events', { title: 'Events' }) })
router.get('/create', (req, res) => { res.render('event/create', { title: 'Create Event' }) })

// API
router.post('/', event.event_post)
router.put('/', event.event_put)

export default router