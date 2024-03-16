import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product"
import Cors from "cors";
import { sendMail } from "./utils/nodeMailer";
const app = express();
import {v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";

cloudinary.config({
    secure:true, 
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  });

  

app.use(Cors({origin:true, credentials:true,methods:['GET', 'PUT', 'POST','PATCH']}));
app.options("*", Cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT as String : 9000;



// define routes
app.use("/api/product", productRoutes)
app.use("/api/user", userRoutes);

//genaral error
app.use((error:Error, req:Request, res:Response, next:NextFunction)=>{
    console.log(error);
    res.status(500).json({message: "Sorry something went wrong"});
})

  
mongoose.connect(process.env.DB_URL as string).then(()=>{
    console.log("connected to the database");
    app.listen(PORT, ()=>{
        console.log("your backend is up");
      
    })
}).catch((error)=>{
    console.log(error);
})

