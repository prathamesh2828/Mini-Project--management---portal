const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST route to create a new task
router.post('/tasks', taskController.createTask);

module.exports = router;
