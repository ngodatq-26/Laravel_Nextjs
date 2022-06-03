import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_PATHS } from '../../../configs/apiConfigs';
import { fetchAPI } from '../../../utils/fetch';
import { setRoomNow } from '../redux/chatReducer';

const FriendChat = (props) => {

  const dispatch = useDispatch();
  const user = useSelector(state =>state.commonReducer.user)
  const [nameRoom,setNameRoom] = React.useState('');
  
  return (
    <div className="flex flex-row py-4 px-2 items-center border-b-2">
    <div className="w-1/4">
      <img
        src="https://source.unsplash.com/otT2199XwI8/600x600"
        className="object-cover h-12 w-12 rounded-full"
        alt=""
      />
    </div>
    <div className="w-full">
      <div className="text-lg font-semibold">{props.name}</div>
      <span className="text-gray-500"></span>
    </div>
  </div>
  )
}

export default FriendChat