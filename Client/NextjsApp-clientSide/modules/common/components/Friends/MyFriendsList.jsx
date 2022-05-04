import React from 'react'
import { useSelector } from 'react-redux'
import MyFriend from './MyFriend'

const MyFriendsList = () => {

  const friends = useSelector((state) => state.commonReducer.user.friends);
  return (
    
<div className="">
    <div className="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Your friendslist
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
            Details and informations about user.
        </p>
    </div>
    <ul className="flex flex-col">
        {
            friends ? friends.map((e,index)=>{
                return (<div key={index}><MyFriend name={e.name} email={e.email}/></div>)
            }) : null
        }
    </ul>
</div>

  )
}

export default MyFriendsList