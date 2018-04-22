import React from 'react';
import Header from '../components/Header';

import { Tabs, WhiteSpace } from 'antd-mobile';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';
const URL=REQUEST_URL+'/upload/';
import '../common/css/order.css'

class Order extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
             order:[]
        }
    }


    componentWillMount(){
        var _this=this;
       axios.post(REQUEST_URL+'/allOrder',{
           
       }).then(function(res){
           _this.setState({
               order:res.data.order
           })  
       }).catch(function(err){

       })
    }
    
     render(){
        const tabs = [
            { title: '全部' },
            { title: '待发货' },
            { title: '待收货' },
            { title: '待评价' },
          ];
      
         return(
             <div className='order'>
                <div>
                 <Header title="我的订单" />
                 <p style={{marginTop:50}}></p>
                 <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                className='tab'>
                <div >
                    <ul>
                    {
                        this.state.order.map((item)=>{
                              return(
                                <li key={item.id}>
                                  
                                    <div className='gCon'>
                                        <p>订单编号:{item.order_number}</p>
                                        <img src={URL+item.gPic} className="gPic"/>
                                        <span className='gName'>{item.gName}</span>
                                        <p style={{clear:'left'}}></p>
                                    </div>
                                </li>
                              )
                        })
                    }
                    </ul>
                </div>
                <div >
                    Content of second tab
                </div>
                <div >
                    Content of third tab
                </div>
                <div >
                    Content of 4 tab
                </div>
                </Tabs>
                </div>
             </div>
         )
     }
}
export default Order;