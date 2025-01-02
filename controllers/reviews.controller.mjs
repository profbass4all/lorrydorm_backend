import Review from '../models/reviews.mjs'
import messages from '../messages/index.mjs'
import { validateReview } from '../validations/index.mjs'


export async function createReview(req, res){
    try {

        const { first_name, rating, text, date } = req.body
        const user = req.user
        
        const { error } = validateReview(req.body)

        if(error != undefined) throw new Error(error.details[0].message)

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

        if(!user) throw new Error (messages.LOGIN_REQUIRED)

        const reviews = await user.getReviews({order:['date']})

        if(reviews.length < 1) throw new Error (messages.NO_REVIEW_FOUND)

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