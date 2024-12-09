import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { sequelize } from './app/models';

dotenv.config({ path: '../../.env' });

const { SERVER_PORT, CLIENT_PORT, CLIENT_ADDRESS } = process.env;

var corsOptions = {
    origin: `http://${CLIENT_ADDRESS}:${CLIENT_PORT}`,
    credentials: true,
};

const app = express();

app.use(cors(corsOptions));

// анализ запросов content-type - application/json
app.use(express.json());

// синтаксический анализ запросов content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Синхронизируем базу данных перед запуском сервера
try {
    sequelize.sync({ force: false, alter: true }); // Сравниваем структуру моделей с базой данных
    console.log('Database synchronized');
} catch (err) {
    console.error('Failed to synchronize database:', err);
}

app.get('/', (_, res) => {
    res.json('Hello, server is working!');
});

app.listen(SERVER_PORT, () => {
    console.log(`### Server is listening on port: ${SERVER_PORT} ###`);
});
