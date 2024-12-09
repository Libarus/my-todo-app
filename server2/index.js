const express = require('express');
//const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const login = 'login';
const password = bcrypt.hash('passw1', 10);;

// Настройки сервера
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// // Подключение к базе данных
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// Маршрут для регистрации нового пользователя
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Проверка наличия введенного имени пользователя и пароля
    if (!email || !password) {
        return res.status(400).send({ message: 'email and password are required' });
    }

    try {
        // Хеширование пароля перед сохранением в базу данных
        const hashedPassword = await bcrypt.hash(password, 10);

        // Сохранение пользователя в базу данных
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);

        res.send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
});

// Маршрут для входа пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.info({ email, password });

    // Проверка наличия введенного имени пользователя и пароля
    if (!email || !password) {
        return res.status(400).send({ message: 'email and password are required' });
    }

    try {
        // Поиск пользователя в базе данных
        // const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const isOk = true;

        if (!isOk) { //result.rowCount === 0) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const user = { id: 1 }; // result.rows[0];

        // Сравнение хеша паролей
        const isMatch = true; // await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Генерация JWT-токена
        const token = jwt.sign({ userId: user.id }, 'process.env.SECRET_KEY', { expiresIn: '7d' });

        // Установка куки с токеном
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }); // Срок жизни куки - 7 дней

        res.send({ message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
});

app.get('/logout', async (req, res) => {
    res.clearCookie('jwt', { httpOnly: true });
    res.send({ message: 'Logout in successfully' });
});

// Защищенный маршрут, доступный только авторизованным пользователям
app.get('/protected', authenticateToken, (req, res) => {
    res.send({ message: 'This content is protected' });
});

// Открытый маршрут, доступный всем пользователям
app.get('/public', (req, res) => {
    res.send({ message: 'This content is public' });
});

// Функция для проверки JWT-токена
function authenticateToken(req, res, next) {

    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'process.env.SECRET_KEY');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).send({ message: 'Forbidden' });
    }
}

// Запуск сервера
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
