import { json } from 'stream/consumers'
import { apis } from './apiSlice'
import { productReturnType } from '@/types/type'
const extendedApi = apis.injectEndpoints({
  endpoints(builder) {
    return {
      getProducts:builder.query<productReturnType[], void>({
        query: () => 'product/getProducts',
        providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Post' as const, _id })), 'Post']
          : ['Post'],
      }),
      addProductToCart : builder.mutation<productReturnType, string>({

        query: (id)=>({

          url: `product/addProductToCart`,
          method: 'PATCH',
          headers: {
                    "Content-Type": "application/json"
                },
                mode:"cors",  
          body:{
            id:id
          }
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
      })
    }
  },

  overrideExisting: false,
})
export const { useGetProductsQuery, useAddProductToCartMutation } = extendedApi
