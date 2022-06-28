import React from 'react'
import { useSelector } from 'react-redux'

const ShareComment = () => {

 const user = useSelector(state =>state.commonReducer.user);

 const friends = user.friends;
  return ( 
        <div style={{    width: '300px',
            position: 'absolute',
            zIndex: 100,
            bottom: '10%' }}class="container mx-auto items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul class="flex flex-col divide divide-y">
                {friends ? friends.map((e,index) => {
                    return (
                    <li class="flex flex-row items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third dark:text-dark-txt rounded-lg cursor-pointer" key={index}>
                        <div class="select-none cursor-pointer flex flex-1 items-center p-4">
                            <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                <a href="#" class="block relative">
                                    <img alt="profil" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=40&q=80" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                                </a>
                            </div>
                            <div class="flex-1 pl-1 mr-16">
                                <div class="font-medium dark:text-white">
                                    {e.name}
                                </div>
                                <div class="text-gray-600 dark:text-gray-200 text-sm">
                                    friends
                                </div>
                            </div>
                            <div class="text-gray-600 dark:text-gray-200 text-xs">
                            </div>
                        </div>
                    </li>
                    )
                }) : null}   
            </ul>
        </div>
  )
}

export default ShareComment