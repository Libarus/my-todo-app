import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { SequelizeInit, SequelizeSync } from './app/models';
import { RoutingInit } from './app/routing';

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

// парсинг куки
app.use(cookieParser());

SequelizeInit()
    .then(() => {
        console.log('Connection has been established successfully!');

        SequelizeSync()
            .then(() => {
                console.log('Database synchronized successfully!');
                RoutingInit(app, Number(SERVER_PORT));
            })
            .catch((err) => {
                console.error(`Unable to synchronize the database :( => ${err.name} // ${err.message}`);
            });
        
    })
    .catch((err) => {
        console.error(`Unable to connect to the database :( => ${err.name} // ${err.message}`);
    });
