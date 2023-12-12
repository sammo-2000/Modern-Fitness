const express = require('express');
const router = express.Router();
const Event = require('../controllers/event_controller');
const middleware = require('../middleware/auth');

router.use(middleware.logged_on);
router.get('/events', Event.get_all_events);
router.post('/events', middleware.staff, Event.create_event);
router.get('/events/:id', Event.get_event);
router.patch('/events/:id', middleware.staff, Event.update_event);
router.delete('/events/:id', middleware.staff, Event.delete_event);
router.get('/events/register/:id', Event.register);

module.exports = router;