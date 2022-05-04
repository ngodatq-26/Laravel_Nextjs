import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "../modules/auth/redux/authReducer";
import commonReducer from "../modules/common/redux/commonReducer"

const combinedReducer = combineReducers({
    authReducer,
    commonReducer
})

export default combinedReducer;
  