import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.DB_HOST,
    dialect: 'mysql',
});

//this function establish connection
export default async function connection (){
    try {
            await sequelize.sync()
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

}
