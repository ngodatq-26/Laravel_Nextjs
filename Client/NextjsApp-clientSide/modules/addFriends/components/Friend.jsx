import { ForkRight } from '@mui/icons-material';
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const Friend = (props) =>{

    const [addFriend,setAddFriend] = React.useState(false);
    
    const addNewFriend =React.useCallback(() =>{
        setAddFriend(true);
    },[addFriend]);

    const removeAddFriend = React.useCallback(() =>{
        setAddFriend(false);
    },[addFriend])
    return (
        <li className="flex flex-row" style={{margin :'30px'}}>
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
                    !addFriend ? (
                        <Button variant="primary"  style={{alignItems : 'center'}} onClick={addNewFriend}>
                            {}<PersonAddIcon/>
                        </Button>
                    ) : (
                        <Button variant="primary"  style={{alignItems : 'center'}} onClick={removeAddFriend}>
                            {}<PersonRemoveIcon color="primary"/>
                        </Button>
                    )
                }
            </div>
        </li>
    )
}

export default React.memo(Friend);