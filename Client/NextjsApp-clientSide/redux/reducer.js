import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "../modules/auth/redux/authReducer";
import commonReducer from "../modules/common/redux/commonReducer"
import homeReducer from "../modules/home/redux/homeReducer"
import chatReducer from "../modules/chat/redux/chatReducer"
const combinedReducer = combineReducers({
    chatReducer,
    authReducer,
    commonReducer,
    homeReducer
})

export default combinedReducer;
  