import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
});

//this function establish connection
export default async function connection (){
    try {
            await sequelize.authenticate();
            // User.sync();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

}

