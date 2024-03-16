import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface adminType{
    productSave:boolean
}

const initialState = {
    productSave:false
} as adminType



export const adminSlice = createSlice({
    name: 'admin',
   
    initialState,
    reducers:{
        setProductSave:(state, action: PayloadAction<boolean>)=>{
            state.productSave = action.payload;
        }
    }
  
  })    

  
export const {  setProductSave} = adminSlice.actions


export const selectUser = (state: RootState) => state.user

export default adminSlice.reducer


