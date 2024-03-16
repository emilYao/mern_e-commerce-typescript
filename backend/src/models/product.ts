import {model, Schema} from "mongoose"
import { ProductDataType } from "../../shared/Type"

const categoryValues=["shoe","bag","dress"]

const productSchema = new Schema<ProductDataType>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:categoryValues
    },
    brand:String,
    stockQuantity:{
        type:Number,
        required:true,
        default:0
    },
    images:[String],
    videos:[String],
    rating:{
        type:Number,
        default:0
    },

},{
    timestamps:true
})


const Product = model<ProductDataType>("Product", productSchema);

export default Product;
