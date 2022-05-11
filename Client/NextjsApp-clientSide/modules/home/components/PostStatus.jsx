import React from 'react'
import { Button } from '@mui/material'
import { fetchAPI } from '../../../utils/fetch';
import { API_PATHS } from '../../../configs/apiConfigs';
import { useSelector } from 'react-redux';
import ImagesUpload from './ImagesUpload';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constant';

const PostStatus = () => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  const authchek = "Bearer " + token;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading,setLoading] = React.useState(false);
  const [dataPost,setDataPost] = React.useState(
      {
          title : '',
          main : '',
          share : [],
          react : [],
          images : [],
      }
  );

  const postData = React.useCallback(async () =>{
      const res = await fetchAPI(API_PATHS.createPost,'POST',dataPost,true)
      console.log(res);
  },[])

  const post_Images = async (data) => {
    const formdata = new FormData();
    formdata.append('image',data);
    if(formdata) {
        setLoading(false);
        await axios.post('http://localhost:8000/api/home/images_post', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                Authorization : authchek || ''
            },
        }).then(e => {
            console.log(e)
        })
        setLoading(true);
    }
  }

  return (
    <form className="bg-white shadow rounded-lg mb-6 p-4">
            <textarea               
            onChange={(e) =>{setDataPost({...dataPost,main : e.target.value})}}
            name="message" placeholder="Type something..." className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"></textarea>
            <footer className="flex justify-between mt-2">
                <div className="flex gap-2">
                    <div>
                      <input type="file" onChange={(e) => post_Images(e.target.files[0])}></input>
                    </div>
                    <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
                <Button onClick={postData} variant="outlined" href="#outlined-buttons">
                    Post
                </Button>
            </footer>
            { setDataPost.images ? 
            <ImagesUpload /> : null}
    </form>
  )
}

export default React.memo(PostStatus)