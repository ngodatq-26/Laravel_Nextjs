import React from 'react'
import { fetchAPI } from '../utils/fetch';
import { API_PATHS } from '../configs/apiConfigs';
import HeaderCustom from '../modules/common/components/HeaderComponents/HeaderCustom';
import Layout from '../modules/chat/components/Layout';
import Footer from '../modules/common/components/Footer';
const Chat = (props) => {
  return (
    <div style={{display :'flex',flexDirection : 'column'}}>
        <HeaderCustom name={props.data.name} />
        <Layout />
        <Footer />
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

    const result = await res.json();

    return {
        props: {
          data : result.data,
          cookies : token.slice(6),
        }, // will be passed to the page component as props
      }
}

export default Chat