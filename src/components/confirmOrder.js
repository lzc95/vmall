import React from 'react';
import Header from '../components/Header'
import Keyboard from '../components/keyboard'


import axios from 'axios';
import {REQUEST_URL,toFixed_2} from '../common/lib';
const URL=REQUEST_URL+'/upload/';
import parseQuery from '../common/parseQuery';
import '../common/css/confirmOrder.css';
import '../common/css/checkAddress.css';


class Order extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sum:0,
            cart:[],
            address:[],
            addressList:[],
            allAddress:false,
            keyboard:false
        }
        this.cancel=this.cancel.bind(this);
        this.add=this.add.bind(this);
        this.submitOrder=this.submitOrder.bind(this);
        this.clear_keyboard=this.clear_keyboard.bind(this)
    }

    //更改收货信息
    goAddress(){
        this.setState({
            allAddress:true
        })
        var _this=this
        axios.get(REQUEST_URL+'/address')
         .then(function(res){
             _this.setState({
                 addressList:res.data.addressList  
             })
         }).catch(function(err){
             console.log(err)
         })

    }

    updateAddress(arg){
        var arr=this.state.addressList;
        var temp=[];
        for(var i=0;i<arr.length;i++){
            if(arr[i].aId==arg){
                temp.push(arr[i])
                this.setState({
                    address:temp,
                    allAddress:false
                })
            }
        }
    }

    cancel(){
        this.setState({
            allAddress:false
        })
    }
    add(){
         this.props.history.push('/addAddress')
    }


    //取消密码键盘
    clear_keyboard(){
        this.setState({
           keyboard:false  
        })
    }

    //提交订单
    submitOrder(){
        this.setState({
            keyboard:true
        })
        
    }

    componentWillMount(){
        var url=window.location.href;
        var query=parseQuery(url);
        var _this=this;
        axios.post(REQUEST_URL+'/confirmOrder',{
           cart:query.cart
        }).then(function(res){
            var data=res.data.cart;
            var sum=_this.state.sum;
            for(var i=0;i<data.length;i++){
                 sum+=data[i].num*data[i].gPrice;
            }

           _this.setState({
               cart:res.data.cart,
               sum:sum
           })
        }).catch(function(err){
            console.log(err)
        })

        //请求默认地址
        axios.get(REQUEST_URL+'/getDefaultAddress')
        .then(function(res){
              _this.setState({
                  address:res.data.defaultAddress
              })
        }).catch(function(err){
            console.log(err)
        })
    }


     render(){
         let allAddress;
         if(this.state.allAddress){
            allAddress=(
            <div className='mask'>
              <div  className='allAddress'>
              <p className="operation">
                  <span className="cancel" onClick={this.cancel}>取消</span> 
                  <span className="add" onClick={this.add}>添加地址</span>
              </p>
              <ul className='allAddressCon'>
                    {
                        this.state.addressList.map((item)=>{
                               return(
                                <li key={item.aId} onClick={this.updateAddress.bind(this,item.aId)}> 
                                    <p>
                                       <span>{item.name}&nbsp;{item.phone}<br/>
                                       {item.address}</span>
                                     </p>
                                      
                                </li>
                               )
                        })
                       
                    }         
                </ul>
              </div>
            </div>
            )
         }
         else{
            allAddress=(
                <div></div>
            )
         }
   
        //密码键盘的显示与隐藏
         let keyboard;
         if(this.state.keyboard){
             keyboard=(
                 <div>
                    <p className="clear_keyboard" onClick={this.clear_keyboard}>
                       <img src="/src/common/img/close.svg" style={{width:22,height:22}}/>
                       <span>取消</span>
                    </p>
                   <Keyboard  cart={this.state.cart}  pay_price={this.state.sum} 
                   aId={this.state.address}/>
                 </div>
                
             )
         }
         else{
            keyboard=(
                <div></div>
            )
         }


         return(
             <div className='confirmOrder'>
                 <div className='confirmOrder_con'>
                    <Header title="确认订单" />
                    <div className='orderAddress'>
                       {
                          this.state.address.map((item)=>{
                              return(
                                <p onClick={this.goAddress.bind(this)} key={item.aId}>
                                 <span>收货人：</span>
                                 <span>{item.name}</span>&nbsp;&nbsp;
                                 <span>{item.phone}</span><br/>
                                 <span>{item.address}</span>
                                </p>
                              )
                          })
                       }
                         
                    </div>
                    <ul className='ordergoods'>
                            {
                              this.state.cart.map((item)=>{
                                 return(
                                    <li key={item.cartId}>
                                        <img src={URL+item.gPic}/>
                                        <p className="orderGCon">
                                          <span >{item.gName}</span><br/>
                                          <span style={{color:'#52A2EE'}}>规格:{item.checkAttr}</span><br/>
                                          <span className='gprice'>¥{item.gPrice}</span>
                                          <span className="num">X{item.num}</span>
                                        </p>
                                    </li>
                                 )  
                              })
                            }
                    </ul>

                   
                    <div className="orderFooter">
                       <ul>
                          <li className="sum">合计:<span style={{color:'red'}}>¥{this.state.sum}</span></li>
                          <li className="submitOrder" onClick={this.submitOrder}>提交订单</li>
                       </ul>
                    </div>
                    {allAddress}
                    {keyboard}
                 </div>
             </div>
         )
     }
}
export default Order;