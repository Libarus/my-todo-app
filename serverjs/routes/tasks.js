const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');
const { authenticateToken } = require('../middlewares/auth');

// Все маршруты ниже требуют аутентификации
//router.use(authenticateToken);

router.get('/', authenticateToken, getAllTasks);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;