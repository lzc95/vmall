import React from 'react';
import Aside from '../components/Aside';
import Search from '../components/Search';
import KindsContent from '../components/KindsContent';
import '../common/css/kinds.css'
class Kinds extends React.Component{
    render(){
        return(
            <div className='kinds'>
               <Search/>
               <div >
               <Aside/>
               <KindsContent/>
               </div>
            </div>
        )
    }
}
export default Kinds;