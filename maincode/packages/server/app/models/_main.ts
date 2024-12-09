import { dbConfig } from '../config/db.config';
import { Dialect, Sequelize } from 'sequelize';

import { InitializeTaskModel } from './task.model';
import { InitializeUserModel } from './user.model';

let sequelize: Sequelize | null = null;

export function SequelizeInit(): Promise<unknown> {
    return new Promise<unknown>(async (resolve, reject) => {
        sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect as Dialect,
            port: Number(dbConfig.PORT),

            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle,
            },
        });

        try {
            await sequelize.authenticate();
            //console.log('Connection has been established successfully.');
            
            InitializeTaskModel(sequelize);
            InitializeUserModel(sequelize);

            resolve(true);
        } catch (error: unknown) {
            //console.error('Unable to connect to the database:', error.message);
            reject(error);
        }
    });
}

export function SequelizeSync(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await sequelize?.sync({ force: false, alter: true }); // Сравниваем структуру моделей с базой данных
            resolve();
        } catch (error: unknown) {
            reject(error);
        }
    });
}

export { sequelize };