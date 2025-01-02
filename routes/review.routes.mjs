import { Router } from 'express'
const router = Router()
import  { createReview, getAllReviews } from '../controllers/reviews.controller.mjs'
import authentication from '../middlewares/authentication.mjs'



router.post('/review', authentication, createReview)

router.get('/reviews', authentication, getAllReviews)


export default router