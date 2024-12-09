const { SECRET_KEY } = require('../config/auth');
const { verifyToken } = require('../controllers/token');

exports.authenticateToken = (req, res, next) => {
    console.info('=======================================================================');
    console.info('req.cookies', req.cookies);
    console.info('=======================================================================');

    const token = req.cookies?.jwt;
    console.info('jwt', token);

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decoded = verifyToken(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).send({ message: 'Forbidden' });
    }
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
