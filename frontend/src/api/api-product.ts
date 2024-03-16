import { ProductInputType } from "@/components/pages/admin/AddProduct";
import axios from "axios";

const BASE_URL = "http://localhost:9000"

export const  addProduct = async (formData:FormData)=>{
    
    return await axios.post(`http://localhost:9000/api/product/addProduct`,formData, {
      withCredentials:true,
method:"POST"
  }).then((data)=>{
      // console.log(data.data.message.json())
      return data
  }).catch(error=>{
      throw error.response
  })

}
