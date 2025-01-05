import dotenv from 'dotenv'
dotenv.config()
import express  from 'express'
const app = express()
const port = process.env.PORT || 1624


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow your frontend's origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.header('Access-Control-Expose-Headers', 'Authorization'); // Expose custom headers like Authorization to the frontend
    next(); // Move to the next middleware or route handler
});

import connection, { sequelize } from './config/index.mjs'
import User from './models/users.mjs'
import Review from './models/reviews.mjs'
import Transaction from './models/transaction.mjs'
import Lorry from './models/lorries.mjs'
import bodyParser from 'body-parser'
import UserRouter from './routes/users.routes.mjs'
import ReviewRouter from './routes/review.routes.mjs'
import LorryRouter from './routes/lorries.routes.mjs'
import TransactionRouter from './routes/transaction.routes.mjs'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'


app.use(
    cors({
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);
app.options('/login', cors({ origin: 'http://localhost:5173' }));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(UserRouter)
app.use(LorryRouter)
app.use(TransactionRouter)
app.use(ReviewRouter)

app.use(helmet())
app.use(compression())

async function server(){ 
    try {
        await connection()
        await Review.sync()
        await User.sync()
        await Lorry.sync()
        await Transaction.sync()
        
        app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
}) 
    } catch (error) {
        console.log('An error occurred!!!', error)
    }
    
} 
server()



    


