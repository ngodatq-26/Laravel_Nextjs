import React from 'react';
import { connectLaravel } from '../../../utils/connectPusher';
const Comment = (props) => {

  return (
    <div className="text-black p-4 antialiased flex">
        <img className="rounded-full h-8 w-8 mr-2 mt-1 " src="https://picsum.photos/id/1027/200/200"/>
        <div>
            <div className="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                <div className="font-semibold text-sm leading-relaxed">{props.name}</div>
                <div className="text-xs leading-snug md:leading-normal">{props.text}</div>
            </div>
            <div className="text-xs  mt-0.5 text-gray-500">14 w</div>
            
        </div>
    </div>
  )
}

export default React.memo(Comment)