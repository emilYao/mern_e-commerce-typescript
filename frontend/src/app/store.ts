import { configureStore, combineSlices } from '@reduxjs/toolkit'

import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice"
import adminReducer from "../features/admin/adminSlice"
import { apis } from '@/features/server/apiSlice';

export const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
   user:userReducer,
    cart: cartReducer,
    admin:adminReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apis.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch