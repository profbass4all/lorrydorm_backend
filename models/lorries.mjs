import { Sequelize, DataTypes, Model, UUIDV4 } from 'sequelize'
import {sequelize} from '../config/index.mjs'
import Transaction from './transaction.mjs';
export default class Lorry extends Model {}

Lorry.init(
    {
    sn:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    },
    {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Lorry', // We need to choose the model name
    },
);





