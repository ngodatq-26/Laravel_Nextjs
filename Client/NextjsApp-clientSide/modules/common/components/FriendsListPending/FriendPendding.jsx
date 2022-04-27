import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const FriendPendding = () => {
  return (
    <div className="flex-row gap-4 flex justify-center items-center" style={{margin : '20px'}}>
        <div className="flex-shrink-0">
            <a href="#" className="block relative">
                <img alt="profil" src="/images/person/1.jpg" className="mx-auto object-cover rounded-full h-16 w-16 "/>
            </a>
        </div>
        <div className=" flex flex-col">
            <span className="text-gray-600 dark:text-white text-lg font-medium">
                Charlie
            </span>
            <span className="text-gray-400 text-xs">
                CTO
            </span>
        </div>
        <button type="button" style={{margin : '10px',width : '20px'}} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <CheckCircleOutlineIcon />
        </button>
        <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <CancelIcon />
        </button>
    </div>
  )
}

export default FriendPendding