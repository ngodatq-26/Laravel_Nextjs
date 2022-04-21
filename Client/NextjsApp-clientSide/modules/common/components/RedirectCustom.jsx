import React from 'react';

const RedirectCustom = () => {
    React.useEffect (() =>{
      Router.push("/Home")

    },[])
   return (
     <span>Loading....</span>
   )
}

export default RedirectCustom;