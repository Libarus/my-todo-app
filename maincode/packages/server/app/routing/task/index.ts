import express from 'express';

import { authenticateToken } from '../../middlewares/auth';

import { getAllTasks, createTask, updateTask, deleteTask } from '../../controllers/task';


const router = express.Router();

router.get('/', getAllTasks);
 
router.use(authenticateToken); // Все маршруты ниже требуют аутентификации

router.post('/', createTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
