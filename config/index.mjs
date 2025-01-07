import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: console.log,
});

