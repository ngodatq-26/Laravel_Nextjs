import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "../modules/auth/redux/authReducer";

const combineReducer = combineReducers({
    authReducer,
})

const masterReducer =(state,action) =>{
    if(action === HYDRATE) {
      const nextState = {
        ...state,
        authReducer : {
          token : action.payload
        }
      }
      return nextState;
    } else {
      return combineReducer(state,action)
    }
}

export default masterReducer;
  