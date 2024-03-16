import { getCookie } from '@/util/getCookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from 'axios'
// http://localhost:9080/api/product/getProducts


export const apis = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/api/',
    
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("auth_token")
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('auth_token', token)
      }
  
      return headers
    },
  }),
  keepUnusedDataFor: 30,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect:true,

  tagTypes: ['Post', 'Cart'],
  endpoints: () => ({
    
  }),
  })




