import React from 'react';
import Header from '../components/Header';
import {withRouter} from 'react-router-dom';

import {Modal,Toast} from 'antd-mobile';
import axios from 'axios';
import {REQUEST_URL,toFixed_2} from '../common/lib';
const URL=REQUEST_URL+'/upload/';

//选中or未选中图标
const circle='/src/common/img/circle-o.svg'
const circle_ok='/src/common/img/circle_ok.svg'

import '../common/css/cart.css'

const alert = Modal.alert;

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cartState:false,
            modal:false,
            check:[],  //选中cartId
            checkCart:[],//存放选中的ID和价格
            cartList:[],
            total:0,
            price:0
        }
    }

   //跳转去购物 
    goShopping(){
        this.props.history.push("/kinds");
    }

    goDetail(arg){
        let url='/goodsDetail?gId='
        this.props.history.push(url+arg)
    }

   //删除购物车商品
   delCart(cartId){
        alert('删除提醒', '确认要删除该商品吗?', [
            { text: '我再想想', onPress: () =>{} },
            { text: '确认', onPress: () =>{
                var _this=this;
                axios.post(REQUEST_URL+'/delCart',{
                   cartId:cartId
                }).then(function(res){
                    if(res.data.code==1){
                        var arr=_this.state.cartList;
                        var arrCart=_this.state.checkCart;
                        var arrCheck=_this.state.check;
                        var total=_this.state.total;
                        var price=_this.state.price;
                        for(var i=0;i<arr.length;i++){
                            if(arr[i].cartId==cartId){
                                
                                arr.splice(i,1);
                                for(var j=0;j<arrCart.length;j++){
                                    if(cartId==arrCart[j].cartId){
                                        total-= arrCart[j].num;
                                        price-= (arrCart[j].num*arrCart[j].gPrice);
                                        arrCart.splice(j,1)
                                    }
                                }
                                for(var k=0;k<arrCheck.length;k++){
                                    if(cartId==arrCheck[k]){
                                        arrCheck.splice(k,1)
                                    }
                                }
                                _this.setState({
                                    cartList:arr,
                                    total:total,
                                    price:price,
                                    checkCart:arrCart,
                                    check:arrCheck
                                })
                            }
                        }
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }}]
        )      
   }

    //更新购物车商品
    updateCart(type,cartId,num){
       if(type=='reduce'&& num==0){
          Toast.fail('该宝贝不能减少了哟～!',1, null, false);
          return false;
       }
         
       var _this=this;
       axios.post(REQUEST_URL+'/updateCart',{
           cartId:cartId,
           num:num
       }).then(function(res){
           if(res.data.code==1){
               var arr = _this.state.cartList;
               var arrCart=_this.state.checkCart;
               var total=_this.state.total;
               var price=_this.state.price;
               for(var i=0;i<arr.length;i++){
                   if(arr[i].cartId==cartId){
                       arr[i].num=num;
                   }
               }
               
               for(var j=0;j<arrCart.length;j++){
                     if(arrCart[j].cartId==cartId){
                        if(type=='add'){
                            total+=1;
                            price+=Number(arrCart[j].gPrice);
                            arrCart[j].num+=1;
                        }
                        if(type=='reduce'){
                            total-=1;
                            price-=Number(arrCart[j].gPrice);
                            arrCart[j].num-=1;
                        }
                     }
               }

               
               _this.setState({
                   cartList:arr,
                   total:total,
                   price:price,
                   checkCart:arrCart
               })
           }
       }).catch(function(err){

       })
    }

    //选择商品
    check(arg){
        var arr=this.state.check;
        var arrCart=this.state.checkCart;
        var total=this.state.total;
        var price=this.state.price;
        var index=arr.indexOf(arg.cartId);
        if(index>-1){
            arr.splice(index,1);
           
            total-= arrCart[index].num;
            price-= (arrCart[index].num*arrCart[index].gPrice);
            arrCart.splice(index,1);
        }
        else{
            arr.push(arg.cartId);
            arrCart.push({
                cartId:arg.cartId,
                num:arg.num,
                gPrice:arg.gPrice
            })
           
            total+=arg.num;
            price+=(arg.num*arg.gPrice)
        
        }
        
        
        this.setState({
            check:arr,
            checkCart:arrCart,
            total:total,
            price:price
        })
        console.log(this.state.check)
    }

    //商品结算
    clearing(){
        if(this.state.check.length>0){
             this.props.history.push('/confirmOrder?cart='+this.state.check);
        }
        else{
            Toast.fail('请先选择要结算的商品!!!',1, null, false);
        }
    }

    componentWillMount(){
        var _this = this;
        axios.get(REQUEST_URL+'/getStatus')
        .then(function(res){
              if(res.data.uId !=-1 && !(typeof res.data.uId=='undefined')){
                   axios.get(REQUEST_URL+'/getCart',{

                   }).then(function(res){
                       if(res.data.cartList.length>0){
                            _this.setState({
                                cartList:res.data.cartList,
                                cartState:true
                            })
                       }
                       
                   }).catch(function(err){
                      console.log(err);
                   })
              }
             else{
                 _this.setState({
                     modal:true
                 })           
              }          
          })
          .catch(function(err){
              console.log(err);
          });
    }


    render(){
        let cartCon;
        if(this.state.cartState){
            cartCon=(
                <div>
                    <ul className="cartList">
                    {
                        this.state.cartList.map((item)=>{
                             return(
                              <li key={item.cartId} >
                                 <img src={this.state.check.indexOf(item.cartId)>-1?circle_ok:circle} className='circle'
                                 onClick={this.check.bind(this,item)}/>
                                 <img src={URL+item.gPic} className='gPic' 
                                  onClick={this.goDetail.bind(this,item.gId)}/>
                                 <p className="cartAttr" >
                                 <span>{item.gName}</span><br/>
                                 <span style={{color:'red',fontSize:17}}>¥{toFixed_2(item.gPrice)}</span><br/>
                                 <span className="num">
                                     <img src='/src/common/img/reduce.svg' 
                                     onClick={this.updateCart.bind(this,'reduce',item.cartId,(item.num)-1)}/>
                                     <input type='number' readOnly value={item.num}/>
                                     <img src='/src/common/img/add.svg'
                                     onClick={this.updateCart.bind(this,'add',item.cartId,(item.num)+1)}/>
                                 </span>
                                 </p>
                                 <img src="/src/common/img/del.svg" className="del" 
                                 onClick={this.delCart.bind(this,item.cartId)}/>
                              </li>
                             )
                        })
                    }
                    </ul>
                </div>
            )
        }
        else{
            cartCon=(
                <div className='empty_cart'>
                     <img src="/src/common/img/cart.svg"  />
                     <span>购物车空空如也，去逛逛吧</span> 
                     <p><button onClick={this.goShopping.bind(this)}>去购物...</button></p>   
                </div>
            )
        }

        return(
            <div className='cart'>
                <div style={{marginLeft:10}}>
                    <Header title="购物车" />
                    <div>
                    {cartCon} 
                    </div>
                </div>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    title="温馨提示"
                    footer={[{ text: '好的,这就去', onPress: () => {  this.props.history.push('/user');  } }]}
                    >
                    <div style={{ height: 80 }}>
                        小主人<br/>
                        购物车需要登录,请先去登录
                    </div>
                </Modal>
                <div className='footer'>
                        <ul>
                          <li className="total" >
                             <span>共{this.state.total}件&nbsp;金额:</span><br/>
                             <span style={{fontSize:18,color:'#52A2EE'}}>{toFixed_2(this.state.price)}</span><br/>
                             <span></span>
                          </li> 
                          <li className="goKinds" onClick={this.goShopping.bind(this)}>继续购物</li> 
                          <li className="clearing" onClick={this.clearing.bind(this)}>去结算</li>   
                        </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Cart);