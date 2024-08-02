import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

//this is the main slice or root slice
export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:'https://edtech-server-xyy4.onrender.com/api/v1/',
        credentials:"include"
    }),
    endpoints:(builder)=>({
        refreshToken:builder.query({
            query:()=>({
                url:"refresh-token",
                method:"GET",
                credentials:"include" as const
            }), 
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                  const result = await queryFulfilled;
                  dispatch(userLoggedIn({
                    accessToken: result.data.accessToken,
                    user: result.data.user,
                  }));
                } catch (error) {
                  console.log("Error refreshing token:", error);
                  
                }
              }
        }),
        loadUser:builder.query({
          query:(data)=>({
            url:"me",
            method:"GET",
            credentials:"include" as const
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const result = await queryFulfilled;
              dispatch(userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              }));
            } catch (error) {
              console.log("Error refreshing token:", error);
              
            }
          }
        })
    })
})

export const {useRefreshTokenQuery,useLoadUserQuery}=apiSlice