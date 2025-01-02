// { id: 1, date: '2024-01-25', amount: 300, user_id: 20, merchant_id: 200, lorry_id: 1},
import { Sequelize, DataTypes, Model, UUIDV4 } from 'sequelize'
import {sequelize} from '../config/index.mjs'
import Lorry from './lorries.mjs';

export default class Transaction extends Model {}

Transaction.init(
    {
    sn:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    amount: {
        type: DataTypes.INTEGER,
        unique: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    },
    {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Transaction', // We need to choose the model name
    },
);

Lorry.hasMany(Transaction, {
    foreignKey: {
        allowNull: false, //
        name: 'lorry_id',
        type: DataTypes.INTEGER,
    }
})

Transaction.belongsTo(Lorry, {
    foreignKey: {
        allowNull: false, //
        name: 'lorry_id',
        type: DataTypes.INTEGER,
    } 
})

