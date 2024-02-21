import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'




export interface userType {
    user:{
        firstName: string;
        lastName: string;
        userId: string;
        phoneNumber:string;
        email:string;
    },
    goToverify: boolean;
    closeCreateUser: boolean;
    closeLoginUser:boolean;
      }

const initialState :userType= {
user:{
    firstName: "",
    lastName: "",
    userId: "",
    phoneNumber:"",
    email:"",
},
goToverify: false,
closeCreateUser: true,
closeLoginUser:true
} 
    
export const userSlice = createSlice({
    name: 'user',
   
    initialState,
    reducers: {
      addUserProfile: (state,action:PayloadAction<userType["user"]>) => {
        console.log(action.payload);
        state.user = action.payload;
      },
      goToVerify: (state, action:PayloadAction<Boolean>)=>{
        state.goToverify = action.payload;
      },
      openCreateUser : (state)=>{
        state.closeCreateUser = false;
      },
      closeCreateUser : (state)=>{
        state.closeCreateUser = true;
      },
      openLoginUser : (state)=>{
        state.closeLoginUser = true;
        console.log(state.closeLoginUser)
      },
      closeLoginUser : (state)=>{
        state.closeLoginUser = true;
      }
    }
  })    

export const { addUserProfile,goToVerify, openCreateUser,closeCreateUser, closeLoginUser, openLoginUser } = userSlice.actions


export const selectCount = (state: RootState) => state.user

export default userSlice.reducer


