import express from 'express';

import { authenticateToken } from '../../middlewares/auth';

import { getAllTasks } from '../../controllers/task';


const router = express.Router();

// Все маршруты ниже требуют аутентификации
//router.use(authenticateToken);

router.get('/', authenticateToken, getAllTasks);

export default router;
