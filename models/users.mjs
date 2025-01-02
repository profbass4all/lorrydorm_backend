import { Sequelize, DataTypes, Model, UUID } from 'sequelize'
import {sequelize} from '../config/index.mjs'
import Review from './reviews.mjs';
import Transaction from './transaction.mjs';
import Lorry from './lorries.mjs';

export default class User extends Model {}

User.init(
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
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
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


User.hasMany(Review, {
    foreignKey: {
        allowNull: false, //
        name: 'user_id',
        type: DataTypes.INTEGER,
    }
})

Review.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        name: 'user_id',
        type: DataTypes.INTEGER,
    }
})

User.hasMany(Transaction, {
    foreignKey: {
        allowNull: false,
        name: 'user_id',
        type: DataTypes.INTEGER,
    }
})

Transaction.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        name: 'user_id',
        type: DataTypes.INTEGER,
    }
})

User.hasMany(Lorry, {
    foreignKey: {
        allowNull: false,
        name: 'user_id',
        type: DataTypes.INTEGER,
    }
})

Lorry.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        name: 'user_id',
        type: DataTypes.INTEGER,
    }
})