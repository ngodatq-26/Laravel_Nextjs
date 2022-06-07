import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { API_PATHS } from '../../../../configs/apiConfigs';
import { fetchAPI } from '../../../../utils/fetch';
import { setRoomNow } from '../../../chat/redux/chatReducer';
import { setShowRoom } from '../../redux/commonReducer';

const ShowGroup = (props) => {

  const state = useSelector(state =>state)
  console.log(state)
  const dispatch = useDispatch();
  const chatRooms = state.chatReducer.chatRooms;
  const showRoomHandle = (e) =>{
      dispatch(setShowRoom(e))
  }

  return (<>
    { props.show ? 
  <div className="rounded-lg overflow-hidden shadow-lg bg-white min-h-64 lg:w-1/4 sm:w-1/2 md:w-1/3" style={{width : '30%',right:'5%',position : 'absolute',marginTop : '5px'}}>
            <p className=" text-gray-600 mb-2 text-2xl font-thin px-4 pt-3">Contacts</p>
            <div className="px-2" >
                <input type="text" className="pl-8 p-1 bg-gray-200 w-full rounded relative" placeholder="Search teams or members" />
            </div>
            <div className="py-5 px-3" >
                {chatRooms ? chatRooms.map((e,index) => {
                    return (
                        <div className="flex justify-between px-2 py-2" key={index} style={{cursor : 'pointer'}} onClick={(e1) => {
                            e1.preventDefault()
                            showRoomHandle(e)}}>
                            <p className="flex text-gray-700">         
                                {e.name}
                            </p>
                            <p className="text-gray-500 font-thin">chat now</p>
                        </div>
                    )
                }) : <p>no team room</p>}
                
            </div>
            <div className="bg-gray-300 flex flex-row-reverse px-2 py-3">
                 <button className="bg-blue-500 py-2 px-4 rounded text-white">View All</button>
                <button className="py-2 px-4 rounded text-gray-600" onClick={(e) =>{
                    e.preventDefault();
                    props.setShow(false)
                }}>Cancel</button>
            </div>
  </div> : null }</>
  )
}

export default ShowGroup