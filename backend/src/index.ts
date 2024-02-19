import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user"
import Cors from "cors";
const app = express();


app.use(Cors({origin: process.env.FRONTEND_URL, credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT as String : 9000;

// define routes
app.use("/api", userRoutes);


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

