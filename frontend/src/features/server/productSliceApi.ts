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
      }),
      reduceProductFromCart : builder.mutation<productReturnType, string>({

        query: (id)=>({

          url: `product/reduceProductInCart`,
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
      }),
      removeProductFromCart : builder.mutation<productReturnType, string>({

        query: (id)=>({

          url: `product/removeProductFromCart`,
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
      }),
      clearProductFromCart : builder.mutation<void, void>({

        query: ()=>({

          url: `product/clearProductFromCart`,
          method: 'PATCH',
          headers: {
                    "Content-Type": "application/json"
                },
                mode:"cors",  
        }),
        invalidatesTags: [{ type: 'Post'}],
      })
    }
  },

  overrideExisting: false,
})
export const { useGetProductsQuery, useAddProductToCartMutation, useReduceProductFromCartMutation,
useRemoveProductFromCartMutation, useClearProductFromCartMutation
} = extendedApi
