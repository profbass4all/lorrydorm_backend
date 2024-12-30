import { Sequelize, DataTypes, Model } from 'sequelize'
import {sequelize} from '../config/index.mjs'

export default class User extends Model {}

User.init(
    {
    sn:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    merchant_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_salt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },
    {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
