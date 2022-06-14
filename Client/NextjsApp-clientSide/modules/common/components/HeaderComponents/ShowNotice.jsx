import React from 'react'
import { useSelector } from 'react-redux'

const ShowNotice = (props) => {
  
  const notices = useSelector(state => state.commonReducer.notice);
  console.log(notices)
  return (<>
   {props.show ?
    <div className= "bg-white mt-40 px-4 py-3 rounded-lg shadow-md max-w-xs" style={{width : '30%',right:'5%',position : 'absolute',marginTop : '5px'}}>
            <div className= "flex items-center justify-between">
                <span className= "font-medium text-sm">New Notification</span>
                <button className= "bg-gray-200 p-2 rounded-full" onClick={(e) => {
                    e.preventDefault();
                    props.setShowNoti(false)
                }}>
                    <svg className= "h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                </button>
            </div>
            {
                notices ? notices.map((e,index) => {
                    return (
                        <div className= "flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer" key={index}>
                            <div className= "flex flex-shrink-0 items-end">
                                
                            </div>
                            <div className= "ml-3">
                                <span className= "font-medium text-sm"></span>
                                <p className= "text-sm">{e.text}</p>
                                <span className= "text-sm text-blue font-semibold">a few seconds ago</span>
                            </div>
                            <div>
                                <svg viewBox="0 0 8 8" fill="currentColor" className= "h-4 w-4 text-blue"><circle cx="4" cy="4" r="3"></circle></svg>
                            </div>
                        </div>
                    )
                })
             : null
            }
   </div> : null}
   </>
  )
}

export default ShowNotice