import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "../modules/auth/redux/authReducer";
import masterReducer from "./reducer";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, masterReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)
