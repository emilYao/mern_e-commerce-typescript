import { Router, Request, Response } from "express";
import { register as userRegistration, verifyPersonality } from "../controllers/user";
import { isEmail, isFirstName, isLastName, isPassword,isVerifyOTP } from "../middleware/validators";


const router = Router();
import {check} from "express-validator"

    
router.post("/auth/register",[isFirstName, isLastName, isEmail, isPassword],  userRegistration)
router.patch("/auth/verifyPersonality",isVerifyOTP, verifyPersonality)


export default router;