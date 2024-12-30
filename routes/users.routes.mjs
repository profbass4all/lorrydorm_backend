import { Router } from 'express'
import { createUser, login } from '../controllers/users.controllers.mjs'
const router = Router()


router.post('/user', createUser)

router.post('/login', login)



export default router