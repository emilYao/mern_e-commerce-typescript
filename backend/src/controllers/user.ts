 import { Request,Response,  } from "express";
 import User from "../models/user";
 import { query, Result, validationResult } from 'express-validator';
import jwt from "jsonwebtoken"
import { asignToken } from "../middleware/JWTtoken";
import { sendMail } from "../utils/nodeMailer";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { UserDataType } from "../../shared/Type";
import { resolve } from "path/win32";

export const register= async (req:Request, res:Response)=>{
    const {firstName, lastName, email, password,phoneNumber, role} = req.body;
    const errorField = validationResult(req);
    try{
        if (!errorField.isEmpty()){
            return res.status(404).json({message:errorField})
        }
        // check if the user already exit 
        let userExit = await User.findOne({email}) || await User.findOne({phoneNumber});

        if (userExit){
            return res.status(404).json({message:"User already exit"})
        }

        const adminExit = await User.find({role})
        
        if (role =="Admin" && adminExit.length > 1){
            return res.status(404).json({message:"Unauthorized Operation !"})
        }
        const randomNumber = generateRandomNumber()
       
        
        const newUser = new User({...req.body, verifyCode:randomNumber})
        sendMail({receiverMail:email, text:randomNumber})

        newUser.verfiyCodeExpireIn = new Date(Date.now() + (10 * 60 * 1000))

        await newUser.save();

        
        let user = {
            userId: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phoneNumber: newUser.phoneNumber,
            email: newUser.email,
            role:newUser.role
        }
        
        return res.status(200).json({message: user})
        
    }catch(error:any){
        console.log(error)
        return res.status(500).json({Error:"Sorry something went wrong"});
    };
}
export const logIn = async (req:Request, res:Response)=>{
    const {password, email} = req.body;
    const errorField = validationResult(req);

    try{
        if (!errorField.isEmpty()){
            return res.status(404).json({message:errorField})
        }
        
        let userExit = await User.findOne({email});

        if (!userExit){
            return res.status(404).json({message:"Invalid Credentials"})
        }
        let matchPassword = await userExit?.comparePassword(password)
        if (!matchPassword){
            return res.status(404).json({message:"Invalid Credentials"})
        }

        const randomNumber = generateRandomNumber()

        let date = new Date(Date.now() + (1 * 60 * 1000))
       
        await User.findOneAndUpdate({email},{verifyCode:randomNumber, numberOfVerifyCode:0, verfiyCodeExpireIn:date})

        sendMail({receiverMail:email, text:randomNumber})
        let user
        if (userExit){
             user = {
                userId: userExit._id,
                firstName: userExit.firstName,
                lastName: userExit.lastName,
                phoneNumber: userExit.phoneNumber,
                email: userExit.email,
                role:userExit.role
            }
        }
             
        return res.status(200).json({message: user})


    }catch(error){
        console.log(error);
        return res.status(500).json("Sorry something went wrong");
    }
}

export const logOut = (req:Request, res:Response)=>{
    try{

        res.cookie("auth_token","",{
            expires:new Date(0)
        })
        return res.send("Logout sucessfull")
    }catch(error){
        return res.status(500).json({error:"something went wrong"})
    }
}
// registration verification of user, remember I specify in the user model to delete
// user document after 10 minutes if user is still not verified
export const verifyPersonality = async (req:Request, res:Response)=>{
  
    try{
    const userExit = await User.findOne({_id: req.body.userId});

    if (!userExit){
        return res.status(404).json({message:"sorry time out you need to start over again!!! ", noUser: true,aboveTryLimit:false,wrongCode: false});
    }
   
    let newDate = new Date(Date.now());

    if (newDate > userExit.verfiyCodeExpireIn){
        console.log("verify has expired")
        return res.status(404).json({message:"verify code expired!! click on resend to get new one!!! ", noUser: false,aboveTryLimit:false,wrongCode: true})
    }
    // user can't try more than three
    if (userExit.numberOfVerifyCode > 3){

        await User.findOneAndUpdate({_id: req.body.userId},{numberOfVerifyCode:0, verifyCode:""})
    
        return res.status(404).json({message:"Sorry number of try exceed click on resend ", aboveTryLimit:true, noUser:false,wrongCode: false})
        
    }
    if ((userExit.verifyCode.length != 5)){
        return res.status(404).json({message:"code incorrect", wrongCode: true,aboveTryLimit:false,noUser:false});

    }
    if (userExit.verifyCode !== req.body.otp ){
        await User.findOneAndUpdate({_id: req.body.userId},{numberOfVerifyCode:userExit.numberOfVerifyCode+1})
        return res.status(404).json({message:"code incorrect", wrongCode: true,aboveTryLimit:false,noUser:false});
        }

        const updatedUser = await User.findOneAndUpdate({_id: req.body.userId},{isVerifyCode:true, verifyCode:""})


        const token = asignToken(userExit, process.env.USER_SECRET as string);

        res.cookie("auth_token",token,{
            // httpOnly:true,
            secure: process.env.NODE_ENV == "production",
            maxAge:86400000
        })
        let user = {
            userId: userExit._id,
            firstName: userExit.firstName,
            lastName: userExit.lastName,
            phoneNumber: userExit.phoneNumber,
            email: userExit.email,
            role:userExit.role
        }
    //change isVerifyCode to true
    return res.send({message:user})

    }catch(error:any){
        console.log(error);
        return res.status(500).json({message:"Sorry an error occured"});
    }
   
}

export const resendVerifyCode = async (req:Request, res:Response)=>{
    
    try{
        const userExit = await User.findOne({_id: req.body.userId});
    
        if (!userExit){
            return res.status(404).json({message:"sorry time out you need to start over again!!! ", noUser: true,aboveTryLimit:false,wrongCode: false});
        }
            const randomNumber = generateRandomNumber()
            
        let date = new Date(Date.now() + (10 * 60 * 1000))

            await User.findOneAndUpdate({_id: req.body.userId},{verifyCode:randomNumber, numberOfVerifyCode:0, verfiyCodeExpireIn:date})
            sendMail({receiverMail:userExit.email as string, text:randomNumber})
        //change isVerifyCode to true
        return res.send("done")
    
        }catch(error){
        console.log(error);
        return res.status(500).json({message:"Sorry an error occured"});
    }
}

export const getUserCart = async (req:Request, res:Response)=>{
    try{
        const findUser = await User.findOne({_id:req.userId})
        if (!findUser){
            return res.status(404).send("Please login first")
        }
        return res.status(200).json({
            cart: findUser.cart
        })
    }catch(error){
        return res.status(500).send("Sorry something went wrong")
    }
}

