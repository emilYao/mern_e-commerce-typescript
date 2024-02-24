import { ProductInputType } from "@/components/forms/addProduct/ProductDetails";
import axios from "axios";

const BASE_URL = "http://localhost:9000"

export const  addProduct = async (formData:ProductInputType)=>{
    return await axios.post(`${BASE_URL}/api/auth/register`,formData, {
      withCredentials:true,
      headers:{
          "Content-Type":"Application/json"
      },
  }).then((data)=>{
      // console.log(data.data.message.json())
      return data
  }).catch(error=>{
      throw error.response.data.message
  })

}
