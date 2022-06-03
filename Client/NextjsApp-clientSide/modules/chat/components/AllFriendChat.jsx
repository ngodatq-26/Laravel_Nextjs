import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRoomNow } from '../redux/chatReducer';
import FriendChat from './FriendChat'

const AllFriendChat = (props) => {
  
  return (
    <div>
        { props.rooms ? 
            props.rooms.map((room,index) =>{
                return (
                    <div style={{cursor : 'pointer'}} key={index} onClick={(e)=>{
                      e.preventDefault();
                      props.setRoom(room)
                    }}>
                      <FriendChat name={room.name} e = {room} />
                    </div>
                )
            }) : null
        }
    </div>
  )
}

export default AllFriendChat