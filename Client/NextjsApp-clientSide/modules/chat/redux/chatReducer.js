import { createSlice } from "@reduxjs/toolkit";
const chatState = {
    chatRooms : '',
    messages : '',
    roomNow : '',
}
const ChatRoomSlice = createSlice({
    name : 'chat',
    initialState : chatState,
    reducers : {
        setChatRooms : (state,action) =>{
            state.chatRooms = action.payload
        },
        setMessages : (state,action) => {
            state.messages = action.payload
        },
        setRoomNow : (state,action) =>{
            state.roomNow = action.payload
        }
    },
    
})

const {reducer,actions} = ChatRoomSlice
export const {setChatRooms,setMessages,setRoomNow} = actions
export default reducer;