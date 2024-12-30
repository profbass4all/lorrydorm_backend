import { validateUser }  from '../validations/users.validation.mjs'
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

        if( error != undefined) throw new Error(error.details[0].message)
        
        const [hash, salt] = await hashPassword(password)

        const findIfEmailExists = await User.findOne({
            where: { email: email}
        })

        if(findIfEmailExists) throw new Error(messages.EMAIL_EXISTS)

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

        if(!findIfEmailExists) throw new Error(messages.INVALIDEMAILORPASSWORD)

        const hash = await comparePassword(password, findIfEmailExists.password_salt)

        if(hash != findIfEmailExists.password_hash) throw new Error(messages.INVALIDEMAILORPASSWORD)

        const token = jwt.sign({email: findIfEmailExists.email}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.setHeader('access-token', token)

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
