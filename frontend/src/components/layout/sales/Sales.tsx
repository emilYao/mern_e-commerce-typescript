import { productReturnType } from "@/types/type";
import Product from "./Product";
import { useGetProductsQuery } from "@/features/server/productSliceApi";

export default function Sales() {
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
    <div className="grid gap-[1rem] md:gap-[5rem] container mt-[5.2rem] xl:mt-[18rem] 3xl:mt-[30rem] md:mt-[14rem]">
        <Product title="Popular Shoe Sales" items={shoe as productReturnType[]}/>
        <Product title="Best Of Bags Sales" items={bags as productReturnType[]}/>
        <Product title="Popular Shoe Sales" items={dress as productReturnType[]}/>

    </div>
    
  )
}
