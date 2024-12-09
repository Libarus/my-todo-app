import express from 'express';

//import { authenticateToken } from '../../middlewares/auth';

import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
 
// router.use(authenticateToken); // Все маршруты ниже требуют аутентификации

router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
