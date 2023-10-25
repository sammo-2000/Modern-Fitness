import express from 'express'
const router = express.Router()
import middleware from '../middleware/auth.js'
import event from '../controller/event.js'

//API

// GET all events
router.get('/api/events', middleware.logged_on, event.get_events)

// GET an event
router.get('/api/events/:id', middleware.logged_on, event.get_event)

// PATCH an event
router.patch('/api/events/:id', middleware.trainer, event.update_event)

// POST an event
router.post('/api/events', middleware.trainer, event.post_event)

export default router