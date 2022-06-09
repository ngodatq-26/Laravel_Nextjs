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


const PostComponent = (props) =>{

    const [loading,setLoading] = React.useState(false);
    const [dataComment,setDataComment] = React.useState([]); 
    const [comment,setComment] = React.useState();
    const [showComment,setShowComment] = React.useState(false);
    const [loadingComment,setLoadingComment] = React.useState(false);
    const [success,setSuccess] = React.useState(false);

    const ShowCommentHandle = () => {
        if(showComment == false) {
            AllCommentHandle();
        }
        setShowComment(!showComment);       
    }

    React.useEffect(() => {
        setTimeout(() => setSuccess(false),3000)
    },[success]);

    const AllCommentHandle = React.useCallback(async () =>{  
        setLoadingComment(true);
        const res = await fetchAPI(API_PATHS.getAllComment,'POST',{post_id : props.post_id},true);
        setLoadingComment(false);
        setDataComment(res.data.comment);
    },[CommentHandle])

    console.log(dataComment)

    const CommentHandle =  React.useCallback(async () => {
            connectLaravel();   
            console.log('test')
            const channel = window.Echo.channel("my-channel").subscribed(() =>{
                console.log("subscribed")
            });
            channel.listen(".my-event", function(res) {
                setDataComment(old => [...old,res.cmt]);
                console.log('check event')
            });
            const res = await fetchAPI(API_PATHS.createComment,'POST',{post_id : props.post_id, text : comment},true);
            setComment('');
            setSuccess(true);        
    },[comment])

    return (
        <>
      {loading  ? <Skeleton /> : 
      <div class="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
      <div class="flex items-center justify-between px-4 py-2">
          <div class="flex space-x-2 items-center">
              <div class="relative">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Profile picture" class="w-10 h-10 rounded-full" />
                  <span class="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
              </div>
              <div>
                  <div class="font-semibold">
                    {props.name}
                  </div>
                  <span class="text-sm text-gray-500">38m</span>
              </div>
          </div>
          <div class="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-third rounded-full cursor-pointer">
              <i class='bx bx-dots-horizontal-rounded'></i>
          </div>
      </div>

      <div class="text-justify px-4 py-2">
      {props.post_main}
      </div>

      <div class="py-2">
      <div className="grid grid-cols-6 col-span-2   gap-2  " style={{margin : '10px'}}>
                    {
                        props.images ? props.images.map((e,index) => {
                            return  (
                                <div key={index} className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                                    <Image className="h-full w-full object-cover " width={500} height={400} src={require(`../../../../../Server/laravelmongodb/storage/app/${e.path}`)} />
                                </div>
                            )
                        }) : null
                    }
      </div>
      </div>



      <div class="px-4 py-2">
          <div class="flex items-center justify-between">
              <div class="flex flex-row-reverse items-center">
                  <span class="ml-2 text-gray-500 dark:text-dark-txt">999</span>
                  <span class="rounded-full grid place-items-center text-2xl -ml-1 text-red-800">
                      <i class='bx bxs-angry'></i>
                  </span>
                  <span class="rounded-full grid place-items-center text-2xl -ml-1 text-red-500">
                      <i class='bx bxs-heart-circle'></i>
                  </span>
                  <span class="rounded-full grid place-items-center text-2xl -ml-1 text-yellow-500">
                      <i class='bx bx-happy-alt'></i>
                  </span>
              </div>
              <div class="text-gray-500 dark:text-dark-txt">
                  <span>90 comments</span>
                  <span>66 Shares</span>
              </div>
          </div>
      </div>



      <div class="py-2 px-4">
          <div class="border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-1">
              <div class="flex space-x-2">
                  <div class="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                      <i class='bx bx-like'></i>
                      <span class="text-sm font-semibold">Like</span>
                  </div>
                  <div onClick = {ShowCommentHandle} class="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                      <i class='bx bx-comment'></i>
                      <span class="text-sm font-semibold" >Comment</span>
                  </div>
                  <div class="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                      <i class='bx bx-share bx-flip-horizontal'></i>
                      <span class="text-sm font-semibold">Share</span>
                  </div>
              </div>
          </div>
      </div>

      <div class="py-2 px-4">
            {
                showComment ? 
                <AllComment dataComment = {dataComment} /> : null
            }  
            {
                loadingComment ? <Skeleton /> : null
            } 
      </div>

      <div class="py-2 px-4">
          <div class="flex space-x-2">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Profile picture" class="w-9 h-9 rounded-full" />
              <div class="flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center justify-between px-3">
                  <input type="text" value={comment}
                     onChange = {(e) => setComment(e.target.value)}
                     placeholder="Write a comment..." class="outline-none bg-transparent flex-1" />
                  <div class="flex space-x-0 items-center justify-center">
                      <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i class='bx bx-smile'></i></span>
                      <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i class='bx bx-camera'></i></span>
                      <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i class='bx bxs-file-gif'></i></span>
                      <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl"><i class='bx bx-happy-heart-eyes'></i></span>
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