import React from 'react';
import AddFriends from '../modules/addFriends/components/AddFriends';
import Footer from '../modules/common/components/Footer';
import HeaderCustom from '../modules/common/components/HeaderComponents/HeaderCustom';
import PostComponent from '../modules/home/components/PostComponent';
import {useRouter} from 'next/router';
import { fetchAPI } from '../utils/fetch';
import { API_PATHS } from '../configs/apiConfigs';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../modules/common/redux/commonReducer';
const Search = (props) =>{

 const router = useRouter();

 const state = useSelector(state =>state);
 const dispatch = useDispatch();
 React.useEffect(() =>{
   dispatch(setUserAction(props.data))
 },[])

 return (
          <div style={{display :'flex',flexDirection : 'column'}}>
            <HeaderCustom name={props.data.name} />
            <div style={{display :'flex',flexDirection:'row'}}>
              <div style={{display : 'flex',flex :'0.5'}}></div>
              <div className="bg-white mt-3" style={{display : 'flex',flex :'1',flexDirection:'column'}}>
                <AddFriends dataFriends = {props.friends} />
              </div>
              <div style={{display : 'flex',flex :'0.5'}}></div>
            </div>
            <div style={{width : "100%",bottom : 0}}>
              <Footer />
            </div>
          </div> 
    )
}

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie;
  const params = context.query.name;
  if(!token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }
  const res = await fetch(API_PATHS.getProfile,{
    headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.slice(6)
    }
  })

  const resfriend = await fetch(API_PATHS.search,{
    headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.slice(6)
    },
    method :'post',
    body : JSON.stringify({search : params})
  })
  const result_friends = await resfriend.json();
  const result = await res.json();
  return {
    props: {
      data : result.data,
      cookies : token.slice(6),
      friends : result_friends.data
    }, // will be passed to the page component as props
  }
}

export default React.memo(Search);