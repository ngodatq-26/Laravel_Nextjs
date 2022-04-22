import { Button } from '@mui/material';
import React from 'react'

const SearchAll = () => {
  return (
    <li className="flex flex-row" style={{margin :'30px'}}>
         <div className="select-none cursor-pointer flex flex-1 items-center p-4">
             <Button style={{width : '100%'}}>Xem tất cả</Button>
         </div>
    </li>
  )
}

export default React.memo(SearchAll);