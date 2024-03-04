import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { productReturnType } from '@/types/type'
import { useAppSelector } from '@/app/hooks';
import { ToastContainer, toast } from "react-toastify";

let cart = ():cartType=> {
    return useAppSelector((state)=>state.user.cart);
}
export interface selectedItemType{
    item: productReturnType,
    QTY: number,
    price:number
}
export interface cartType {
    selectedItems:selectedItemType[] ;
    totalQTY:number;
    totalPrice: number
      }

// const initialState = 
    
export const cartSlice = createSlice({
    name: 'cart',
   
    initialState:{
        selectedItems:cart().selectedItems,
        totalQTY: cart().totalQTY,
        totalPrice : cart().totalPrice,
     
    } as cartType,
    reducers: {
        addToCart: (state, action:PayloadAction<productReturnType>)=>{  
                     
            const item = state.selectedItems.find((item)=>{
                return item.item.id === action.payload.id
            })
            if (item){
                item.QTY +=1
                // toast.success(`${item.item.category} quantity increase`)
                
            }else{
               let new_item = {item:action.payload, QTY: 1, price:Number(action.payload.price)};
                state.selectedItems.push(new_item);
                // toast.success(`New ${new_item.item.category} added to cart` )
                
            }
            // console.log(state)
            // let newItem = JSON.stringify(state.selectedItems);
            // localStorage.setItem("cartItems", newItem)      
        }
    }
  })    

export const { addToCart } = cartSlice.actions


export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer


