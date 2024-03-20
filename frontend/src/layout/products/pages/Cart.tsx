import { useGetUserCartQuery,useGetUserInfoQuery } from "@/features/server/userSlice";
import Images from "@/components/layout/cart/Images";
import { productReturnType, userCart } from "@/types/type";
import TruncateMarkup from "react-truncate-markup";
import { PiTrashLight } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useAddProductToCartMutation ,useReduceProductFromCartMutation,
  useRemoveProductFromCartMutation,useClearProductFromCartMutation
} from "@/features/server/productSliceApi";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { usePaystackPayment } from 'react-paystack';
import { useAppSelector } from "@/app/hooks";
import { useApprovePaymentQuery } from "@/features/server/adminSlice";
import ConfettiAnimation from "@/components/ConfettiAnimation";


interface itemType{
    productId:string,
    name:string,
    rating:number,
    images:string[],
    QTY: number,
    price: number
}



export default function Cart() {
  const [isApprovePayment, setIsApprovePayment] = useState<string>("")
  const { data: cart, isFetching, isLoading } = useGetUserCartQuery(undefined,{ pollingInterval: 300});
  const { data: userInfo } =  useGetUserInfoQuery(undefined,{ pollingInterval: 30000});
  
  const [ updatePost, { isLoading: isUpdating,error }] = useAddProductToCartMutation()
  const [reduceProduct, {error:reduceError}]  =useReduceProductFromCartMutation()
  const [removeProduct, {error:removeError}]  = useRemoveProductFromCartMutation()
  const [clearCart, {error:clearCartError}] = useClearProductFromCartMutation();


  const {data:approvePayment, error:paymentError} = useApprovePaymentQuery(isApprovePayment, {
    skip:!isApprovePayment
  });
  
  const payStack_k = import.meta.env.VITE_PayStack_P_key


  

const config = {
  reference: (new Date()).getTime().toString(),
  email: userInfo?.email,
  currency:"GHS",
  amount: cart?.cart?.totalPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: payStack_k,
};


const onSuccess = (reference:any) => {
// Implementation for whatever you want to do with reference and after success call.
setIsApprovePayment(reference.reference)
console.log(reference);
};


const onClose = () => {
// implementation for  whatever you want to do when the Paystack dialog closed.
console.log('closed')
}

  useEffect(()=>{
    const err = error || reduceError || clearCartError || removeError
    if (err){
      let errors = err as FetchBaseQueryError
      
      if (errors.status == 404){
        toast.error("Please you need to login first")
      }
      else if (errors.status == 403){
        toast.info("Product out of stock")
      }
      else {
        toast.error("Sorry something went wrong")
      }  
    }
  },[error, reduceError, removeError, clearCart])
  useEffect(()=>{
    if (approvePayment){
      console.log(approvePayment)
    }
  },[approvePayment])

  const onUpDate = async(id:string)=>{ 
    return (
      await updatePost(id).unwrap()
    )   
}
 const onReduce = async(id:string)=>{
  return(
    await reduceProduct(id).unwrap()
  )
 }
 const onRemove = async(id:string)=>{
  return(
    await removeProduct(id).unwrap()
  )
 }
 const onClearCart = async ()=>{
  return (
    await clearCart().unwrap()
  )
 }




 const initializePayment = usePaystackPayment(config);
  return (
    <div className="container">
      <div>
        {
          (approvePayment && approvePayment.message == "Verification successful") && (
            <ConfettiAnimation/>
          )
        }
      </div>
      <div className="flex justify-end"><PiTrashLight onClick={()=>{onClearCart()}}/></div>

      <div>
        <div className="grid gap-2 ">

          {cart?.cart?.items?.map((item:itemType, index:any) => {
            return (
              <div key={index} className="grid grid-cols-12 bg-slate-100 gap-1 w-full items-center justify-center">
                <div className="w-[5rem] h-[4rem] col-span-3">
                <Images images={item?.images} />

                </div>
                <div className="col-span-4">
                <TruncateMarkup lines={2} >
                  <p className="text-[10px] md:text-[12px]">{item.name}</p>
                </TruncateMarkup>
                  
                </div>
                <div className="col-span-1">
                    {item.QTY}
                </div>
                <div className="col-span-2 flex gap-4 md:gap-8">
                    <span onClick={()=>{onUpDate(item.productId)}} className="bg-green-800"><FaPlus /></span>
                    <span onClick={()=>{onReduce(item.productId)}}><FaMinus /></span>
                </div>
                <div className="col-span-2">
                <PiTrashLight  onClick={()=>{onRemove(item.productId)}}/>
                </div>
              </div>
            );
          })}
        </div>
       
      </div>

      <div>
        <p>Total QTY : {cart?.cart?.totalQTY}</p>
        <p>Total Price : {cart?.cart?.totalPrice}</p>
      </div>

      <div>
        <Button onClick={() => {
                initializePayment({onSuccess, onClose})
            }}>Check Out</Button>
      </div>
    </div>
  );
}
