import { Router, Request, Response } from "express";
import { approvePayment } from "../controllers/adim";


const router = Router()


router.get("/approvePayment/:reference", approvePayment)


export default router;