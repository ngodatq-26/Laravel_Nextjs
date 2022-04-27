import React from 'react'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Button } from '@mui/material'

const IconNotifications = () => {
  return (
    <Button style={{color : 'black',display :'flex',flexDirection:'column'}}>
        <CircleNotificationsIcon />
        <p></p>
    </Button>
  )
}

export default IconNotifications