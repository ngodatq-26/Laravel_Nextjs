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

const Friend = (props) =>{

    const [addFriend,setAddFriend] = React.useState(false);
    const [check,setCheck] = React.useState('');

    const user = useSelector((state) => state.commonReducer.user)
    React.useEffect(()=>{
        for(let i = 0;i < user.friends.length;i++) {
            if(props._id == user.friends[i].user_id) {
                setCheck('friends');
            }
        }

        for(let i = 0;i < user.friends_pendding.length;i++) {
            if(props._id == user.friends_pendding[i].user_id) {
                setCheck('friends_pendding');
            }
        }

        for(let i = 0;i < user.friends_request.length;i++) {
            if(props._id == user.friends_request[i].user_id) {
                setCheck('friends_request');
            }
        }
    },[])


    const ClickAdd = React.useCallback(async () => {
        const res = await fetchAPI(API_PATHS.addPenddingFriend,'POST',{
            name : props.name,
            _id : props._id
        },true)
        setCheck('friends_pendding');
    },[])

    const ClickDelete = React.useCallback(async () => {
        const res = await fetchAPI(API_PATHS.deletePenddingFriend,'POST',{
            name : props.name,
            _id : props._id
        },true)
        setCheck('');
    },[])

    const ClickAccept = React.useCallback(async () =>{
        const res = await fetchAPI(API_PATHS.acceptAdd,'POST',{
            name : props.name,
            _id : props._id
        },true)
        setCheck('friends');
    },[])

    const ClickCancel = React.useCallback(async () =>{
        const res = await fetchAPI(API_PATHS.cancelAdd,'POST',{
            name : props.name,
            _id : props._id
        },true)
        setCheck('');
    },[])

    const ClickDeleteFriends = React.useCallback(async () => {
        const res = await fetchAPI(API_PATHS.deleteFriend,'POST',{
            name : props.name,
            _id : props._id
        },true)
        setCheck('');
    },[])

    return (
        <li className="flex flex-row " style={{margin :'30px'}}>
            <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <a href="#" className="block relative">
                        <img alt="profil" src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/83913139_780246012454102_8216424590759428096_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=OmxGCbBAY1QAX-lo99u&_nc_ht=scontent.fhan4-1.fna&oh=00_AT-W3GLbDnRympZ8ipx6mjW4uDYOhgP7XgZJf1jr2VfwmQ&oe=62862168" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a>
                </div>
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                        {props.name} 
                    </div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm">
                        {props.email}
                    </div>
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs">
                    
                </div>
                {
                    (check == 'friends') ?
                        <Button onClick={ClickDeleteFriends} variant="primary"  >
                            {}<Check color="success" />
                        </Button>
                     : 
                         (check == 'friends_pendding') ? 
                        <Button onClick = {ClickDelete} variant="primary"  style={{alignItems : 'center'}} >
                         {}<PersonRemoveIcon color="primary"/>
                        </Button> : 
                         (check == 'friends_request') ?
                        (<div style={{display : 'flex',flexDirection:'row'}}>
                        <Button onClick={ClickAccept} variant="primary"  >
                            {}<AddIcon color="success" />
                        </Button> 
                        <Button onClick={ClickCancel} variant="primary"  >
                            {}<CancelIcon color="error"/>
                        </Button></div>):
                        <Button onClick={ClickAdd} variant="primary"  >
                        {}<PersonAddIcon color="black"/>
                        </Button>
                     
                }
            </div>
        </li>
    )
}

export default React.memo(Friend);