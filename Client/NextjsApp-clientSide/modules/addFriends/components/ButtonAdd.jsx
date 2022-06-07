import { Check, ForkRight } from '@mui/icons-material';
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { API_PATHS } from '../../../configs/apiConfigs';
import { fetchAPI } from '../../../utils/fetch';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';


const ButtonAdd = (props) => {

  return (
    <>
                {
                    (props.check == 'friends') ?
                        <Button onClick={props.ClickDeleteFriends} variant="primary"  >
                            {}<Check color="success" />
                        </Button>
                     : 
                         (props.check == 'friends_pendding') ? 
                        <Button onClick = {props.ClickDelete} variant="primary"  style={{alignItems : 'center'}} >
                         {}<PersonRemoveIcon color="primary"/>
                        </Button> : 
                         (props.check == 'friends_request') ?
                        (<div style={{display : 'flex',flexDirection:'row'}}>
                        <Button onClick={props.ClickAccept} variant="primary"  >
                            {}<AddIcon color="success" />
                        </Button> 
                        <Button onClick={props.ClickCancel} variant="primary"  >
                            {}<CancelIcon color="error"/>
                        </Button></div>):
                        <Button onClick={props.ClickAdd} variant="primary"  >
                        {}<PersonAddIcon color="black"/>
                        </Button>
                     
                }</>
  )
}

export default ButtonAdd