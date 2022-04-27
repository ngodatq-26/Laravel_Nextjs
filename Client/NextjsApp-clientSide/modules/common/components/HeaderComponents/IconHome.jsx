import { Button } from '@mui/material'
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

const IconHome = () => {
  return (
    <Link href="/Home">
    <Button style={{color : 'black',display :'flex',flexDirection:'column'}}>
        <HomeIcon />
        <p></p>
    </Button>
    </Link>
  )
}

export default IconHome