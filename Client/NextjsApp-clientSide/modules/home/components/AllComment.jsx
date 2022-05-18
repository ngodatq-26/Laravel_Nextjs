import React from 'react'
import Comment from './Comment'

const AllComment = (props) => {

  console.log(props)
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