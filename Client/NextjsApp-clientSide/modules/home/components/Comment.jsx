import React from 'react';
import { connectLaravel } from '../../../utils/connectPusher';
import { convertTime } from '../../../utils/constant';

const Comment = (props) => {

  const time = React.useMemo(() => convertTime(props.updated_at))
  return ( 
    <div className= "flex space-x-2">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Profile picture" className= "w-9 h-9 rounded-full" />
              <div>
                  <div className= "bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
                      <span className= "font-semibold block">{props.name}</span>
                      <span>{props.text}</span>
                  </div>
                  <div className= "p-2 text-xs text-gray-500 dark:text-dark-txt">
                      <span className= "font-semibold cursor-pointer">Like</span>
                      <span>.</span>
                      <span className= "font-semibold cursor-pointer">Reply</span>
                      <span>.</span>
                      {time}
                  </div>
              </div>
          </div>
  )
}

export default React.memo(Comment)