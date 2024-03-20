import { Router, Request, Response } from "express";
import { register as userRegistration, verifyPersonality,resendVerifyCode,logIn, logOut, getUserCart, getUserInfo } from "../controllers/user";
import { isEmail, isFirstName, isLastName, isPassword,isRole,isVerifyOTP } from "../middleware/validators";


const router = Router();
import {check} from "express-validator"
import { verifyToken } from "../middleware/JWTtoken";

    
router.post("/auth/register",[isFirstName, isLastName, isEmail, isPassword, isRole],  userRegistration)
router.patch("/auth/verifyPersonality",isVerifyOTP, verifyPersonality)
router.patch("/auth/reSendCode", resendVerifyCode)
router.patch("/auth/login", [isEmail, isPassword],logIn)
router.post("/auth/logout", logOut)
router.get("/getUserCart", verifyToken,getUserCart)
router.get("/getUserInfo", verifyToken, getUserInfo)
export default router;