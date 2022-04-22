import React from 'react';
import Footer from '../modules/home/components/Footer';
import HeaderCustom from '../modules/home/components/HeaderCustom';
import PostComponent from '../modules/home/components/PostComponent';
const Home = () =>{

    const a = [1,2,3]
    return (
      <div style={{display :'flex',flexDirection : 'column'}}>
        <HeaderCustom />
        <div style={{display :'flex',flexDirection:'row'}}>
          <div style={{display : 'flex',flex :'0.5'}}></div>
          <div className="bg-white mt-3" style={{display : 'flex',flex :'1',flexDirection:'column'}}>
            {
              a.map((e,index) =>{
                return (
                  <PostComponent />
                )
              })
            }
          </div>
          <div style={{display : 'flex',flex :'0.5'}}></div>
        </div>
        <div style={{width : "100%",bottom : 0}}>
          <Footer />
        </div>
      </div>
    )
}

export default Home;

