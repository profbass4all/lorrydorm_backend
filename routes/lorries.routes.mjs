import { Router } from "express";
const router = Router();
import { createLorry, getLorries, getLorryById, getAllLorries } from '../controllers/lorries.controllers.mjs'
import authentication from "../middlewares/authentication.mjs";



router.post('/lorry', authentication, createLorry)

router.get('/lorries', authentication,  getLorries)

router.get('/lorry/:id',  getLorryById)

router.get('/all-lorries', getAllLorries)


export default router;