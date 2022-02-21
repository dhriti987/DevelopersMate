import {createSlice} from "@reduxjs/toolkit";

const userDetailsSlice=createSlice({
    name:"userDetails",
    initialState:{
        value:null,
    },
    reducers:{
        setUserDetails:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {setUserDetails} = userDetailsSlice.actions
export default userDetailsSlice.reducer;