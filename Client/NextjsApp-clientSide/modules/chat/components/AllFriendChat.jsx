import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FriendChat from './FriendChat'

const AllFriendChat = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  console.log(state.commonReducer.user.friends);

  return (
    <div>
        {
            state.commonReducer.user.friends.map((e,index) =>{
                return (
                    <div key = {index}>
                    <FriendChat name = {e.name} />
                    </div>
                )
            })
        }
    </div>
  )
}

export default AllFriendChat