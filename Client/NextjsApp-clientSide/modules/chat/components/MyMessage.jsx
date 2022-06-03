import React from 'react'
import { useSelector } from 'react-redux'

const MyMessage = (props) => {

  const user = useSelector(state => state.commonReducer.user)
  
  return (
    <> {(user.user_id != props.user_send) ?
    <div className="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              {props.text}
            </div>
    </div> :
    <div className="flex justify-end mb-4">
            <div
              className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
            >
              {props.text}
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
    </div>}
    </>
  )
}

export default MyMessage