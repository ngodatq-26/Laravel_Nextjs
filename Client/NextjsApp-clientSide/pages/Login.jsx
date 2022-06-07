import React from 'react'
import Image from 'next/image'
import { fetchAPI } from '../utils/fetch'
import { API_PATHS } from '../configs/apiConfigs'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { setTokenCookies } from '../modules/auth/redux/authReducer';
import { useDispatch, useSelector } from 'react-redux'
import {ACCESS_TOKEN_KEY} from '../utils/constant';
import {Snackbar} from '@mui/material/Snackbar';
import Snackbarcustom from '../modules/common/components/SnackbarCustom'
const SignInForm = dynamic(() => import('../modules/auth/components/SignInForm'));

const SignInPage = ({props}) =>{

    const router = useRouter()
    const [loading,setLoading] = React.useState(false);
    const [error,SetError] = React.useState();
    const counter = useSelector((state) => state.authReducer.token);
    const dispatch = useDispatch();
    
    const onLogin = React.useCallback(async (email,password)=>{
      setLoading(true);
      await fetchAPI(API_PATHS.login,'POST',{email : email,password : password},true).then(user =>{
        if(user.data.success == "true") {
          Cookies.set(ACCESS_TOKEN_KEY,user.data.token,{expires : 86400});
          dispatch(setTokenCookies(user.data.token))
          Router.push('/Home')
        }
        else {
          SetError(user.data.message)
        }
      })
      setLoading(false)
      return;
    },[])

    const isLogin = React.useMemo(() => Cookies.get(ACCESS_TOKEN_KEY),[]);
    
  
    return (
        <div>
         { error ?<Snackbarcustom title={error} alert="error"/> : null }
           <div className="w-full h-screen font-sans bg-cover bg-landscape">
             <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                 <div className="w-full max-w-lg">
                     <div className="leading-loose">
                       <SignInForm onLogin={onLogin} loading={loading}/>
                    </div>
                 </div>
             </div>
         </div>
        </div> 
    )
}

//example account : email : Khanhtrinh2001checkm@gmail.com password : Datdatdat
export async function getServerSideProps(context) {
  const token = context.req.headers.cookie;
  if(token) {
    return {
      redirect: {
        destination: '/Home',
        permanent: false,
      },
    }
  }
  return {
    props : {

    }
  }
}

export default SignInPage;