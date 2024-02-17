import { Router, Request, Response } from "express";
import { register as userRegistration } from "../controllers/user";
import { isEmail, isFirstName, isLastName, isPassword } from "../middleware/validators";


const router = Router();
import {check} from "express-validator"

    
router.post("/auth/register",[isFirstName, isLastName, isEmail, isPassword],  userRegistration)



export default router;