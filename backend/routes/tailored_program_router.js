const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    get_all_tailored_program,
    create_tailored_program,
    get_tailored_program,
    update_tailored_program,
    delete_tailored_program
} = require('../controllers/tailored_program_controller');

router.use(auth.logged_on);
router.get('/', get_all_tailored_program)
router.post('/', auth.staff, create_tailored_program);
router.get('/:id', get_tailored_program);
router.patch('/:id', auth.staff, update_tailored_program);
router.delete('/:id', auth.staff, delete_tailored_program);

module.exports = router;