import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { fetchAPI } from '../../../utils/fetch';
import { API_PATHS } from '../../../configs/apiConfigs';
import SnackbarCustom from '../../common/components/SnackbarCustom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TableShare(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [text,setText] = React.useState('');
  const [res,setRes] = React.useState('');
  const [status,setStatus] = React.useState('');

  const user = useSelector(state => state.commonReducer.user);
  const friends = user.friends;
  const shareHandle = async () =>{
    var list = [];
    var a = document.getElementsByClassName('form-check-input');
    for(let i =0;i<a.length;i++) {
      if(a[i].checked) {
        list.push(a[i].value);
      }
    }
    if(list.length >= 1) {
      const res1 = await fetchAPI(API_PATHS.shareThisPost,'POST',{
        post_id : props.post_id,
        send_to : list,
        text : text
      },true)
      setRes(res1.data.message)
      setStatus(res1.data.status)
      setOpen(false)
    }
  }

  React.useEffect(() =>{
    setTimeout(() =>{
      setRes('')
      setStatus('')
    },3000)
  },[status])

  return (
    <div>
      <span className= "text-sm font-semibold" onClick={handleOpen}>share</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className= "flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                   <input className= "bg-gray-100 outline-none" type="text" placeholder="Type text share" value={text} onChange={(e) => setText(e.target.value)}/>
              </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ul className="p-2">
                  { friends ? friends.map((e,index) => { return ( 
                     <li key={index}>
                        <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third dark:text-dark-txt rounded-lg cursor-pointer">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=40&q=80" className="mx-auto object-cover rounded-full h-10 w-10" alt="Friends profile picture" />
                                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                            </div>
                            <div>
                                <span className="font-semibold">{e.name}</span>
                            </div>
                            <div className="">
                                <input  type="checkbox" value={e.user_id} className= "form-check-input" />
                            </div>
                        </div>
                    </li>)}) : null }
                </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ margin: '10px' }}>
              <button onClick = {shareHandle} className= "px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Yes</button>
              <button onClick={handleClose} className= "px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">No</button>
          </Typography>
        </Box>
      </Modal>
      {
        res ? <>
        {
          (status != 401) ? <SnackbarCustom title={res} alert='success' /> : 
          <SnackbarCustom title={res} alert='error' />
        }</> : null
        }
    </div>
  );
}