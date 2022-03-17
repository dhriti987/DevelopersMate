import {createSlice} from "@reduxjs/toolkit";

const fetchPostSlice = createSlice({
    name:"fetchPost",
    initialState:{
        value:false
    },
    reducers:{
        setFetchPost:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {setFetchPost} = fetchPostSlice.actions
export default fetchPostSlice.reducer;