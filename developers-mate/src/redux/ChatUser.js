import {createSlice} from "@reduxjs/toolkit";

const chatUserSlice=createSlice({
    name:"chatUser",
    initialState:{
        value:null,
    },
    reducers:{
        setChatUser:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {setChatUser} = chatUserSlice.actions
export default chatUserSlice.reducer;