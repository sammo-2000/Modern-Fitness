const express = require('express');
const router = express.Router();
const Event = require('../controllers/event_controller');
const middleware = require('../middleware/auth');

router.use(middleware.logged_on, middleware.staff);
router.get('/events', Event.get_all_events);
router.post('/events', Event.create_event);
router.get('/events/:id', Event.get_event);
router.patch('/events/:id', Event.update_event);
router.delete('/events/:id', Event.delete_event);

module.exports = router;