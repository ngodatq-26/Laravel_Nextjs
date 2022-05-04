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
    { (friendStatus == "") ?
    <div className="flex-row gap-4 flex justify-center items-center bg-white shadow rounded-lg mb-6 p-4" style={{margin : '20px'}}>
        <div className="flex-shrink-0" style={{right:'0px'}}>
          <div className="w-auto h-auto rounded-full">
                    <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" />
          </div>
        </div>
        <div className=" flex flex-col">
            <span className="text-gray-600 dark:text-white text-lg font-medium">
                {props.name}
            </span>
        </div>
        { loading ? <CircularProgress /> : <>
        <Button onClick={clickAdd} variant="outlined" href="#outlined-buttons"  color="success" style={{width:'10px',margin:'10px'}}>
            <CheckCircleOutlineIcon />
        </Button>
        <Button onClick={clickCancel} variant="outlined" color="error" href="#outlined-buttons">
            <CancelIcon />
        </Button></>
        }
    </div> : null
   }
   </>
  )
}

export default React.memo(FriendPendding);