import { Button } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import {useRouter} from 'next/router';
const SearchInput = (props) => {

  const [search,setSearch] = React.useState('');
  const router = useRouter();
  
  const onClick = () =>{
    router.push({
      pathname: '/Search',
      query: { name: search }
    })
  }

  const link = '/Search/' + search;

  return (
  <div className="border rounded-r-lg relative flex items-center w-full lg:w-64 h-full group">  
    <div className='flex items-center justify-center min-h-screen from-cyan-100 via-pink-200 to-yellow-200 bg-gradient-to-br'>
     <div className="flex items-center max-w-md mx-auto bg-white rounded-lg " x-data="{ search: '' }">
        <div className="w-full">
            <input type="text"
                   value={search}
                   onChange={(e) =>{
                     setSearch(e.target.value);
                   }} 
                   className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                placeholder="search" x-model="search" />
        </div>
     </div>
    </div>
    <div className="border-l-2">
    <Link
      href={{
        pathname: '/Search',
        query: { name: search }
      }}
    >
      <Button variant='primary' >
        <SearchIcon />
     </Button>
     </Link>
    </div>
  </div>
  )
}

export default React.memo(SearchInput);