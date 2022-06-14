import React from 'react';
import dynamic from 'next/dynamic';
import Footer from '../modules/common/components/Footer';
import HeaderCustom from '../modules/common/components/HeaderComponents/HeaderCustom';
const AddFriends = dynamic(() => import('../modules/addFriends/components/AddFriends'));
import { API_PATHS } from '../configs/apiConfigs';

const Search = (props) =>{

 return (
          <div style={{display :'flex',flexDirection : 'column'}}>
            <HeaderCustom  />
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

  const resfriend = await fetch(API_PATHS.search,{
    headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.slice(6)
    },
    method :'post',
    body : JSON.stringify({search : params})
  })
  const result_friends = await resfriend.json();
  return {
    props: {
      cookies : token.slice(6),
      friends : result_friends.data
    }, // will be passed to the page component as props
  }
}

export default React.memo(Search);