import { createSlice } from "@reduxjs/toolkit";
const authState = {
    token : '1',
}
const AuthSlice = createSlice({
    name : 'auth',
    initialState : authState,
    reducers : {
        setTokenCookies : (state,action) =>{
            state.token = action.payload
        }
    },
    
})

const {reducer,actions} = AuthSlice
export const {setTokenCookies} = actions
export default reducer;