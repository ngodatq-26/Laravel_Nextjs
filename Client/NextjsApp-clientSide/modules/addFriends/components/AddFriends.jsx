import React from 'react';
import { API_PATHS } from '../../../configs/apiConfigs';
import { fetchAPI } from '../../../utils/fetch';
import SearchAll from '../../common/components/SearchAllButton'
import Friend from './Friend';

const AddFriends = (props) =>{

    const [dataFriends,setDataFriends] = React.useState();
    React.useEffect(() => {
        async function fetchData () {
            await fetchAPI(API_PATHS.search,'POST',{search : props.search},true)
            .then(res =>{
               setDataFriends(res.data.data);
            })
        }
        if(props.search) {
            fetchData();
        }
    },[props.search]);


    return (
        <div style={{width :'100%',margin:'10px'}} className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="flex flex-col divide divide-y" style={{width :'100%',margin:'20px'}}>
               <li className="flex flex-row" style={{marginLeft :'30px'}}>
                   <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                       <b style={{width : '100%',fontSize :'20px'}}>All users</b>
                   </div>
                </li>
                {
                    dataFriends ? dataFriends.map((e,index) =>{
                        return (
                            <div key={index}>
                                <Friend name={e.name} email ={e.email}/>
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