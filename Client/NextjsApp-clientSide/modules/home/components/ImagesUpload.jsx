import React from 'react'

const ImagesUpload = () => {
    
  return (
    <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
        <div className="grid grid-cols-6 col-span-2   gap-2  ">
            <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                <img className="h-full w-full object-cover " src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80" alt=""/>
            </div>          
        </div>
    </div>
  )
}

export default React.memo(ImagesUpload)