import { Button, LinearProgress } from '@mui/material';
import Head from 'next/head'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_PATHS } from '../../../configs/apiConfigs';
import { fetchAPI } from '../../../utils/fetch';
import MyMessage from '../../chat/components/MyMessage';
import { setShowRoom } from '../../common/redux/commonReducer';
import Echo from 'laravel-echo';
import { connectLaravel } from '../../../utils/connectPusher';

const ChatBox = () => {

    const show_room = useSelector(state => state.commonReducer.show_room)
    console.log(show_room)
    const dispatch = useDispatch();
    const chatModal = document.querySelector('.chat-modal');
    const [showModal,setShowModal] = React.useState(false);
    const [messages,setMessages] = React.useState();
    const [message,setMessage] = React.useState();
    const [mount,setMount] = React.useState(10);
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() =>{
      connectLaravel();
    },[]);

    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    
    React.useEffect(scrollToBottom, [messages]);

    const scrollGetMessages = async () => {
      const scroll = window.document.getElementById("messages");
      if(scroll.scrollTop == 0) {
        setLoading(true)
        console.log('scroll loading...')
        setMount(mount + 10);
        const result = await fetchAPI(API_PATHS.getMessages,'POST',{
          room_id : show_room._id,
          mount : mount
        },true)
        setLoading(false)
        setMessages(result.data.messages)
      }
    }

    const handleSendMessages = async () =>{
      const channel = window.Echo.channel('messages-chanel');
      channel.listen(".messages-event",async function(res) {
        const result = await fetchAPI(API_PATHS.getMessages,'POST',{
          room_id : show_room._id,
          mount : mount
        },true)
        setMessages(result.data.messages)
      })
      const res = await fetchAPI(API_PATHS.sendMessage,'POST',{
        text : message,
        room_id : show_room._id,
      },true);
      setMessage("")
    };

    React.useEffect(()=>{
        if(show_room) {
          setShowModal(true)
          async function getMessages() {
            const res = await fetchAPI(API_PATHS.getMessages,'POST',{
              room_id : show_room._id,
              mount : 5
            },true);
            setMessages(res.data.messages)
          }
          getMessages()
        }
    },[show_room])

    function closeChatBox() {
        setShowModal(false)
        dispatch(setShowRoom(""));
    };

  return (<>
    <div className="fixed bottom-0 right-0 flex flex-col items-end ml-6 w-full" >
    <div className={`chat-modal ${showModal ? "show" : "hidden"}  mr-5 flex flex-col mb-5 shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4`} style={{width : '21%',position : 'fixed',right : '2%',top :"43%"}}>
      <div className="close-chat bg-red-500 hover:bg-red-600 text-white mb-1 w-10 flex justify-center items-center px-2 py-1 rounded self-end cursor-pointer" onClick={closeChatBox}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
          <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
        </svg>
      </div>
      <div className="flex justify-between items-center text-white p-2 bg-green-500 border shadow-lg mr-5 w-full">
        <div className="flex items-center">
          <img src="https://f0.pngfuel.com/png/136/22/profile-icon-illustration-user-profile-computer-icons-girl-customer-avatar-png-clip-art-thumbnail.png" alt="picture" className="rounded-full w-8 h-8 mr-1" />
          <h2 className="font-semibold tracking-wider">{show_room.name}</h2>
        </div>
        <div className="flex items-center justify-center">
          <small className="mr-1">online</small>
          <div className="rounded-full w-2 h-2 bg-white"></div>
        </div>
      </div>
      <div id="messages" onScroll={scrollGetMessages} className="flex flex-col bg-gray-200 px-2 chat-services expand h-40" style={{overflowY : 'scroll',height : '300px'}}>
      
      { messages ? 
            messages.slice(0).reverse().map((e,index) =>{
              return (
                <div key={index}>
                  <MyMessage user_send = {e.user_send} text={e.text}/>
                </div>
              )
            }) : null
          }
        <div ref={messagesEndRef} />
      </div>
      {
        loading ? <LinearProgress /> : null
      }
      <div className="relative bg-white">
        <input type="text" name="message" placeholder="type send messages" value={message} onChange={(e) => setMessage(e.target.value)}
              className="pl-4 pr-16 py-2 border border-green-500 focus:outline-none w-full" />
          <Button className="absolute right-0 bottom-0 text-green-600 bg-white  hover:text-green-500 m-1 px-3 py-1 w-auto transistion-color duration-100 focus:outline-none" onClick={handleSendMessages}>Send</Button>
      </div>
    </div>
    </div>
    </>
  )
}

export default ChatBox