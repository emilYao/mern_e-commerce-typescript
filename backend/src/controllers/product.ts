import {Request, Response, NextFunction} from "express";
import User from "../models/user";
import Product from "../models/product";
import { upLoadImages, upLoadVideo } from "../middleware/fileUploader";




export const addProduct =async (req:Request, res:Response)=>{
   const {price, stockQuantity, rating, images, videos} = req.body;
 
    try{
        const isAdmin = await User.findOne({_id: req.userId,role: "Admin" })

        if (!isAdmin){
            return res.status(404).json({message:"Unauthorized Operation"})
        }
       
       
        const imageUrl = await upLoadImages(images)   
        const videoUrl = await upLoadVideo(videos)
      
        const newProduct = new Product({...req.body, rating:Number(rating),
            stockQuantity:parseInt(stockQuantity), price:Number(price),
            images:imageUrl,
            videos:videoUrl,
            })
   
        await newProduct.save();

        return res.status(200).json({newProduct})

   
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Sorry something went wrong"});
    }
 

}

