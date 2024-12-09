const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/auth');

exports.generateAuthToken = (userId) => {
    const payload = { userId };
    const options = { expiresIn: '7d' }; // Токен действителен 7 дней
    return jwt.sign(payload, SECRET_KEY, options);
};

exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
