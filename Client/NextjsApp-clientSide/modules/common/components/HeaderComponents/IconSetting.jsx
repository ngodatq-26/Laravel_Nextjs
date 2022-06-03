import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constant';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../redux/commonReducer';
import { setTokenCookies } from '../../../auth/redux/authReducer';
import { useRouter } from 'next/router';
import {style} from '../../../../utils/constant'

const IconSetting = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const SignOut = React.useCallback(() =>{
    Cookies.remove(ACCESS_TOKEN_KEY);
    router.push('/Login');
  },[]);

  return (<>
    <Button onClick={handleOpen} style={{color : 'black',display :'flex',flexDirection:'column'}}>
        <SettingsIcon />
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign Out
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ban co chac chan dang xuat
          </Typography>
          <div style={{marginLeft : '200px'}}>
            <Button onClick={SignOut}>Yes</Button>
            <Button onClick={() =>{setOpen(!open)}}>No</Button>
          </div>
        </Box>
      </Modal>
      </>
  )
}

export default IconSetting