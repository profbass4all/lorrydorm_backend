import Review from '../models/reviews.mjs'
import messages from '../messages/index.mjs'
import { validateReview } from '../validations/index.mjs'


export async function createReview(req, res){
    try {

        const user = req.user
        
        const { error } = validateReview(req.body)

        if(error != undefined){
            return res.status(400).json({
                message: error.details[0].message,
                status: false,
                data: null,
            })
        }

        const review = await user.createReview(req.body)

        res.status(201).json({
            message: messages.REVIEW_CREATED,
            status: true,
            data: review,
        })
    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        })
    }
}

export async function getAllReviews(req, res){
    try {
        
        const user = req.user

        if(!user){
            return res.status(401).json({
                message: messages.LOGIN_REQUIRED,
                status: false,
                data: null,
            })
        }

        const reviews = await user.getReviews({order:['date']})

        if(reviews.length < 1){
            return res.status(404).json({
                message: messages.NO_REVIEW_FOUND,
                status: false,
                data: null,
            })
        }

        res.status(200).json({
            message: messages.ALL_REVIEWS_FOUND,
            status: true,
            data: reviews,
        })

    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        })
    }
}