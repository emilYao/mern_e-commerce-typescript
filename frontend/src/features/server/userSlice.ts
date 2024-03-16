
import { apis } from './apiSlice'
import { productReturnType, userCart } from '@/types/type'

const userApi = apis.injectEndpoints({
  endpoints(builder) {
    return {
      getUserCart:builder.query<userCart[], void>({
        query: () => 'user/getUserCart',
        providesTags: ['Cart']
      }),
    
    }
  },

  overrideExisting: false,
})
export const { useGetUserCartQuery } = userApi
