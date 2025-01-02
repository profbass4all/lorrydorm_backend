import { Router } from "express";
import { createTransaction, getTransactions } from '../controllers/transaction.contoller.mjs'
import authentication from "../middlewares/authentication.mjs";
const router = Router()



router.post('/transaction', authentication, createTransaction)

router.get('/transactions', authentication, getTransactions)


export default router
