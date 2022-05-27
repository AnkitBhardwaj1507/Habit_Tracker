const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/create-session', userController.createSession);
router.post('/create-user', userController.createUser);
router.post('/change-view', userController.changeView);

module.exports = router;