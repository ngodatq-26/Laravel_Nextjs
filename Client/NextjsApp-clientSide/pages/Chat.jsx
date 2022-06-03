import React from 'react'
import { fetchAPI } from '../utils/fetch';
import { API_PATHS } from '../configs/apiConfigs';
import HeaderCustom from '../modules/common/components/HeaderComponents/HeaderCustom';
import Footer from '../modules/common/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setChatRooms, setMessages, setRoomNow } from '../modules/chat/redux/chatReducer';
import AllFriendChat from '../modules/chat/components/AllFriendChat';
import MessagesLayout from '../modules/chat/components/MessagesLayout';
import Room from '../modules/chat/components/Room';

const Chat = (props) => {
  const state = useSelector(state =>state);
  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    dispatch(setChatRooms(props.chatroom.rooms))
    dispatch(setMessages(props.messages.messages))
    dispatch(setRoomNow(props.chatroom.rooms[0]))
  },[]);

  const [room,setRoom] = React.useState(props.chatroom.rooms[0]);
  const [msg,setMsg] = React.useState(props.messages.messages);
  const [rooms,setRooms] = React.useState(props.chatroom.rooms);
 

  return (
    <div style={{display :'flex',flexDirection : 'column'}}>
        <HeaderCustom name={props.data.name} />
        <div className="flex flex-row justify-between bg-white" style={{position : 'absolute',bottom : '150px',top :'67px'}}>
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-scroll" >
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        <AllFriendChat rooms={rooms} setRoom = {setRoom} />  
      </div>
      <MessagesLayout messages={msg} room ={room} />
      <Room setRooms ={setRooms} rooms={rooms} />
    </div>
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
    const resChatRoom = await fetch(API_PATHS.getAllRooms,{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.slice(6)
      }
    })

    const res = await fetch(API_PATHS.getProfile,{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.slice(6)
      }
    })

    const result = await res.json();
    const chatroom = await resChatRoom.json();
    
    const resMessage = await fetch(API_PATHS.getMessages,{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.slice(6)
      },
      method :'post',
      body : JSON.stringify({room_id : chatroom.rooms[0]._id,mount : 10})
    })

    const messages = await resMessage.json();
    return {
        props: {
          data : result.data,
          cookies : token.slice(6),
          chatroom : chatroom,
          messages : messages
        }, // will be passed to the page component as props
      }
}

export default Chat