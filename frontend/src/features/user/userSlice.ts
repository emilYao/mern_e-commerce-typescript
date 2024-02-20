import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'




export interface userType {
    user:{
        firstName: String;
        lastName: String;
        userId: String;
        phoneNumber:String;
    },
    goToverify: Boolean;
    closeCreateUser: Boolean;
      }

const initialState :userType= {
user:{
    firstName: "",
    lastName: "",
    userId: "",
    phoneNumber:"",
},
goToverify: false,
closeCreateUser: true,
} 
    
export const userSlice = createSlice({
    name: 'user',
   
    initialState,
    reducers: {
      addUserProfile: (state,action:PayloadAction<userType["user"]>) => {
        console.log(action.payload);
        state.user = action.payload;
      },
      goToVerify: (state)=>{
        state.goToverify = true;
      },
      openCreateUser : (state)=>{
        state.closeCreateUser = false;
      },
      closeCreateUser : (state)=>{
        state.closeCreateUser = true;
      }
    }
  })    

export const { addUserProfile,goToVerify, openCreateUser,closeCreateUser } = userSlice.actions


export const selectCount = (state: RootState) => state.user

export default userSlice.reducer


