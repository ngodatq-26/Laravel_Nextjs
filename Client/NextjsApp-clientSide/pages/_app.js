import '../styles/globals.css'
import {wrapper} from "../redux/configureStore"
import React from 'react'
import App from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../redux/configureStore'
import { Provider, useDispatch } from 'react-redux'
import { store } from '../redux/configureStore'
import "../modules/home/styles/styleChatBox.css"
import { API_PATHS } from '../configs/apiConfigs'
import Cookies from 'js-cookie'
import { fetchAPI } from '../utils/fetch'
import { setChatRooms } from '../modules/chat/redux/chatReducer'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [loading,setLoading] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  
  return (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
     {
       loading ? <div className="h-screen bg-white">
       <div className="flex justify-center items-center h-full">
         <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
       </div>
       </div> : <Component {...pageProps} />
     }
     
  </PersistGate>
  </Provider>)
}

export default MyApp
