import React from 'react'
import MessageIcon from '@mui/icons-material/Message';
import { Button } from '@mui/material';
import Link from 'next/link';

const IconMessage = () => {
  return (
    <Link href="/Chat">
    <Button style={{color : 'black',display :'flex',flexDirection:'column'}}>
        <MessageIcon />
        <p></p>
    </Button>
    </Link>
  )
}

export default IconMessage