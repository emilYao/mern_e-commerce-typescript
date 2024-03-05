import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { productReturnType } from '@/types/type'
import { ToastContainer, toast } from "react-toastify";


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

export const initialCartState ={      
    selectedItems:[],
    totalQTY:0,
    totalPrice: 0    
    } as cartType
    
    
export const cartSlice = createSlice({
    name: 'cart',
    initialState:initialCartState,
    reducers: {
        addToCart: (state, action:PayloadAction<productReturnType>)=>{  
             if (Number(action.payload.stockQuantity) > 0){
                const item = state.selectedItems.find((item)=>{
                    return item.item.id === action.payload.id
                })
    
                if (item){
                item.QTY +=1
                console.log(item.item.stockQuantity)

                let stock = Number(item?.item.category) -1
                  item.item.stockQuantity = stock.toString();
                    toast.success(`${item.item.category} quantity increase`)
                    
                }else{
                   let new_item = {item:action.payload, QTY: 1, price:Number(action.payload.price)};
                   console.log(new_item.item.stockQuantity)

                    let stock = Number(new_item.item.category) -1
                    new_item.item.stockQuantity = stock.toString();
                    state.selectedItems.push(new_item);
    
                    toast.success(`New ${new_item.item.category} added to cart` )     
                }
             
             }  
            else{
                // toast.dan(`New ${new_item.item.category} added to cart` )
                toast.info("Sorry we are out of stock")
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


