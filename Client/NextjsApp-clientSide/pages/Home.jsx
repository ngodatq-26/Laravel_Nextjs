import React from 'react';
import Footer from '../modules/common/components/Footer';
import FriendList from '../modules/common/components/FriendsListPending/FriendList';
import HeaderCustom from '../modules/common/components/HeaderComponents/HeaderCustom';
import PostComponent from '../modules/home/components/PostComponent';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { fetchAPI } from '../utils/fetch';
import { API_PATHS } from '../configs/apiConfigs';
const Home = (props) =>{
  
    const [loading,setLoading] = React.useState(false);
    console.log(props)
    const a = [1,2,3]
    return (
      <div style={{display :'flex',flexDirection : 'column'}}>
        <HeaderCustom setLoading = {setLoading} />
        <div style={{display :'flex',flexDirection:'row'}}>
          <div style={{display : 'flex',flex :'0.5'}}></div>
          <div className="bg-white mt-3" style={{display : 'flex',flex :'1',flexDirection:'column'}}>
            {
              a.map((e,index) =>{
                return (
                  <PostComponent />
                )
              })
            }
          </div>
          <div style={{display : 'flex',flex :'0.5'}}>
            <FriendList />
          </div>
        </div>
        <div style={{width : "100%",bottom : 0}}>
          <Footer />
        </div>
      </div>
    )
}
export async function getServerSideProps(context) {
  const token = context.req.headers.cookie;
  const isLogin =  Cookies.get(ACCESS_TOKEN_KEY)
  const res = await fetch(API_PATHS.getProfile,{
    headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.slice(6)
    }
  })
  const data2 = await res.json();
  return {
    props: {
      data : data2,
      cookies : token.slice(6)
    }, // will be passed to the page component as props
  }
}

export default Home;





