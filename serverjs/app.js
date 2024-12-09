const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Для логирования запросов
const cookieParser = require('cookie-parser');

require('dotenv').config({
    file: '.env',
});

// Подключение маршрутов
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

// Импорт конфигурации
require('dotenv').config();
const { PORT } = process.env;

const app = express();

// Логирование HTTP-запросов
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

// Разрешить CORS
app.use(cors({ origin: true, credentials: true }));

// Парсинг тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Маршруты
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
