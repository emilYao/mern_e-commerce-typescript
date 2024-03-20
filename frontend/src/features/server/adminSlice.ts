
import { apis } from './apiSlice'

const adminApi = apis.injectEndpoints({
  endpoints(builder) {
    return {
        approvePayment: builder.query<any, string>({
            query: (reference)=>({     
                url: `admin/approvePayment/${reference}`,
                method: 'GET',
                headers: {
                          "Content-Type": "application/json"
                      },
                      mode:"cors",  
              
              }),
              providesTags: [{ type: 'Admin'}],
        })
    
    }
  },

  overrideExisting: false,
})
export const {useApprovePaymentQuery  } = adminApi
