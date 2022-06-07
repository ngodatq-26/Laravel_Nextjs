import { createSlice } from "@reduxjs/toolkit";

const commonState = {
    show_room : '',
    user :''
}

const commonSlice = createSlice({
    name : 'user',
    initialState : commonState,
    reducers : {
        setUserAction : (state,action) => {
            state.user = action.payload
        },
        setShowRoom : (state,action) =>{
            state.show_room = action.payload
        }
    }
})

const {reducer,actions} = commonSlice
export const {setUserAction,setShowRoom} = actions
export default reducer