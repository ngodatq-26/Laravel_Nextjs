import React from 'react'
import { useSelector } from 'react-redux'
import MyFriend from './MyFriend'

const MyFriendsList = () => {

  const friends = useSelector((state) => state.commonReducer.user.friends);
  return (    
            <>
                <div className="flex justify-between items-center px-4 pt-4 text-gray-500 dark:text-dark-txt">
                    <span className="font-semibold text-lg">Contacts</span>
                    <div className="flex space-x-1">
                        <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-dark-third rounded-full cursor-pointer">
                            <i className='bx bx-search-alt-2'></i>
                        </div>
                        <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-dark-third rounded-full cursor-pointer">
                            <i className='bx bx-dots-horizontal-rounded'></i>
                        </div>
                    </div>
                </div>
                <ul className="p-2">
                {
            friends ? friends.map((e,index)=>{
                return (
                    <li key={index}>
                        <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third dark:text-dark-txt rounded-lg cursor-pointer">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=40&q=80" className="mx-auto object-cover rounded-full h-10 w-10" alt="Friends profile picture" />
                                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                            </div>
                            <div>
                                <span className="font-semibold">{e.name}</span>
                            </div>
                        </div>
                    </li>) }) : null }
                </ul>  
            </>
  )
}

export default MyFriendsList