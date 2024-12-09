const { sendResponse, sendError } = require('./api');
const User = require('../models/user');
const Token = require('./token');

exports.register = async (req, res) => {
    try {
        const { name, phone = '', email, age = 0, password } = req.body;
        console.info(req.body);
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return sendError(res, 409, 'User with this email already exists.');
        }

        const newUser = await User.createUser({ name, phone, email, age, password });
        const token = Token.generateAuthToken(newUser.id);


        sendResponse(res, 201, { user: newUser }, 'User registered successfully.');

    } catch (error) {
        console.info('###', error);
        sendError(res, 500, error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) {
            return sendError(res, 404, 'User not found.');
        }

        const isMatch = await User.comparePasswords(password, user.password);

        if (!isMatch) {
            return sendError(res, 401, 'Invalid credentials.');
        }

        const token = Token.generateAuthToken(user.id);
        res.cookie('jwt',  token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}); // Срок жизни куки - 7 дней
        sendResponse(res, 200, { user }, 'Logged in successfully.');
        
    } catch (error) {
        console.info('###', error, '###');
        sendError(res, 500, error.message);
    }
};
