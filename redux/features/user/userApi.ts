import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateAvatar:builder.mutation({
            query:(avatar)=>({
                url:"update-profile-picture",
                method:"PUT",
                body:{avatar},
                credentials:"include" as const
            })
        }),
        updateUser:builder.mutation({
            query:({name})=>({
                url:"update-user-info",
                method:"PUT",
                body:{name},
                credentials:"include" as const
            })
        }),
        updatePassword:builder.mutation({
            query:({oldPassword,newPassword})=>({
                url:"update-password",
                method:"PUT",
                body:{oldPassword,newPassword},
                credentials:"include" as const
            })
        }),
        getAllUsers:builder.query({
            query:()=>({
                url:"get-all-users",
                method:"GET",
                credentials:"include" as const
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`delete-user/${id}`,
                method:"DELETE",
                credentials:"include" as const
            })
        }),
        addAdmin:builder.mutation({
            query:({name,email,password})=>({
                url:'add-admin',
                method:"POST",
                body:{name,email,password},
                credentials:"include" as const
            })
        })
    })
})

export const {useAddAdminMutation, useDeleteUserMutation,useUpdateAvatarMutation,useUpdateUserMutation,useUpdatePasswordMutation,useGetAllUsersQuery} = userApi