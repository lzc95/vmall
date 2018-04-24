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
             order:[],
             noReceipt:[],
             noShip:[],
             evaluate:[]
        }
    
    }

     goOrderDetail(arg){
         this.props.history.push('/orderDetail?orderNumber='+arg)
     }

    componentWillMount(){
        var _this=this;
       axios.post(REQUEST_URL+'/allOrder',{
           
       }).then(function(res){
           var arr=res.data.order;
           var order_number=[];
           var orderArr=[];
           for(var i=0;i<arr.length;i++){
               if(order_number.indexOf(arr[i].order_number)==-1){
                  order_number.push(arr[i].order_number)
               }
           }
           console.log(order_number)
           for(var i=0;i<order_number.length;i++){
               var obj={
                   name:'',
                   content:[],
                   price:'',
                   is_receipt:'',
                   is_ship:''
               };
               for(var j=0;j<arr.length;j++){
                    if(order_number[i]==arr[j].order_number){
                       obj['name']=order_number[i];
                       obj['content'].push(arr[j]);
                       obj['price']=arr[j].pay_price; 
                       obj['is_receipt']=arr[j].is_receipt; //是否已经发货
                       obj['is_ship']=arr[j].is_ship;  //是否已经收货
                    }
               }
               orderArr.push(obj);
           }
          //待收货
           var noReceipt=[];
          //待收货
           var noShip=[]; 
           //待评价
           var evaluate=[]
           for(var i=0;i<orderArr.length;i++){
               if(orderArr[i].is_receipt==0){
                 noReceipt.push(orderArr[i])
               }

               if(orderArr[i].is_receipt==1 && orderArr[i].is_ship==0){
                    noShip.push(orderArr[i])
               }

               if(orderArr[i].is_ship==1){
                 evaluate.push(orderArr[i])
               }

           }

           _this.setState({
               order:orderArr,
               noReceipt:noReceipt,
               noShip:noShip,
               evaluate:evaluate
           })  
       }).catch(function(err){
           console.log(err)
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
                >
                <div >
                    <ul>
                    {
                        this.state.order.map((item)=>{
                              return(
                                <li key={item.name} className='gCon' onClick={this.goOrderDetail.bind(this,item.name)}>
                                    <div>
                                        <p className="orderNum">订单编号:{item.name}</p>
                                         <ul>
                                             {
                                                item.content.map((item_)=>{
                                                    return(
                                                        <li key={item_.id} className='goods'>
                                                            <img src={URL+item_.gPic} className="gPic"/>
                                                            <span className='gName'>{item_.gName}</span><br/>
                                                            <span className='num_price'>
                                                            ¥{item_.goods_price}&nbsp;&nbsp;X{item_.goods_num}
                                                            </span>
                                                            <p style={{clear:'left'}}></p>
                                                        </li>
                                                    )
                                                })
                                             }
                                         </ul>
                                        <p className='payPrice'>实际支付:¥{item.price}</p>
                                    </div>
                                </li>
                              )
                        })
                    }
                    </ul>
                </div>
                <div >
                <ul>
                    {
                        this.state.noReceipt.map((item)=>{
                              return(
                                <li key={item.name} className='gCon' onClick={this.goOrderDetail.bind(this,item.name)}>
                                    <div>
                                        <p className="orderNum">订单编号:{item.name}</p>
                                         <ul>
                                             {
                                                item.content.map((item_)=>{
                                                    return(
                                                       
                                                        <li key={item_.id} className='goods'>
                                                            <img src={URL+item_.gPic} className="gPic"/>
                                                            <span className='gName'>{item_.gName}</span><br/>
                                                            <span className='num_price'>
                                                            ¥{item_.goods_price}&nbsp;&nbsp;X{item_.goods_num}
                                                            </span>
                                                            <p style={{clear:'left'}}></p>
                                                        </li>
                                                    )
                                                })
                                             }
                                         </ul>
                                        <p className='payPrice'>实际支付:¥{item.price}</p>
                                    </div>
                                </li>
                              )
                        })
                    }
                    </ul>
                </div>
                <div >
                <ul>
                    {
                        this.state.noShip.map((item)=>{
                              return(
                                <li key={item.name} className='gCon' onClick={this.goOrderDetail.bind(this,item.name)}>
                                    <div>
                                        <p className="orderNum">订单编号:{item.name}</p>
                                         <ul>
                                             {
                                                item.content.map((item_)=>{
                                                    return(
                                                       
                                                        <li key={item_.id} className='goods'>
                                                            <img src={URL+item_.gPic} className="gPic"/>
                                                            <span className='gName'>{item_.gName}</span><br/>
                                                            <span className='num_price'>
                                                            ¥{item_.goods_price}&nbsp;&nbsp;X{item_.goods_num}
                                                            </span>
                                                            <p style={{clear:'left'}}></p>
                                                        </li>
                                                    )
                                                })
                                             }
                                         </ul>
                                        <p className='payPrice'>实际支付:¥{item.price}</p>
                                    </div>
                                </li>
                              )
                        })
                    }
                    </ul>
                </div>
                <div >
                <ul>
                    {
                        this.state.evaluate.map((item)=>{
                              return(
                                <li key={item.name} className='gCon' onClick={this.goOrderDetail.bind(this,item.name)}>
                                    <div>
                                        <p className="orderNum">订单编号:{item.name}</p>
                                         <ul>
                                             {
                                                item.content.map((item_)=>{
                                                    return(
                                                       
                                                        <li key={item_.id} className='goods'>
                                                            <img src={URL+item_.gPic} className="gPic"/>
                                                            <span className='gName'>{item_.gName}</span><br/>
                                                            <span className='num_price'>
                                                            ¥{item_.goods_price}&nbsp;&nbsp;X{item_.goods_num}
                                                            </span>
                                                            <p style={{clear:'left'}}></p>
                                                        </li>
                                                    )
                                                })
                                             }
                                         </ul>
                                        <p className='payPrice'>实际支付:¥{item.price}</p>
                                    </div>
                                </li>
                              )
                        })
                    }
                    </ul>
                </div>
                </Tabs>
                </div>
             </div>
         )
     }
}
export default Order;