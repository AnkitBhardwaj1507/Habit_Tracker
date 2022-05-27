const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// Define routes
router.get('/register', homeController.register);
router.get('/', homeController.login);
router.use('/user', require('./users'));
router.use('/profile', require('./profile'));
router.use('/tasks', require('./habits'));

module.exports = router;