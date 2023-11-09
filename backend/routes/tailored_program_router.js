const express = require('express');
const router = express.Router();
const {
    get_all_tailored_program,
    create_tailored_program,
    get_tailored_program,
    update_tailored_program,
    delete_tailored_program
} = require('../controllers/tailored_program_controller');

router.get('/', get_all_tailored_program)
router.post('/', create_tailored_program);
router.get('/:id', get_tailored_program);
router.patch('/:id', update_tailored_program);
router.delete('/:id', delete_tailored_program);

module.exports = router;