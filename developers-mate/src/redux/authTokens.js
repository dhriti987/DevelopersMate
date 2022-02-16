import {createSlice} from "@reduxjs/toolkit"

const authTokenSlice = createSlice({
    name:"authToken",
    initialState:{
        value:null,
        loading:false
    },
    reducers:{
        setAuthToken:(state,action)=>{
            state.value=action.payload;
        }
    },
})

export const {setAuthToken} = authTokenSlice.actions

export default authTokenSlice.reducer;