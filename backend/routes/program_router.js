const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const Program = require('../controllers/program_controller');

router.use(middleware.logged_on);
// Get list of program
router.get('/programs/', Program.get_all_programs);
router.get('/programs/:user_id', middleware.trainer, Program.get_all_programs);
// Get single program
router.get('/program/:program_id', Program.get_program);
router.get('/program/:user_id/:program_id', middleware.trainer, Program.get_program);
// Create program
router.post('/program', middleware.trainer, Program.create_program)
// Update program
router.patch('/program/:id', middleware.trainer, Program.update_program)

module.exports = router;