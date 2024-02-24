import {model, Schema} from "mongoose"
import { ProductDataType } from "../../shared/Type"

const categoryValues=["shoe","bag","CuffLink","fabric"]

const productSchema = new Schema<ProductDataType>({
    name:String,
    description:String,
    price:Number,
    category:{
        type:String,
        enum:categoryValues
    },
    brand:String,
    stockQuantity:Number,
    images:[String],
    rating:{
        type:Number,
        default:0
    },

},{
    timestamps:true
})


const Product = model<ProductDataType>("Product", productSchema);

export default Product;
