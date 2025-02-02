import messages from '../messages/index.mjs'
import Lorry from '../models/lorries.mjs'
import { validateLorry } from '../validations/index.mjs'



export async function createLorry(req, res){

    try {
        const user = req.user

        if(!user){
            return res.status(401).json({
                message: messages.USER_NOT_FOUND,
                status: false,
            })
        }

        const {error} = validateLorry(req.body)

        if(error != undefined){
            return res.status(400).json({
                message: error.details[0].message,
                status: false,
            })
        }
        
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

        if(!user){
            return res.status(401).json({
                message: messages.USER_NOT_FOUND,
                status: false,
            })
        }

        const lorries = await user.getLorries()

        if(!lorries){
            return res.status(404).json({
                message: messages.NO_LORRIES_FOUND,
                status: false,
            })
        }

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
        
        const lorry = await Lorry.findOne({where:{
            sn: id,
        }})

        if(!lorry){
            return res.status(404).json({
                message: messages.NO_LORRY_FOUND,
                status: false,
            })
        }

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

        if(allLorries.length < 1 ){
            return res.status(404).json({
                message: messages.NO_LORRIES_FOUND,
                status: false,
            })
        }

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