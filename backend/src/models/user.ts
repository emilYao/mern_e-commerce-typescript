import {Schema, Model, Types, model, Document} from "mongoose";
import bcrypt from "bcryptjs"
import {UserDataType} from '../../shared/userType'


const userSchema = new Schema<UserDataType, Model<UserDataType>>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    }
    ,
    password:{type:String, required:true},
    verifyCode:{type:String, required:true},
    numberOfVerifyCode: {type:Number, default:0},
    verfiyCodeExpireIn:Date,
    isVerifyCode: {type:Boolean, default:false}, 
},{
    timestamps:true
})

userSchema.method("comparePassword", async function(inputPassword:string){
    return await bcrypt.compare(inputPassword, this.password as string)  
})

userSchema.pre<UserDataType>("save", async function(next){
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashs = await bcrypt.hash(this.password.toString(), salt.toString());
        this.password =  hashs;
        next();
    }catch(error: any){
        next(error)
    }      
})

// delete the create document if the user does not provide the correct verification otp after a day
userSchema.post<UserDataType>('save', async function (doc,next) { 

  
    const timeOut = 24 * 60 * 60 * 1000;
    try{
        setTimeout(async()=>{ 
 
            if ((this.isVerifyCode == false) ) {
                console.log("done ")

                await this.model('User').deleteOne({ _id: this._id }).exec();
                next()
            }
        },timeOut)
     
    }catch(error:any){
         console.log(error);
         next(error)
    }
 
   });


const User = model<UserDataType>("User", userSchema);




  

  export default User;
  
