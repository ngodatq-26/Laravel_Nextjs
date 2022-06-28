import Image from 'next/image'
import React from 'react'
import { array } from 'yup';

const ImagesUpload = (props) => {

  const deleteImage = (e) => {
    const list = props.images;
    const listcheck = list.filter(function(ele){
      return ele != e
    })
    props.setImages(listcheck)
  }
  return (
    <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
        <div className="grid grid-cols-6 col-span-2   gap-2  ">
        
          { props.images[0] ? 
          props.images.map((e,index) => {
                return (
                  <div key={index} className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                       <span style={{color : 'red',cursor : 'pointer'}} onClick={(e1) => {
                        e1.preventDefault()
                        deleteImage(e)}}>X</span>
                       <Image width={150} height={200} src={e} /> 
                  </div>   
                )
          })  : null       
          }   
        </div>
    </div>
  )
}

export default React.memo(ImagesUpload)