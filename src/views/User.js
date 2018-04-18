import React from 'react';
import {WhiteSpace,Modal} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/Login';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';
import '../common/css/user.css';


const alert = Modal.alert;

class User extends React.Component{  
    constructor(props){
        super(props);
        this.state={
            nickName:'',
            isLogin:false,
            uId:'',
        }
        this.logout=this.logout.bind(this)
    }

    Go(des){
        this.props.history.push(des)
    }

    // 登录退出
    logout(){ 
        alert('退出提醒', '确认要退出登录?', [
            { text: '我再想想', onPress: () =>{} },
            { text: '狠心离开', onPress: () =>{
                var _this = this;
                axios.get(REQUEST_URL+'/logout')
                .then(function(res){
                      if(res.data.code){
                         _this.setState({
                            isLogin:false,
                         })
                      }          
                  })
                .catch(function(err){
                      console.log(err);
                });   
            }},
        ])   
    }

    componentWillMount(){    
        var _this = this;
        axios.get(REQUEST_URL+'/getStatus')
        .then(function(res){
              if(res.data.uId!=-1 && !(typeof res.data.uId=='undefined')){
                 _this.setState({
                    isLogin:true,
                    nickName:res.data.nickName
                 })   
              }  
              console.log(res.data.uId)        
          })
          .catch(function(err){
              console.log(err);
          });
    }

    componentWillReceiveProps(){
        var _this = this;
        axios.get(REQUEST_URL+'/getStatus',{

        })
        .then(function(res){
              if(res.data.uId!=-1 && !(typeof res.data.uId=='undefined')){
                 _this.setState({
                    isLogin:true,
                    nickName:res.data.nickName
                 })
                 console.log(res.data.uId)
              }          
          })
          .catch(function(err){
              console.log(err);
          });
          
    }

    render(){
        let user;
        if(this.state.isLogin){
           user=(
                <ul>
                    <li className='user_pho'>
                       <img src="/src/common/img/user.svg"/>
                       <span>{this.state.nickName}</span>
                    </li>
                    <WhiteSpace />
                    <li onClick={this.Go.bind(this,'/order')}><img src="/src/common/img/order.svg"/>我的订单</li>
                    <li onClick={this.Go.bind(this,'/collect')}><img src="/src/common/img/collect.svg"/>我的收藏</li>
                    <li onClick={this.Go.bind(this,'/addressManage')}><img src="/src/common/img/address.svg"/>收货地址</li>
                    <li onClick={this.Go.bind(this,'/account')}><img src="/src/common/img/security.svg"/>账户与安全</li>
                    <WhiteSpace />
                    <li className='user_exit'><button onClick={this.logout}>退出登录</button></li>
                </ul>
                
            )
          }
          else{
              user=(
                 <div>
                    <LoginForm />
                 </div>
              )
          }
          
        return(
            <div className='user_info'>
                <Header title="个人中心" hiddenLeft='true'/>
                <div style={{marginTop:70}}>
                   {user}
                </div>
            </div>
        )
    }
}

export default withRouter(User);