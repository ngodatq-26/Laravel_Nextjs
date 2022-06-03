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
    };

    React.useEffect(() => {
        setTimeout(() => setSuccess(false),3000)
    },[success]);

    const AllCommentHandle = React.useCallback(async () =>{
        setLoadingComment(true);
        const res = await fetchAPI(API_PATHS.getAllComment,'POST',{post_id : props.post_id},true);
        setLoadingComment(false);
        setDataComment(res.data.comment)
    },[])

    const CommentHandle =  async () => {
            connectLaravel()        
            const channel = window.Echo.channel("my-channel");
            channel.listen(".my-event", function(res) {
                setDataComment(res.cmt);
            });
            const res = await fetchAPI(API_PATHS.createComment,'POST',{post_id : props.post_id, text : comment},true);
            setComment('');
            setSuccess(true);        
    }

    return (
        <>
      {loading  ? <Skeleton /> : 
      <div className="bg-white shadow rounded-lg mb-6">
            <div className="flex flex-row px-2 py-3 mx-3">
                <div className="w-auto h-auto rounded-full">
                    <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" />
                </div>
                <div className="flex flex-col mb-2 ml-4 mt-1">
                    <div className="text-gray-600 text-sm font-semibold">{props.name}</div>
                    <div className="flex w-full mt-1">
                        <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                            SEO
                        </div> 
                        <div className="text-gray-400 font-thin text-xs">
                            • 30 seconds ago
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-100"></div> 
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                <div className="grid grid-cols-6 col-span-2   gap-2  ">
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
            <div className="text-gray-500 text-sm mb-6 mx-3 px-2">{props.post_main}</div>
            <div className="flex justify-start mb-4 border-t border-gray-100">
                <div className="flex w-full mt-1 pt-2 pl-5">
                    <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                    </span>
                    <img className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" />
                    <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""/>
                    <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80" alt=""/>
                    <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80" alt=""/>
                </div>
                <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                    </span>
                    <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                        <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <div className="flex w-full border-t border-gray-100">
                <div className="mt-3 mx-5 flex flex-row text-xs">
                    <div onClick = {ShowCommentHandle} className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center"><a style={{cursor :'pointer'}}>Comments:</a><div className="ml-1 text-gray-400 text-ms"> {dataComment ? dataComment.length : null}</div></div>
                    <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Views:<div className="ml-1 text-gray-400 text-ms"> 60k</div></div>
                </div>
                <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div className="ml-1 text-gray-400  text-ms"> 120k</div></div>
                </div>
            </div> 
            {
                showComment ? 
                <AllComment dataComment = {dataComment} /> : null
            }  
            {
                loadingComment ? <Skeleton /> : null
            }  
            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                <img className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button onClick={CommentHandle} type="submit" className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                      <SendIcon />
                    </button>
                </span>
                    <input type="text"
                     value={comment}
                     onChange = {(e) => setComment(e.target.value)}
                     className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400" style={{borderRadius: "25px"}} placeholder="Post a comment..." autoComplete="off"/>
            </div>
            {
                success ? <SnackbarCustom title="comment successfully" error="success" /> : null
            }
      </div>}</>
    )
}

export default React.memo(PostComponent)