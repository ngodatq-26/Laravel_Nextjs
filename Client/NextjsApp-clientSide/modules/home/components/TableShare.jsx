import { Button } from '@mui/material'
import React from 'react'
import { style } from '../../../utils/constant';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchAPI } from '../../../utils/fetch';
import { API_PATHS } from '../../../configs/apiConfigs';
import SnackbarCustom from '../../common/components/SnackbarCustom';

const TableShare = (props) => {

  const user = useSelector(state => state.commonReducer.user)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name,setName] = React.useState('');
  const [res,setRes] = React.useState('');
  const [status,setStatus] = React.useState('');
  const friends = user.friends;

  const createHandle = async () =>{
    var list = [user.user_id];
    var a = document.getElementsByClassName('form-check-input');
    for(let i =0;i<a.length;i++) {
      if(a[i].checked) {
        list.push(a[i].value);
      }
    }

    if(list.length >=2 && name) {
      const res1 = await fetchAPI(API_PATHS.createRoom,'POST',{arrayMembers : list,name : name},true)
      
      setRes(res1.data.message)
      setStatus(res1.data.status)
      setOpen(false)
      setName('');
      if(res1.data.success == true) {
        props.setRooms([...props.rooms,res1.data.info])
      }
    }
  }

  React.useEffect(() =>{
    setTimeout(() =>{
      setRes('')
      setStatus('')
    },3000)
  },[status])

  return (
    <div className="w-2/5 border-l-2 px-5" style={{marginLeft : '25px'}}>
      
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <input
                type="text"
                placeholder="text share"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            { friends ?
              friends.map((e,index) =>{
                return (
                  <div className="py-5 px-3" key={index}>
                    <div className="flex justify-between px-2 py-2 bg-blue-100 rounded">
                      <p className="flex text-gray-700">
                          <svg className="h2 w-2 text-teal-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
                          <circle cx="4" cy="4" r="3" />
                          </svg>
                          {e.name}
                      </p>
                      <div className="form-check">
                          <input className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={e.user_id} />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault" x>invite</label>
                      </div>
                    </div>
                  </div>
                )
              }) : null
            }
          </Typography>
          <div style={{marginLeft : '200px'}}>
            <Button onClick={createHandle}>Yes</Button>
            <Button onClick={() =>{setOpen(!open)}}>No</Button>
          </div>
        </Box>
      </Modal>      
        <div className="flex flex-col">
        {
        res ? <>
        {
          (status != 401) ? <SnackbarCustom title={res} alert='success' /> : 
          <SnackbarCustom title={res} alert='error' />
        }</> : null
        }
          <div>
            <span onClick={handleOpen} className= "text-sm font-semibold">Share</span>
          </div>
        </div>
    </div>
  )
}

export default TableShare