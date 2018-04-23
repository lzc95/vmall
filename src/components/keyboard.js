import React from 'react';
import '../common/css/KeyBoard.css';
import axios from 'axios';
import {Toast} from 'antd-mobile';
import {REQUEST_URL} from '../common/lib';
import {withRouter} from 'react-router-dom';
class Keyboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            number:[1,2,3,4,5,6,7,8,9,'',0],
            show:[],
            password:[],
            cart:this.props.cart,
            pay_price:this.props.pay_price,
            aId:this.props.aId
        }
    }

    handleClick(num){
       var arr1=this.state.show;
       var arr2=this.state.password;
       var _this=this;
       if(num!=''){
        arr1.push('*');
        arr2.push(num);
       }

       if(arr2.length==6){
           axios.post(REQUEST_URL+'/checkPayPassword',{
               payPass:arr2
           }).then(function(res){
               if(res.data.code==1){
                       Toast.success(res.data.msg,1, null, false);
                      
                       axios.post(REQUEST_URL+'/submitOrder',{
                            cart:_this.state.cart,
                            pay_price:_this.state.pay_price,
                            aId:_this.state.aId
                        }).then(function(res){
                            setTimeout(function(){
                                _this.props.history.push('/order');
                            },1000)   
                        }).catch(function(err){
                            
                        })
               }
               else{
                    Toast.fail(res.data.msg,2, null, false);
                    _this.setState({
                        show:[],
                        password:[]
                    })
               }
           }).catch(function(err){
               console.log(err)
           })
       }
       this.setState({
           show:arr1,
           password:arr2
       })

    }

    del(){
        var arr1=this.state.show;
        var arr2=this.state.password;
        arr1.pop();
        arr2.pop();
        this.setState({
            show:arr1,
            password:arr2
        })
    }


    render(){
         return(
             <div className='mask_keyboard'>
                <div className='keyboard'>
                    <div>
                        <ul className='showNum'>
                            <li>{this.state.show[0]||''}</li>
                            <li>{this.state.show[1]||''}</li>
                            <li>{this.state.show[2]||''}</li>
                            <li>{this.state.show[3]||''}</li>
                            <li>{this.state.show[4]||''}</li>
                            <li>{this.state.show[5]||''}</li>
                        </ul>
                        <p style={{clear:'left'}}></p>
                        <ul className='keyNum'>
                            {
                            this.state.number.map((item,index)=>{
                                return(
                                    <li key={index} onClick={this.handleClick.bind(this,item)} >{item}</li>
                                )
                            })
                            }
                            <li onClick={this.del.bind(this)}><img src="/src/common/img/delNum.svg"/></li>

                        </ul>
                    </div>
                </div>
             </div>
         )
     }
}

export default withRouter(Keyboard);