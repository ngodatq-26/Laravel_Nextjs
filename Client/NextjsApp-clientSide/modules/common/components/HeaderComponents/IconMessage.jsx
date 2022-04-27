import React from 'react'
import MessageIcon from '@mui/icons-material/Message';
import { Button } from '@mui/material';

const IconMessage = () => {
  return (
    <Button style={{color : 'black',display :'flex',flexDirection:'column'}}>
        <MessageIcon />
        <p></p>
    </Button>
  )
}

export default IconMessage