import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { productReturnType } from '@/types/type';


export interface userType {
    user:{
        firstName: string;
        lastName: string;
        userId: string;
        phoneNumber:string;
        email:string;
    },
    goToverify: Boolean;
    closeCreateUser: boolean;
    closeLoginUser:boolean;
    userLogIn :boolean;
      }

const initialState = {
user:{
    firstName: "",
    lastName: "",
    userId: "",
    phoneNumber:"",
    email:"",
},
goToverify: false,
closeCreateUser: true,
closeLoginUser:true,
userLogIn: false,
} as userType



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
        state.closeLoginUser = false;
        console.log(state.closeLoginUser)
      },
      closeLoginUser : (state)=>{
        state.closeLoginUser = true;
      },
      setUserLogIn: (state,action:PayloadAction<boolean>)=>{
        state.userLogIn = action.payload;
      },


    }
  
  })    

  
export const { addUserProfile,goToVerify, openCreateUser,closeCreateUser, setUserLogIn,closeLoginUser, openLoginUser } = userSlice.actions


export const selectUser = (state: RootState) => state.user

export default userSlice.reducer


