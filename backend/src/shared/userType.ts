import { Document } from "mongoose";


export interface UserDataType extends Document {
    firstName : String;
    lastName: String;
    email: String;
    password: String;
    phoneNumber: String;
    verifyCode: String;
    verfiyCodeExpireIn: Date;
    isVerifyCode :Boolean;
}