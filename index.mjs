import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './config/index.mjs';
import User from './models/users.mjs';
import Review from './models/reviews.mjs';
import Transaction from './models/transaction.mjs';
import Lorry from './models/lorries.mjs';
import UserRouter from './routes/users.routes.mjs';
import ReviewRouter from './routes/review.routes.mjs';
import LorryRouter from './routes/lorries.routes.mjs';
import TransactionRouter from './routes/transaction.routes.mjs';
import swaggerUI from 'swagger-ui-express'
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 1624;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow your frontend's origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.header('Access-Control-Expose-Headers', 'Authorization'); // Expose custom headers like Authorization to the frontend
    next(); // Move to the next middleware or route handler
});
// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(UserRouter);
app.use(LorryRouter);
app.use(TransactionRouter);
app.use(ReviewRouter);

// Test database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        await Review.sync();
        await User.sync();
        await Lorry.sync();
        await Transaction.sync();

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
const data = fs.readFileSync('./apidocs.json', 'utf-8');
const apidocs = JSON.parse(data);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apidocs));
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Lorry Dorm API',
        status: true,
    });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});





