import {Request, Response, NextFunction} from "express";
import User from "../models/user";
import Product from "../models/product";
import { upLoadImages, upLoadVideo } from "../middleware/fileUploader";
import { validationResult } from "express-validator";
import { ProductDataType } from "../../shared/Type";
import { Types } from "mongoose";


export const addProduct =async (req:Request, res:Response)=>{
    
   const {name,price, stockQuantity, rating, images, videos} = req.body;
  
   const errorField = validationResult(req.body);
    try{
        const isAdmin = await User.findOne({_id: req.userId,role: "Admin" })

        if (!isAdmin){
            return res.status(404).json({message:"Unauthorized Operation"})
        }
       
        if (!errorField.isEmpty()){
            return res.status(404).json({message:errorField})
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

export const getProducts= async (req:Request, res:Response)=>{
    
    try{
        const product = await Product.find()
        return res.status(200).json(product);
    }catch(error){
        return res.status(500).json({message:"sorry something went wrong"})
    }
}

export const addProductToCart = async (req:Request, res:Response)=>{
    // console.log(req.body)
    const {id} = req.body;

    try{
        const findUser = await User.findOne({_id:req.userId})
        if (!findUser){
            return res.status(404).json({message:"Please login first"})
        }
        const upDateProduct =await  Product.findOne({_id:req.body.id} ) as ProductDataType  
        if (upDateProduct.stockQuantity < 1){
            return res.status(403).json({message:"Out of Stock"})
        }
        else {
           
            upDateProduct.stockQuantity = upDateProduct.stockQuantity -1

            const isProductInCart = findUser.cart.items.find((item)=>{
                return item.productId === id;
            })

            if (isProductInCart){
                isProductInCart.QTY += 1;
                isProductInCart.price += upDateProduct.price;
                
            }else{
                findUser.cart.items.push({
                    productId: upDateProduct._id ,
                    name:upDateProduct.name,
                    rating:upDateProduct.rating,
                    images:upDateProduct.images,
                    QTY :1,
                    price:upDateProduct.price
                })
            }
            findUser.cart.totalPrice += upDateProduct.price;
            findUser.cart.totalQTY += 1;

            await findUser.save();
            await upDateProduct.save();

        }
        return res.status(200).json(upDateProduct)
    }catch(error){
        return res.status(500).json("Sorry something went wrong")
    }
}

export const reduceProductFromCart = async (req:Request, res:Response)=>{
    const {id} = req.body;

    try{
        const findUser = await User.findOne({_id:req.userId})
        if (!findUser){
            return res.status(404).json({message:"Please login first"})
        }

        const upDateProduct =await  Product.findOne({_id:req.body.id} ) as ProductDataType  
      
            const isProductInCart = findUser.cart.items.find((item)=>{
                return item.productId === id;
            })

            if (isProductInCart && isProductInCart.QTY !== 0){
                isProductInCart.QTY -= 1;
                isProductInCart.price -= upDateProduct.price;
                findUser.cart.totalPrice -= upDateProduct.price;
                findUser.cart.totalQTY -= 1;
                upDateProduct.stockQuantity += 1;
            }else{
                findUser.cart.items = findUser.cart.items.filter((item)=>{
                    return item.productId !== upDateProduct._id          
                })
            }
            

            await findUser.save();
            await upDateProduct.save();

        
        return res.status(200).json(upDateProduct)
    }catch(error){
        return res.status(500).json("Sorry something went wrong")
    }
}

export const removeProductFromCart = async (req:Request, res:Response)=>{
    const {id} = req.body;

    try{
        const findUser = await User.findOne({_id:req.userId})
        if (!findUser){
            return res.status(404).json({message:"Please login first"})
        }

        const upDateProduct =await  Product.findOne({_id:req.body.id} ) as ProductDataType  
      
            const isProductInCart = findUser.cart.items.find((item)=>{
                return item.productId === id;
            })

            if (isProductInCart && isProductInCart.QTY !== 0){
                findUser.cart.totalPrice -= isProductInCart.price;
                findUser.cart.totalQTY -= isProductInCart.QTY;
                upDateProduct.stockQuantity += isProductInCart.QTY;

            }
            findUser.cart.items = findUser.cart.items.filter((item)=>{
                return item.productId !== upDateProduct._id          
            })
            
            await findUser.save();
            await upDateProduct.save();
      
        return res.status(200).json(upDateProduct)
    }catch(error){
        return res.status(500).json("Sorry something went wrong")
    }
}

export const clearCart = async (req:Request, res:Response)=>{
    const {id} = req.body;

    try{
        const findUser = await User.findOne({_id:req.userId})
        if (!findUser){
            return res.status(404).json({message:"Please login first"})
        }

        const upDateProduct =await  Product.findOne({_id:id} ) as ProductDataType  
    
            upDateProduct.stockQuantity += findUser.cart.totalQTY;
            
            findUser.cart = {
                items:[],
                totalPrice:0,
                totalQTY:0
            }
            
            await findUser.save();
            await upDateProduct.save();
      
        return res.status(200).json(upDateProduct)
    }catch(error){
        return res.status(500).json("Sorry something went wrong")
    }
}

