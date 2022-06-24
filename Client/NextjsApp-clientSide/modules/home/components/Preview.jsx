import React from 'react'
import { checkUrl } from '../../../utils/constant';

const Preview = (props) => {
    const [preview,setPreview] = React.useState()

    const callback =(e) => {
        setPreview(e)
    }

    React.useEffect(() => {
        setPreview();
    },[props.pre])
    
    React.useEffect(()=>{
        checkUrl(props.main,callback)
    },[props.main]);

    console.log(preview)
  return (
  <>
    {preview ?
        <div style={{margin : '5px',cursor : 'pointer',display : 'contents'}} onClick={(e) => { e.preventDefault()
            window.location = preview.og.url }} className= "overflow-hidden shadow-md rounded w-full cursor-pointer">          
            <a href="#" className= "w-full block h-9/12" style={{height : '60%'}}>
                <img style={{height : '300px'}} alt="blog photo" src={preview.og.image} className= "max-h-40 w-full object-cover"/>
                <div className= "bg-white dark:bg-gray-800 w-full p-4">
                    <p className= "text-indigo-500 text-md font-medium">
                    </p>
                    <p className= "text-gray-800 dark:text-white text-xl font-medium mb-2">
                        {preview.og.title}
                    </p>
                    <p className= "text-gray-400 dark:text-gray-300 font-light text-md">
                        {preview.og.description}
                    </p>
                </div>
            </a> 
        </div>: null}
    </>
  )
}

export default Preview