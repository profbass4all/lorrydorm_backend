import { Sequelize, DataTypes, Model, UUIDV4 } from 'sequelize'
import {sequelize} from '../config/index.mjs'
import User from './users.mjs';


export default class Review extends Model {}

Review.init(
    {
    sn:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    },
    {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Review', // We need to choose the model name
    },
);


