import React from 'react';

const SearchInput = () => {

  const [search,setSearch] = React.useState('');
  
  return (
    <input type="text" 
           value={search}
           onChange={(e) =>{
             setSearch(e.target.value)
           }}
           className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input" 
           placeholder="Search"/>
  )
}

export default React.memo(SearchInput);