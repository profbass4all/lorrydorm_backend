import dotenv from 'dotenv'
dotenv.config()
import express  from 'express'
const app = express()
const port = process.env.APP_PORT || 1900
import connection from './config/index.mjs'
import User from './models/users.mjs'
import bodyParser from 'body-parser'
import UserRouter from './routes/users.routes.mjs'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'



app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(UserRouter)
app.use(cors())
app.use(helmet())
app.use(compression())

async function server(){
    try {
        await connection()
        await User.sync()
        app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
}) 
    } catch (error) {
        console.log('An error occurred!!!', error)
    }
    
} 
server()



    


