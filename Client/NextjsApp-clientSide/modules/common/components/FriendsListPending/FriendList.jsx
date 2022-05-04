import React from 'react'
import FriendPendding from './FriendPendding';

const FriendList = (props) => {

  return (
    <div className="" style={{width : '100%'}}>
      <div className="flex-row gap-4 flex justify-center items-center ">
        <p className="text-blue-600" style={{fontSize :'20px'}}>All Requests</p>
      </div> 
      <div >
         {
           props.friendsRequest ? props.friendsRequest.map((e,index)=>{
             return (
               <div key={index}>
               <FriendPendding name={e.name} email={e.email} _id= {e.user_id}/>
               </div>
             )
           }) : null
         }
      </div>  
   </div> 
  )
}

export default FriendList;