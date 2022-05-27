const express = require('express');
const router = express.Router();

const taskController = require('../controllers/tasks_controller');

router.post('/create-task', taskController.createTask);
router.post('/delete', taskController.deleteTask);
router.post('/status', taskController.changeStatus);

module.exports = router;