import {Request, Response, NextFunction} from "express";
import User from "../models/user";
import Product from "../models/product";





export const addProduct =async (req:Request, res:Response)=>{
    console.log(req.file)
    console.log(req.body)
    try{
        const isAdmin = await User.findOne({_id: req.userId,role: "Admin" })

        if (!isAdmin){
            return res.status(404).json({message:"Unauthorized Operation"})
        }
        

         
        const newProduct = new Product({...req.body})
   
        await newProduct.save();

        return res.status(200).json({newProduct})

   
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Sorry something went wrong"});
    }
 

}

