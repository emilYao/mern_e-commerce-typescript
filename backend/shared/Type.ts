import { Document, Types } from "mongoose";



export interface UserDataType extends Document {
    firstName : String;
    lastName: String;
    email: String;
    password: String;
    phoneNumber: String;
    role:"Admin" | "Customer";
    verifyCode: String;
    verfiyCodeExpireIn: Date;
    isVerifyCode :Boolean;
    numberOfVerifyCode:number,
    comparePassword:(password:String)=>Boolean;
}

enum categoryValues{
    shoe="shoe",
    bag="bag",
    cuffLink = "CuffLink",
    fabric = "fabric"
}
export interface ProductDataType extends Document{
    name: string;
    description: string;
    price: number;
    category: "shoe"| "bag"|"cufflink"|"fabric";
    brand: string;
    stockQuantity: number;
    images: string[];
    videos:string[];
    rating:number;
    // shippingInfo:

}