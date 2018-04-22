//账户与安全
import React from 'react';
import Header from '../components/Header';
import { List, InputItem, WhiteSpace,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class AccountSecurity extends React.Component{
      constructor(props){
          super(props);
          this.state={

          }
          this.changePass=this.changePass.bind(this)
      }

      changePass(){
          var oldPass=this.refs.oldPass.state.value;
          var newPass=this.refs.newPass.state.value;

          var _this=this;
          axios.post(REQUEST_URL+'/changePass',{
               oldPass:oldPass,
               newPass:newPass
          }).then(function(res){
              if(res.data.code==1){
                 Toast.success(res.data.msg,1, null, false);
                 _this.props.history.push('/account')
              }
              else{
                Toast.fail(res.data.msg,1, null, false);
              }
           
          }).catch(function(err){

          })
      }
     

      render(){
        const { getFieldProps } = this.props.form;
          return(
              <div className="account">
                  <div>
                     <Header title="账户密码设置"/>
                     <List className="account_con">
                         <InputItem
                                {...getFieldProps('oldPassword')}
                                clear
                                placeholder="原密码"
                                type="password"
                                ref='oldPass'
                         >原密码</InputItem>
                         <InputItem
                                {...getFieldProps('newPassword')}
                                clear
                                placeholder="密码"
                                type="password"
                                ref='newPass'
                         >新密码</InputItem>
                     </List>
                     <div style={{ width: '70%', color: '#108ee9', textAlign: 'center',marginTop:20,marginLeft:'15%'}}>
                            <Button type="primary" size="small" onClick={this.changePass}>下一步</Button>
                     </div>
                  </div>
              </div>
          )
      }
}

const Account = createForm()(AccountSecurity);
export default Account;