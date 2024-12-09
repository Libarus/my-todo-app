import { dbConfig } from '../config/db.config';
import { Dialect, Sequelize } from 'sequelize';

import { initializeTaskModel } from './task.model';

export const sequelize = new Sequelize({
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    port: Number(dbConfig.PORT),
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

/*
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, 
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
*/

initializeTaskModel(sequelize);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;
