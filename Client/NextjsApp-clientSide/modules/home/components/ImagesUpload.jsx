import Image from 'next/image'
import React from 'react'

const ImagesUpload = (props) => {

  return (
    <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
        <div className="grid grid-cols-6 col-span-2   gap-2  ">
          { props.images[0] ? 
          props.images.map((e,index) => {
                return (
                  <div key={index} className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                       <Image width={150} height={200} src={require(`../../../../../Server/laravelmongodb/storage/app/${e.path}`)} /> 
                  </div>   
                )
          })  : null       
          }   
        </div>
    </div>
  )
}

export default React.memo(ImagesUpload)