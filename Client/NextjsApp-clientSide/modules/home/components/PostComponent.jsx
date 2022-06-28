import React from 'react';
import Image from 'next/image';
import { fetchAPI } from '../../../utils/fetch';
import { API_PATHS } from '../../../configs/apiConfigs';
import Skeleton from '../../common/components/Skeleton';
import Comment from './Comment';
import { connectLaravel } from '../../../utils/connectPusher';
import SendIcon from '@mui/icons-material/Send';
import AllComment from './AllComment';
import Echo from 'laravel-echo';
import SnackbarCustom from '../../common/components/SnackbarCustom';
import TableShare from './TableShare';
import { Modal } from 'antd';
import { checkShare, convertTime } from '../../../utils/constant';
import Preview from './Preview';
import { useSelector } from 'react-redux';
import ShareComment from './ShareComment';
import { ChangeInputEmoticon } from '../../../utils/constant';

const PostComponent = (props) =>{

    const friends = useSelector(state => state.commonReducer.friends)
    const [loading,setLoading] = React.useState(false);
    const [dataComment,setDataComment] = React.useState([]); 
    const [comment,setComment] = React.useState();
    const [showComment,setShowComment] = React.useState(false);
    const [loadingComment,setLoadingComment] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [like,setLike] = React.useState();
    const [countLike,setCountLike] = React.useState();
    const [button,setButton] = React.useState(false);
    const [mount,setMount] = React.useState(5);
    const [showShare,setShowShare] = React.useState(false);//state check share by @ comment
    const [friendShare,setFriendShare] = React.useState();
    const [emoji,setEmoji] = React.useState();

    const time = React.useMemo(() => convertTime(props.updated_at));

    console.log(friends)

    React.useEffect(() => {
        async function getAllLike() {
            const res = await fetchAPI(API_PATHS.getAllLike,'POST',{post_id : props.post_id},true);
            setCountLike(res.data.count);
            if(res.data.checkLike == 1) {
                setLike(true);
            } else setLike(false);
        }
        getAllLike();
    },[button]);

    const ShowCommentHandle = () => {
        if(showComment == false) {
            AllCommentHandle();
        }
        setShowComment(!showComment);       
    }

    const LikeHandle = React.useCallback(async() => {
        const res = await fetchAPI(API_PATHS.likeThisPost,'POST',{
            post_id : props.post_id
        })
        setLike(!like);
        setButton(!button);
    },[like])

    React.useEffect(() => {
        setTimeout(() => setSuccess(false),3000)
    },[success]);

    const AllCommentHandle = React.useCallback(async () =>{  
        setLoadingComment(true);
        const res = await fetchAPI(API_PATHS.getAllComment,'POST',{post_id : props.post_id,mount : mount},true);
        setLoadingComment(false);
        const list = res.data.comment.slice(0).reverse();
        setDataComment(list);
    },[CommentHandle]);

    React.useEffect(() =>{
        connectLaravel();
        const channel = window.Echo.channel("my-channel." + props.post_id).subscribed(() =>{
            console.log("subscribed")
        });
        channel.listen(".my-event", function(res) {
            setDataComment(old => [...old,res.cmt])
            console.log('check event')
        });
    },[]);

    const CommentHandle =  React.useCallback(async () => {     
        const res = await fetchAPI(API_PATHS.createComment,'POST',{post_id : props.post_id, text : comment},true);
        setComment('');
        setSuccess(true);       
    },[comment]);

    //share when @ on comment
    const handleShare = () => {   
        console.log('test')
        const cb = () => {
            setShowShare(true)
        }
        const cb2 = () => {
            setShowShare(false)
        }
        checkShare(comment,cb,cb2);
    }

    console.log(showShare)
    React.useEffect(() => {
        handleShare()
    },[comment])

    

    const emotionCallback = (e) => {
        setEmoji(e);
    }

    React.useEffect(() => {
        ChangeInputEmoticon(comment,emotionCallback);  
        if(emoji) {
          const a = comment.split(' ');
          console.log(a);
          a.pop();
          a.pop();
          a.push(emoji);
          console.log(a);
          var s ='';
          for(let i = 0;i<a.length;i++) {
            s = s + a[i];
          }
          setComment(s);
          setEmoji();
        }
      },[comment])

    return (
        <>
      {loading  ? <Skeleton /> : 
    <div style={{position : 'relative'}} className= "shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
      <div className= "flex items-center justify-between px-4 py-2">
          <div className= "flex space-x-2 items-center">
              <div className= "relative">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Profile picture" className= "w-10 h-10 rounded-full" />
                  <span className= "bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
              </div>
              <div>
                  <div className= "font-semibold">
                    {props.name}
                  </div>
                  <span className= "text-sm text-gray-500">{time}</span>
              </div>
          </div>
          <div className= "w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-third rounded-full cursor-pointer">
              <i className= 'bx bx-dots-horizontal-rounded'></i>
          </div>
      </div>

      <div className= "text-justify px-4 py-2">
      {props.post_main}
      </div>

      <div className= "py-2">
      <div className="grid grid-cols-6 col-span-2   gap-2  " style={{margin : '10px'}}>
                    {
                        props.images ? props.images.map((e,index) => {
                            return  (
                                <div key={index} className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                                    <Image className="h-full w-full object-cover " width={500} height={400} src={e} />
                                </div>
                            )
                        }) : null
                    }
      </div>
      </div>
      <Preview main={props.post_main} />
      
      <div className= "px-4 py-2">
          <div className= "flex items-center justify-between">
              <div className= "flex flex-row-reverse items-center">
                  <span className= "ml-2 text-gray-500 dark:text-dark-txt">{countLike}</span>
                  <span className= "rounded-full grid place-items-center text-2xl -ml-1 text-red-800">
                       <i className='bx bxs-like'></i>
                  </span>
              </div>
              <div className= "text-gray-500 dark:text-dark-txt">
                  <span>{dataComment ? dataComment.length : null} comments</span>
                  <span>-</span>
                  <span>Shares</span>
              </div>
          </div>
      </div>



      <div className= "py-2 px-4">
          <div className= "border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-1">
              <div className= "flex space-x-2">
                  <div className= "w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
                    onClick={LikeHandle}
                  >
                      {
                          like ? <i className= 'bx bxs-like' style={{color : 'blue'}}></i> : <i className= 'bx bx-like'></i>
                      }
                      <span className= "text-sm font-semibold">Like</span>
                  </div>
                  <div onClick = {ShowCommentHandle} className= "w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                      <i className= 'bx bx-comment'></i>
                      <span className= "text-sm font-semibold" >Comment</span>
                  </div>
                  <div className= "w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                      <i className= 'bx bx-share bx-flip-horizontal'></i>
                      <TableShare post_id = {props.post_id} />
                  </div>
              </div>
          </div>
      </div>

      <div className= "py-2 px-4">
            {
                showComment ? 
                <AllComment dataComment = {dataComment} /> : null
            }  
            {
                loadingComment ? <Skeleton /> : null
            } 
      </div>
      {showShare ? <ShareComment setFriendShare={setFriendShare} /> : null}     
      <div className= "py-2 px-4">
          <div className= "flex space-x-2">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Profile picture" className= "w-9 h-9 rounded-full" />
              <div className= "flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center justify-between px-3">
                  <input type="text" value={comment}
                     onChange = {(e) => {setComment(e.target.value)}}
                     placeholder="Write a comment..." className= "outline-none bg-transparent flex-1" />
                  <div className= "flex space-x-0 items-center justify-center">
                      <span className= "w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i className= 'bx bx-smile'></i></span>
                      <span className= "w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i className= 'bx bx-camera'></i></span>
                      <span className= "w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i className= 'bx bxs-file-gif'></i></span>
                      <span className= "w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i className= 'bx bx-happy-heart-eyes'></i></span>
                      <button onClick={CommentHandle} className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                      <SendIcon />
                      </button>
                  </div>
              </div>
              
          </div>
      </div>
      
      {
                success ? <SnackbarCustom title="comment successfully" error="success" /> : null
      }
  </div>}</>
    )
}

export default React.memo(PostComponent)