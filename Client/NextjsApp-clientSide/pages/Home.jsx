import React from 'react';
import Footer from '../modules/common/components/Footer';
import FriendList from '../modules/common/components/FriendsListPending/FriendList';
import HeaderCustom from '../modules/common/components/HeaderComponents/HeaderCustom';
import PostComponent from '../modules/home/components/PostComponent';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { fetchAPI } from '../utils/fetch';
import { API_PATHS } from '../configs/apiConfigs';
import PostStatus from '../modules/home/components/PostStatus';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../modules/common/redux/commonReducer';
import MyFriendsList from '../modules/common/components/Friends/MyFriendsList';
import ProfileMini from '../modules/common/components/ProfileMini/ProfileMini';
import FriendPendding from '../modules/common/components/FriendsListPending/FriendPendding';
const Home = (props) =>{
  
    const [loading,setLoading] = React.useState(false);
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    React.useEffect(() =>{
      dispatch(setUserAction(props.data))
    },[])

    return (
      <div style={{display :'flex',flexDirection : 'column'}}>
        <HeaderCustom name={props.data.name} />
        <div style={{display :'flex',flexDirection:'row'}}>
          <div style={{display : 'flex',flex :'0.4'}}>
            <ProfileMini />
          </div>
          <div className="bg-white mt-3" style={{display : 'flex',flex :'1',flexDirection:'column'}}>
            <PostStatus />
            {
              props.post ? props.post.map((e,index) => {
                return (
                  <div key={index}>
                  <PostComponent post_main ={e.post_main} images ={e.images} user_id ={e.user_id} name={e.name} post_id ={e._id} />
                  </div>
                )
              }) : null
            }
          </div>
          <div style={{display : 'flex',flex :'0.3',flexDirection:'column',margin : '20px'}}>
          <div class="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
            <div class="h-full">
                <FriendList friendsRequest = {props.friendsRequest}/>
                <div class="border-b border-gray-200 dark:border-dark-third mt-6"></div>
                <MyFriendsList />       
            </div>
          </div>
          </div>
        </div> 
        <div style={{position : 'relative',marginTop : '150px'}}>
          <Footer />
        </div>
      </div>
    )
}

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie;
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
  
  
  const res_friends_request = await fetch(API_PATHS.getFriendsRequest,{
    headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.slice(6)
    }
  })

  const res_posts = await fetch(API_PATHS.getAllPostFriends,{
    headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.slice(6)
    }
  })

  const result = await res.json();
  const result2 = await res_friends_request.json();
  const result3 = await res_posts.json();

  return {
    props: {
      post : result3.all_posts_info,
      data : result.data,
      cookies : token.slice(6),
      friendsRequest : result2.data,
    }, // will be passed to the page component as props
  }
}

export default React.memo(Home);





