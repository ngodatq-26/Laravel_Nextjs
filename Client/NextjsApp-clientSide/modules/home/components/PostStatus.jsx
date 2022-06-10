import React from 'react'
import { Button } from '@mui/material'
import { fetchAPI } from '../../../utils/fetch';
import { API_PATHS } from '../../../configs/apiConfigs';
import { useSelector } from 'react-redux';
import ImagesUpload from './ImagesUpload';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constant';
import { CircularProgress } from '@mui/material';
import { Modal,Box,Typography } from '@mui/material';
import {style} from '../../../utils/constant'
import SnackbarCustom from '../../common/components/SnackbarCustom';

const PostStatus = () => {

  const token = Cookies.get(ACCESS_TOKEN_KEY);
  const authchek = "Bearer " + token;
  const [open, setOpen] = React.useState(false);
  const [success,setSuccess] = React.useState(false);
  const [images,setImages] = React.useState([]);
  const [loadingPost,setLoadingPost] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [dataPost,setDataPost] = React.useState(
      {
          title : '',
          main : '',
          share : [],
          react : [],
      }
  );

  const handleOpen = () => {if(dataPost.main) {
    setOpen(true);
  } }
  const handleClose = () => setOpen(false);  


  const postData = async () =>{
      setLoadingPost(true);
      const res = await (await fetchAPI(API_PATHS.createPost,'POST',{...dataPost,images : images},true))
      setLoadingPost(false);
      setSuccess(true);
      setDataPost({
        title : '',
        main : '',
        share : [],
        react : [],
      });
      setOpen(false);
      setImages([]);
  }

  React.useEffect(() => {
      setTimeout(() => setSuccess(false),3000)
  },[success]);

  const post_Images = async (data) => {
    const formdata = new FormData();
    formdata.append('image',data);
    if(formdata) {
        setLoading(true);
        await axios.post('http://localhost:8000/api/home/images_post', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                Authorization : authchek || '',
            },
        }).then(e => {
            setImages([...images,e.data.images])
        })
        setLoading(false);
    }
  }
  
  return (
    <form className="bg-white shadow rounded-lg mb-6 p-4" style={{marginTop : '70px'}}>
            <input  
            style={{height : '50px',marginBottom : '20px'}}
            value={dataPost.main}             
            onChange={(e) =>{setDataPost({...dataPost,main : e.target.value})}}
            name="message" placeholder="Type something..." className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"></input>
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
                <Button onClick={handleOpen} variant="outlined" href="#outlined-buttons">
                    Post
                </Button>
            </footer>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {
                            loadingPost ? <div style={{alignItems : 'center',marginLeft : '150px'}}><CircularProgress /></div> : <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Post
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Ban co chac chan post bai viet nay
                            </Typography>
                            <div style={{marginLeft : '200px'}}>
                                <Button onClick={postData}>Yes</Button>
                                <Button onClick={() =>{setOpen(!open)}}>No</Button>
                            </div>
                            </div>
                        }
                    </Box>
            </Modal>
            { success ? <SnackbarCustom title="post successfully" alert="success" /> : null }
            <div style={{display : 'flex',flexDirection : 'row'}}>
                   
                    {
                        loading ? <div style={{alignItems : 'center',margin : '40px'}}><CircularProgress /></div> : null 
                    }
                    <div>{ images[0]  ? 
                    <ImagesUpload images = {images}/> : null}</div>
            </div>
    </form>
  )
}

export default React.memo(PostStatus)