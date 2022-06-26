import {createSlice} from "@reduxjs/toolkit";

const chatThreadSlice = createSlice({
    name:"chatThread",
    initialState:{
        value:[]
    },
    reducers:{
        setChatThread:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setChatThread} = chatThreadSlice.actions
export default chatThreadSlice.reducer;