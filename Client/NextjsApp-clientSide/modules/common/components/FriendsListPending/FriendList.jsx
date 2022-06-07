import React from 'react'
import FriendPendding from './FriendPendding';

const FriendList = (props) => {

  console.log(props)
  return (<>
    <div className="flex justify-between items-center px-4 pt-4">
        <span className="font-semibold text-gray-500 text-lg dark:text-dark-txt">Firend requests</span>
        <span className="text-blue-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-third p-2 rounded-md">See All</span>
    </div>
    <div className="p-2">
       { props.friendsRequest ? props.friendsRequest.map((e,index)=>{
             return (
        <a href="#" key={index} className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third rounded-lg transition-all">
            <FriendPendding name={e.name} _id = {e.user_id} email ={e.email} />
        </a> )}) : null }
    </div></>
  )
}

export default FriendList;