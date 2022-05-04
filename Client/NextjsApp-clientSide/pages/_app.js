import '../styles/globals.css'
import {wrapper} from "../redux/configureStore"
import React from 'react'
import App from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../redux/configureStore'
import { Provider } from 'react-redux'
import { store } from '../redux/configureStore'
function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
     <Component {...pageProps} />
  </PersistGate>
  </Provider>)
}

export default MyApp
