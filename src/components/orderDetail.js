import React from 'react';
import Header from '../components/Header'

import parseQuery from '../common/parseQuery';
import axios from 'axios';
import {REQUEST_URL,toFixed_2} from '../common/lib';

const URL=REQUEST_URL+'/upload/';
import '../common/css/orderDetail.css'
class OrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
           orderDetail:[]
        }
    }

    componentWillMount(){
       //获取订单详情
       var _this=this;
        var query=parseQuery(window.location.href);
        var order_number=query.orderNumber;
        axios.post(REQUEST_URL+'/orderDetail',{
            order_number:order_number
        }).then(function(res){
            var arr=res.data.orderDetail;
            var order_number=[];
            var orderArr=[];
            for(var i=0;i<arr.length;i++){
                if(order_number.indexOf(arr[i].order_number)==-1){
                   order_number.push(arr[i].order_number)
                }
            }
          
            for(var i=0;i<order_number.length;i++){
                var obj={
                    name:'',
                    content:[],
                    price:'',
                    address:'',
                    addressName:'',
                    phone:'',
                    is_receipt:'',
                    is_ship:'',
                };
                for(var j=0;j<arr.length;j++){
                     if(order_number[i]==arr[j].order_number){
                        obj['name']=order_number[i];
                        obj['content'].push(arr[j]);
                        obj['price']=arr[j].pay_price; 
                        obj['address']=arr[j].address; 
                        obj['addressName']=arr[j].name; 
                        obj['phone']=arr[j].phone; 
                        obj['is_receipt']=arr[j].is_receipt; //是否已经发货
                        obj['is_ship']=arr[j].is_ship;  //是否已经收货
                        
                     }
                }
                orderArr.push(obj);
            }
            _this.setState({
                orderDetail:orderArr
            })
        }).catch(function(err){
              console.log(err)
        })
    }

    render(){
        return(
            <div className='orderDetail'>
                <Header title='订单详情'/>
                <div>
                    {
                        this.state.orderDetail.map((item)=>{
                            return(
                              <li key={item.name} className='gCon'>
                                  <div style={{marginTop:50}}>
                                      <div className='orderAddress'>
                                         <img src="/src/common/img/address.svg" className='addressImg'/>
                                         <p className='addressCon'>
                                          <span>{item.addressName}&nbsp;&nbsp;{item.phone}</span><br/>
                                          <span>{item.address}</span>
                                         </p>
                                      </div>
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
                                      <p>
                                          {item.is_receipt!=0 &&<button className="shipSearch">物流查询</button>}
                                          {item.is_receipt==1 &&item.is_ship==0  &&<button className="confirmReceive">确认收货</button>}
                                          {item.is_ship==1 &&<button className="evaluate">去评价</button>}
                                      </p>
                                  </div>
                              </li>
                            )
                      })
                    
                    
                    }
                   
                </div>
               

            </div>
        )
    }
}

export default OrderDetail;