import messages from '../messages/index.mjs'
import Lorry from '../models/lorries.mjs'
import { validateLorry } from '../validations/index.mjs'



export async function createLorry(req, res){

    try {
        const user = req.user

        if(!user) throw new Error(messages.USER_NOT_FOUND)

        const {name, price, description, imageUrl, type, quantity} = req.body

        const {error} = validateLorry(req.body)

        if(error != undefined) throw new Error(error.details[0].message)
        
        const newLorry = await user.createLorry(req.body)

        res.status(201).json({
            message: messages.LORRY_CREATED,
            status: true,
            data: newLorry
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

export async function getLorries(req, res) {
    try {
        
        const user = req.user

        if(!user) throw new Error(messages.USER_NOT_FOUND)

        const lorries = await user.getLorries()

        if(!lorries) throw new Error(messages.NO_LORRIES_FOUND)

        res.status(200).json({
            message: messages.LORRIES_FETCHED,
            status: true,
            data: lorries
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

export async function getLorryById(req, res) {

    try {

        const { id } = req.params

        const user = req.user
        
        if(!user) throw new Error(messages.USER_NOT_FOUND)

        // const lorry = await user.getLorries({ where: { sn: id } })

        const lorry = await Lorry.findOne({where:{
            sn: id,
            user_id: user.sn
        }})

        if(lorry.length < 1) throw new Error(messages.NO_LORRY_FOUND)

        res.status(200).json({
            message: messages.LORRY_FETCHED,
            status: true,
            data: lorry
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

export async function getAllLorries(req, res) {
    try {
        const allLorries = await Lorry.findAll()

        if(allLorries.length < 1 ) throw new Error (messages.NO_LORRIES_FOUND)

        res.status(200).json({
            message: messages.LORRIES_FETCHED,
            status: true,
            data: allLorries
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
}