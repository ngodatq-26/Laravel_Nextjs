import React from 'react'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import { useDispatch } from 'react-redux'

const AllComment = (props) => {

  return (<>
    { props.dataComment ? props.dataComment.map((e,index) =>{
        return (
            <div key={index}>
               <Comment name={e.name} text={e.text} />
            </div>
        )
    }) : null }</>
  )
}

export default AllComment