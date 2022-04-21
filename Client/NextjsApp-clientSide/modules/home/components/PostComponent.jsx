import React from 'react';
import Image from 'next/image';
const PostComponent = () =>{

    return (
        <div className="bg-white mt-3">
        
        <div className="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
          A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
        </div>
        <div className="bg-white p-1 border shadow flex flex-row flex-wrap">
          <div className="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
          <div className="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
          <div className="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">Comment</div>
        </div>
        
        <div className=" border-4 bg-gray-300 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
          <div className="w-full">
            <div className="w-full text-left text-xl text-gray-600">
              @Some Person
            </div>
            A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
            A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
          </div>
        </div>
      </div>
    )
}

export default PostComponent