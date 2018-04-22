//账户与安全
import React from 'react';
import Header from '../components/Header';
import { List, InputItem, WhiteSpace,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';

import '../common/css/account.css'
import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class AccountSecurity extends React.Component{
      constructor(props){
          super(props);
          this.state={
            isPassword:false
          }
          this.addPaypass=this.addPaypass.bind(this);
          this.updatePayPass=this.updatePayPass.bind(this);
      }
    
    //添加支付密码
     addPaypass(){
         var reg=/^\d{6}$/ ;

         var payPass=this.refs.payPass.state.value;
         var repayPass=this.refs.repayPass.state.value;
         if(!reg.test(payPass)){
            Toast.fail('密码输入不合法!!!',1, null, false);
            this.refs.payPass.state.value='';
            this.refs.repayPass.state.value='';
         }
         else if(payPass!=repayPass){
            Toast.fail('输入密码不一致!!!',1, null, false);
            this.refs.repayPass.state.value=''
         }
         else{
            axios.post(REQUEST_URL+'/addPayPass',{
                 payPass:payPass
            }).then(function(res){
                if(res.data.code==1){
                    Toast.success(res.data.msg,1, null, false);
                    _this.props.history.push('/account')
                }
                else{
                    Toast.fail(res.data.msg,1, null, false);
                }
                
            }).catch(function(err){
                console.log(err)
            })
         }
         
    }

    //修改支付密码
    updatePayPass(){
        var reg=/^\d{6}$/ ;
        var oldPayPass=this.refs.oldPayPass.state.value;
        var newPayPass=this.refs.newPayPass.state.value;

        var _this=this;
        if(!reg.test(newPayPass)){
            Toast.fail('密码输入不合法!!!',1, null, false);
            this.refs.newPayPass.state.value=''
        }
        else{
            
            axios.post(REQUEST_URL+'/updatePayPass',{
                oldPayPass:oldPayPass,
                newPayPass:newPayPass
            }).then(function(res){
                if(res.data.code==1){
                    Toast.fail(res.data.msg,1, null, false);
                    _this.props.history.push('/account')
                }
                else{
                    Toast.fail(res.data.msg,1, null, false);
                }
            }).catch(function(err){
                 console.log(err)
            })
        }
       
    }

    componentWillMount(){
        var _this=this;
        axios.get(REQUEST_URL+'/payPassStatus',{})
        .then(function(res){
            if(res.data.code=='yes'){
               _this.setState({
                   isPassword:true
               })
            }
        }).catch(function(err){
            console.log(err)
        })
    }


      render(){
        const { getFieldProps } = this.props.form;

        let con;
        if(this.state.isPassword){
            // 修改密码
            con=(
                <div>
                    <List >
                         <InputItem
                               
                                clear
                                placeholder="原支付密码"
                                type="password"
                                maxLength='6'
                                ref='oldPayPass'
                         >原支付密码</InputItem>
                         <InputItem
                               
                                clear
                                placeholder="新支付密码"
                                type="password"
                                ref='newPayPass'
                                maxLength='6'
                         >新支付密码</InputItem>
                     </List>
                     <div style={{ width: '70%', color: '#108ee9', textAlign: 'center',marginTop:20,marginLeft:'15%'}}>
                        <Button type="primary" size="small" onClick={this.updatePayPass}>下一步</Button>
                     </div>
                </div>
            )
        }
        else{
            // 添加密码
              con=(
                <div>
                    <List >
                        <InputItem
                                {...getFieldProps('oldPassword')}
                                clear
                                placeholder="请输入6位数字支付密码"
                                type="password"
                                maxLength='6'
                                ref='payPass'
                               
                        >密码</InputItem>
                        <InputItem
                                {...getFieldProps('newPassword')}
                                clear
                                placeholder="再输入一次支付密码"
                                type="password"
                                maxLength='6'
                                ref='repayPass'
                            
                        >确认密码</InputItem>
                    </List>
                    <div style={{ width: '70%', color: '#108ee9', textAlign: 'center',marginTop:20,marginLeft:'15%'}}>
                        <Button type="primary" size="small" onClick={this.addPaypass} >下一步</Button>
                    </div>
                </div>
              )
        }


          return(
              <div className="account">
                  <Header title="支付密码设置"/>
                  <div className="account_con">
                     {con} 
                  </div>
              </div>
          )
      }
}

const Account = createForm()(AccountSecurity);
export default Account;