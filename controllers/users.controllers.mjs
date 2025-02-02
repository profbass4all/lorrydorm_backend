import { validateUser }  from '../validations/index.mjs'
import messages from '../messages/index.mjs';
import { hashPassword, comparePassword } from '../utils/index.mjs';
import User from '../models/users.mjs';
import jwt from 'jsonwebtoken'



//this functions creates the user
export const createUser = async (req, res)=>{

    try {
        // validate the user inputs
        const {first_name, last_name, email, password} = req.body;

        const {error} = validateUser(req.body)

        if( error != undefined){
            return res.status(400).json({
                message: error.details[0].message,
                status: false,
                data: null
            })
        }
        
        const [hash, salt] = await hashPassword(password)

        const findIfEmailExists = await User.findOne({
            where: { email: email}
        })

        if(findIfEmailExists){
            return res.status(409).json({
                message: messages.EMAIL_EXISTS,
                status: false,
                data: null
            })
        }

        const user = await User.create({
            first_name,
            last_name,
            email,
            password_hash: hash,
            password_salt: salt,
        })

        res.status(201).json({
            message: messages.USER_CREATED,
            status: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }

}


//login the user
export const login = async (req, res) => {

    try {
        
        const { email, password } = req.body

        const findIfEmailExists = await User.findOne({where:
            {email: email}
        })

        if(!findIfEmailExists){
            return res.status(401).json({
                message: messages.INVALIDEMAILORPASSWORD,
                status: false,
                data: null
            })
        }

        const hash = await comparePassword(password, findIfEmailExists.password_salt)

        if(hash != findIfEmailExists.password_hash){
            return res.status(401).json({
                message: messages.INVALIDEMAILORPASSWORD,
                status: false,
                data: null
            })
        }

        const token = jwt.sign({email: findIfEmailExists.email}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.header('authorization', `Bearer ${token}`)

        res.status(200).json({
            message: messages.LOGGEDIN,
            status: true
        })

    } catch (error) {
        res.status(500).json({
            messages: error.message,
            status: false
        })
    }    
}
