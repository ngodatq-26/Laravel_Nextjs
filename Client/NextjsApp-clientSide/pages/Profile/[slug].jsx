import React from 'react';
import ProfileHeader from '../../modules/profile/components/ProfileHeader';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constant';
import { API_PATHS } from '../../configs/apiConfigs';

const Profile = (props) => {

  return (
    <div><ProfileHeader /></div>
  )
}

export async function getStaticPaths(){

  return {
    paths: [
        { params: { slug: 'main' } },
    ],
    fallback: true,
     // will be passed to the page component as props
  }
} 
export default Profile

export async function getStaticProps(ctx) {
 
  const cookie = ctx.req ? ctx.req.headers.cookie : null
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const result = await res.json();
  return {
    props: {
      data : result,
      a : cookie
    }, // will be passed to the page component as props
  }
}