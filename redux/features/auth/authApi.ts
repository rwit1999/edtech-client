import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse={
    message:string,
    activationToken:string
}

type RegistrationData={
    
}

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        //endpoints here
        register:builder.mutation<RegistrationResponse,RegistrationData>({
            query:(data)=>({
                url:"register",// backend url, this will be added to the base url which is there in apiSlice.ts
                method:"POST",
                body:data, // send to backend
                credentials:"include" as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled //basically the response from backend
                    dispatch(
                        userRegistration({  // dispatches the userRegistration reducer
                            token:result.data.activationToken
                        })
                    )
                }catch(error:any){
                    console.log(error);
                    
                }
            }
        }),

        activation:builder.mutation({
            query:({activation_token,activation_code})=>({
                url:'activate-user',
                method:"POST",
                body:{activation_token,activation_code}, // send to backend

            })
        }),
        login:builder.mutation({
            query:({email,password})=>({
                url:'login',
                method:"POST",
                body:{email,password},
                credentials:"include" as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled 
                    dispatch(
                        userLoggedIn({  
                            accessToken:result.data.accessToken,
                            user:result.data.user
                        })
                    )
                }catch(error:any){
                    console.log(error);
                }   
            }
        }),
        socialAuth:builder.mutation({
            query:({email,name,avatar})=>({
                url:'social-auth',
                method:"POST",
                body:{email,name,avatar},
                credentials:"include" as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled 
                    dispatch(
                        userLoggedIn({  
                            accessToken:result.data.accessToken,
                            user:result.data.user
                        })
                    )
                }catch(error:any){
                    console.log(error);
                }   
            }
        }),

        logout:builder.query({
            query:()=>({
                url:'logout',
                method:"GET"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    dispatch(
                        userLoggedOut()
                    )
                }catch(error:any){
                    console.log(error);
                }   
            }
        })
        
    })
})

export const {useRegisterMutation,useActivationMutation,useLoginMutation,useSocialAuthMutation,useLogoutQuery} = authApi