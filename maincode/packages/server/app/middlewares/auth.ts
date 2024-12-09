import { verifyToken } from "../shared/services/token";
import { Request, Response } from "express";
import { NextFunction } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    console.info('=======================================================================');
    console.info('req.cookies', req.cookies);
    console.info('=======================================================================');

    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decoded = verifyToken(token);
        console.info('decoded', decoded);
        //req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).send({ message: 'Forbidden' });
    }

    return false

};



/*
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Получаем токен из заголовка Authorization

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Добавляем информацию о пользователе в запрос
        next(); // Переходим к следующему мидлвэру или обработчику маршрута
    } catch (error) {
        res.status(403).send({ message: 'Forbidden. Invalid token.' });
    }
};
*/
