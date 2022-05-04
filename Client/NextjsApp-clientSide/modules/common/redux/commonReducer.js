import { createSlice } from "@reduxjs/toolkit";

const commonState = {
    user :''
}

const commonSlice = createSlice({
    name : 'user',
    initialState : commonState,
    reducers : {
        setUserAction : (state,action) => {
            state.user = action.payload
        }
    }
})

const {reducer,actions} = commonSlice
export const {setUserAction} = actions
export default reducer