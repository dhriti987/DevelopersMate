import {createSlice} from "@reduxjs/toolkit";

const otherUserIdSlice = createSlice({
    name:"otherUserId",
    initialState:{
        value:null
    },
    reducers:{
        setOtherUserId:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {setOtherUserId} = otherUserIdSlice.actions
export default otherUserIdSlice.reducer;