import React from 'react';
import '../common/css/KeyBoard.css'
class KeyBoard extends React.Component{
     render(){


         return(
             <div>
                 <div>
                     <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                     </ul>
                     <ul className='keyNum'>
                         <li>1</li>
                         <li>2</li>
                         <li>3</li>
                         <li>4</li>
                         <li>5</li>
                         <li>6</li>
                         <li>7</li>
                         <li>8</li>
                         <li>9</li>
                         <li style={{background:'#E2E6EB'}}></li>
                         <li>0</li>
                         <li><img src="/src/common/img/delNum.svg"/></li>

                     </ul>
                 </div>
             </div>
         )
     }
}

export default KeyBoard;