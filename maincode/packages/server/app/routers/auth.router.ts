import express from 'express';

import { authenticateToken } from '../middlewares/auth';

import { register, login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register); // регистрация
router.post('/login', login); // аутентификация пользователя

// router.post('/recover', recover); // запрос на восстановление
// router.post('/recover/:token', recoverVerify); // проверка запроса на восстановление

// router.post('/verfiy', verify); // запрос подтверждения email
// router.post('/verify/:token', verifyCheck); // проверка запроса на подтверждение email

router.use(authenticateToken); // Все маршруты ниже требуют аутентификации
router.get('/check', (_, res) => res.sendStatus(200));

 
export default router;

/*
// Доступ всем
//import { authenticateToken } from '../middlewares/auth';
//router.use(authenticateToken); // Все маршруты ниже требуют аутентификации
*/