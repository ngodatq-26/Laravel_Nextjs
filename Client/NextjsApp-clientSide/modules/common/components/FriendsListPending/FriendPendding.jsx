import React from 'react';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { API_PATHS } from '../../../../configs/apiConfigs';
import { fetchAPI } from '../../../../utils/fetch';
import { CircularProgress } from '@mui/material';
const FriendPendding = (props) => {

  const [friendStatus,setFriendStatus] = React.useState("");
  const [loading,setLoading] = React.useState(false);

  const clickAdd = React.useCallback(async() =>{
    setLoading(true);
    const res = await fetchAPI(API_PATHS.acceptAdd,'POST',{
        name : props.name,
        _id : props._id
    },true)
    setLoading(false)
    setFriendStatus("add");
  },[])

  const clickCancel = React.useCallback(async() =>{
    setLoading(true)
    const res = await fetchAPI(API_PATHS.cancelAdd,'POST',{
        name : props.name,
        _id : props._id
    },true)
    setLoading(false);
    setFriendStatus("cancel");
  },[])

  return (<>
    { (friendStatus == "") ?<>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="mx-auto object-cover rounded-full h-10 w-10" alt="Profile picture" class="w-16 h-16 rounded-full" />
            <div class="flex-1 h-full">
                <div class="dark:text-dark-txt">
                    <span class="font-semibold">{props.name}</span>
                    <span class="float-right">6d</span>
                </div>
                { loading ? <CircularProgress /> : <>
                <div class="flex space-x-2 mt-2">
                    <div class="w-1/2 bg-blue-500 cursor-pointer py-1 text-center font-semibold text-white rounded-lg" onClick={clickAdd} >
                        Confirm
                    </div>
                    <div class="w-1/2 bg-gray-300 cursor-pointer py-1 text-center font-semibold text-black rounded-lg" onClick={clickCancel}>
                        Delete
                    </div>
                </div> </>
                } 
            </div>
    </> : null
   }
   </>
  )
}

export default React.memo(FriendPendding);