import { productReturnType } from "@/types/type";
import Product from "./Product";

import { useGetProductsQuery } from "@/features/server/productSliceApi";

export default function Category() {
  const {
    data:posts ,
    isFetching,
    isLoading,
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
    <div className="grid grid-cols-3 gap-5 xl:px-[8rem] md:px-[5rem] 3xl:px-[30rem] h-[4rem] container mt-[2rem]" >
        
        <Product items={shoe as productReturnType[]}/>
        <Product items={bags as productReturnType[]}/>
        <Product items={dress as productReturnType[]}/>


    </div>
  )
}
