import React from 'react'
import { useSelector } from 'react-redux'

const Personal = () => {
  const user = useSelector((state) =>state.commonReducer.user);
  return (
    <div className="block">
            <div className="inline relative">
                <button type="button" style={{display:'flex',flexDirection : 'row'}} className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                    <div className="pl-1">
                        <div className="font-medium dark:text-white">{user.name}</div>
                    </div>

                    <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", height: "100%", width: "100%", fill: "currentcolor"}}>
                            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                        </svg>
                        
                    </div>
                </button>
            </div>
    </div>
  )
}

export default Personal