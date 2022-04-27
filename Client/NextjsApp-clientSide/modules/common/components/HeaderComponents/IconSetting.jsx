import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material'

const IconSetting = () => {
  return (
    <Button style={{color : 'black',display :'flex',flexDirection:'column'}}>
        <SettingsIcon />
        <p></p>
    </Button>
  )
}

export default IconSetting