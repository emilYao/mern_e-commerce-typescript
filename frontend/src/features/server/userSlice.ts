
import { apis } from './apiSlice'
import { productReturnType, userCart, userInfo } from '@/types/type'
 
const userApi = apis.injectEndpoints({
  endpoints(builder) {
    return {
      getUserCart:builder.query<userCart[], void>({
        query: () => 'user/getUserCart',
        providesTags: ['Cart']
      }),

      getUserInfo:builder.query<userInfo, void>({
        query: () => 'user/getUserInfo',
        providesTags: ['User']
      }),
    
    }
  },

  overrideExisting: false,
})
export const { useGetUserCartQuery, useGetUserInfoQuery } = userApi
