import React from 'react';
import { useSelector } from 'react-redux';
import { API_PATHS } from '../../../configs/apiConfigs';
import { fetchAPI } from '../../../utils/fetch';
import SearchAll from '../../common/components/SearchAllButton'
import Friend from './Friend';

const AddFriends = (props) =>{

    
    return (
        <div style={{width :'100%',margin:'10px'}} className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="flex flex-col divide divide-y" style={{width :'100%',margin:'20px'}}>
               <li className="flex flex-row" style={{marginLeft :'30px'}}>
                   <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                       <b style={{width : '100%',fontSize :'20px'}}>All users</b>
                   </div>
                </li>
                {
                    props.dataFriends ? props.dataFriends.map((e,index) =>{
                        return (
                            <div key={index}>
                                <Friend name={e.name} email ={e.email} _id={e._id}/>
                            </div>
                        )
                    })   : null
                }
                <SearchAll />
            </ul>
        </div>
    )
}



export default React.memo(AddFriends)