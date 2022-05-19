import { createSlice } from "@reduxjs/toolkit";

const homeState = {
    posts : ''
}

const homeSlice = createSlice({
    name : 'posts',
    initialState : homeState,
    reducers : {
        setPostsAction : (state,action) => {
            state.posts = action.payload
        }
    }
})

const {reducer,actions} = homeSlice
export const {setPostsAction} = actions
export default reducer