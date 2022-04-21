import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "../modules/auth/redux/authReducer";
import masterReducer from "./reducer";

const store = configureStore({
  reducer : masterReducer,
  devTools : true
})

export const makeStore =() => store;

const wrapper = createWrapper(makeStore,{debug : true});

export default wrapper;