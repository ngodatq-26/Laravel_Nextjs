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
const Search = (props) =>{

 const router = useRouter();
 
 return (
          <div style={{display :'flex',flexDirection : 'column'}}>
            <HeaderCustom />
            <div style={{display :'flex',flexDirection:'row'}}>
              <div style={{display : 'flex',flex :'0.5'}}></div>
              <div className="bg-white mt-3" style={{display : 'flex',flex :'1',flexDirection:'column'}}>
                <AddFriends search = {router.query.name} />
              </div>
              <div style={{display : 'flex',flex :'0.5'}}></div>
            </div>
            <div style={{width : "100%",bottom : 0}}>
              <Footer />
            </div>
          </div> 
    )
}

export default React.memo(Search);