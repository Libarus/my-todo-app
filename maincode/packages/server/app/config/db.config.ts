import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const dbConfig = {
    HOST: process.env.DB_HOST || '',
    USER: process.env.DB_USER || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_NAME || '',
    PORT: process.env.DB_PORT || 0,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

console.info(dbConfig);
