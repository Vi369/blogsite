import { createSlice } from "@reduxjs/toolkit";


// this slice only for track user is authenticate or not 


// initial state 
const initialState = {
    status: false,
    userData: null // by default null in this time but if i get some user data so i pass here 
} 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action)=>{
            state.status = true;
            state.userData = action.payload.userData; // action.payload.userData bhi bol sakte hai 
        },
        logout: (state, action)=>{
            state.status = false;
            state.userData = null; 
        }
    }
});

export const {
login, logout
} = authSlice.actions; // reducer ke andar se export karte hai to use action bolte hai 

export default authSlice.reducer;