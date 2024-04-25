import { productReturnType } from "../../../types/type";
import Product from "./Product";
import { View } from "react-native";
import { useGetProductsQuery } from "../../../app/features/api/productSliceApi";

export default function Category() {
  const {
    data:posts ,
    isFetching,
    isLoading,
    isSuccess
  } = useGetProductsQuery( )
 
  let shoe =posts?.filter((value:productReturnType)=>{
    return value.category == "shoe"
  })
  let dress =posts?.filter((value:productReturnType)=>{
    return value.category == "dress"
  })
  let bags =posts?.filter((value:productReturnType)=>{
    return value.category == "bag"
  })
  


  return (
    <>
        {
      isSuccess && 
      (
        <View className="flex-1 flex-row h-[160] " >
        
        <Product items={shoe as productReturnType[]}/>
        <Product items={bags as productReturnType[]}/>
        <Product items={dress as productReturnType[]}/>
          

    </View>
      )
    }
    </>

    
  )
}
