import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // slice is like reducer 
// A reducer is a function that receives the current state and an action, then calculates and returns the new state based on the action type

const initialState ={
    token:"",
    user:""
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userRegistration:(state,action:PayloadAction<{token:string}>)=>{ //state is global state which can be accessed by useSelector
            state.token=action.payload.token
        }, 
        userLoggedIn:(state,action:PayloadAction<{accessToken:string,user:string}>)=>{
            state.token=action.payload.accessToken
            state.user=action.payload.user
        },
        userLoggedOut:(state)=>{
            state.token=""
            state.user=""
        }
    }
})

export const {userRegistration,userLoggedIn,userLoggedOut} = authSlice.actions

export default authSlice.reducer