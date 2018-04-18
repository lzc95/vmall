import React from 'react';
import '../common/css/banner.css'
class Banner extends React.Component{
     render(){
         return(
             <div className='banner'>
                <a href='#'><img src="/src/common/img/banner.jpg"/></a>
             </div>
         )
     }
}
export default Banner;