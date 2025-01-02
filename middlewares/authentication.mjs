import messages from "../messages/index.mjs"
import jwt from 'jsonwebtoken'
import User from '../models/users.mjs'

export default async function authentication (req, res, next) {

    try {
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            res.status(401).json({
                message: messages.LOGIN_REQUIRED,
                status: false
            })
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findOne({where: {email: decoded.email}})

        if(!user){
            return res.status(404).json({
                message: messages.USER_NOT_FOUND,
                status: false
            })
        }

        req.user = user

        next()

        
    } catch (error) {

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: messages.INVALID_TOKEN,
                status: false,
            })


    } 
    else if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: messages.EXPIRED_TOKEN,
                status: false,
            });
    }



        res.status(500).json({
            message: error.message,
            status: false,
        })
    }
}