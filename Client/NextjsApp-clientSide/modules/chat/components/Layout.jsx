import React from 'react'
import AllFriendChat from './AllFriendChat'
import FriendChat from './FriendChat'
import FriendMessage from './FriendMessage'
import MyMessage from './MyMessage'

const Layout = () => {
  return (
    <div className="flex flex-row justify-between bg-white" style={{position : 'absolute',bottom : '150px',top :'67px'}}>
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        <AllFriendChat />
        
      </div>
      <div className="w-full px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5">
          <MyMessage />
          <FriendMessage />
          <MyMessage />
        </div>
        <div className="py-5">
          <input
            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          />
        </div>
      </div>
      <div className="w-2/5 border-l-2 px-5">
        <div className="flex flex-col">
          <div className="font-semibold text-xl py-4">Mern Stack Group</div>
          <img
            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
            className="object-cover rounded-xl h-64"
            alt=""
          />
          <div className="font-semibold py-4">Created 22 Sep 2021</div>
          <div className="font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            perspiciatis!
          </div>
          </div>
        </div>
    </div>
  )
}

export default Layout