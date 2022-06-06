import React from 'react'
import AllFriendChat from './AllFriendChat'
import FriendChat from './FriendChat'
import MyMessage from './MyMessage'
import Room from './Room'
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useDispatch, useSelector } from 'react-redux'
import { connectLaravel } from '../../../utils/connectPusher'
import Echo from 'laravel-echo'
import { fetchAPI } from '../../../utils/fetch'
import { API_PATHS } from '../../../configs/apiConfigs'
import { setMessages } from '../redux/chatReducer'
import { LinearProgress } from '@mui/material'

const MessagesLayout = (props) => {

  const [message,setMessage] = React.useState('');
  const [list,setList] = React.useState(props.messages);
  const [mount,setMount] = React.useState(10);
  const [loading,setLoading] = React.useState(false);
  const [loadingChange,setLoadingChange] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() =>{
    connectLaravel();
  },[])


  React.useEffect(() =>{
    async function fetchData() {
      setLoadingChange(true);
      const res = await fetchAPI(API_PATHS.getMessages,'POST',{room_id : props.room._id,mount : 10},true)
      setLoadingChange(false);
      setList(res.data.messages);
    }
    fetchData()
  },[props.room])


  const handleSendMessages = async () =>{
    
    const channel = window.Echo.channel('messages-chanel');
    channel.listen(".messages-event",async function(res) {
      
      const result = await fetchAPI(API_PATHS.getMessages,'POST',{
        room_id : props.room._id,
        mount : mount
      },true)
      setList(result.data.messages)
      dispatch(setMessages(result.data.messages))
    })
    const res = await fetchAPI(API_PATHS.sendMessage,'POST',{
      text : message,
      room_id : props.room._id,
    },true);
  };

  const scrollGetMessages = async () => {
    const scroll = window.document.getElementById("messages");
    if(scroll.scrollTop == 0) {
      setLoading(true)
      console.log('scroll loading...')
      setMount(mount + 10);
      const result = await fetchAPI(API_PATHS.getMessages,'POST',{
        room_id : props.room._id,
        mount : mount
      },true)
      setLoading(false)
      setList(result.data.messages)
    }
  }

  React.useEffect(() =>{
    const scroll = window.document.getElementById("messages");
    scroll.scrollTop = scroll.scrollHeight;
  },[]);
  
  return (
    <div className="w-full px-5 flex flex-col justify-between " >
      {loadingChange ? <LinearProgress /> :<>
        <div  id="messages"
              className="flex flex-col mt-5 "
              style={{height : '100%',overflowY : 'scroll'}} 
              onScroll={scrollGetMessages} >
          {
            loading ? <div className="flex-col" style={{margin: '5px'}}>
            <LinearProgress />
                </div> : null
          }
              
          { list ? 
            list.slice(0).reverse().map((e,index) =>{
              return (
                <div key={index}>
                  <MyMessage user_send = {e.user_send} text={e.text}/>
                </div>
              )
            }) : null
          }
        </div>
        </>
              }<form onSubmit ={(e) => {
                e.preventDefault();
                handleSendMessages();
                setMessage('');
                return false;
              }}
            className="py-5" 
            style={{display : 'flex'}}
      >
        <div style={{position : 'relative',display : 'flex',flex : 8}}> 
            <input
              style={{height : '20px'}}
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            >
            </input>
            <EmojiEmotionsIcon sx={{position : 'absolute',right:'1%',top:'20%'}}/>
        </div>
        <ThumbUpIcon onClick={handleSendMessages} sx={{position : 'relative',fontSize : '35px',color:'blue',marginLeft:'5px',cursor : 'pointer'}}/>
      </form></div> 
  )
}

export default MessagesLayout