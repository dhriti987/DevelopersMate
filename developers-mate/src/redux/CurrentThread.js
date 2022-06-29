import {createSlice} from "@reduxjs/toolkit";

const currentThreadSlice = createSlice({
    name:"currentThread",
    initialState:{
        value:null
    },
    reducers:{
        setCurrentThread:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setCurrentThread} = currentThreadSlice.actions
export default currentThreadSlice.reducer;