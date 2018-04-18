import React from 'react';
import {AreaSelect,AreaCascader} from 'react-area-linkage';
import {Modal,Toast} from 'antd-mobile';
import  * as AreaData from '../data/data';
import Header from '../components/Header';

import '../common/css/main.css'
const alert = Modal.alert;

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class Address extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uId:-1,
            addressList:[]
        }
    }
    
    goaddAddress(){
        this.props.history.push('/addAddress')
    }
    
    cancelAddress(arg){ 
        alert('删除提醒', '确认要删除此地址么?', [
        { text: '取消', onPress: () =>{} },
        { text: '确认', onPress: () =>{
            var _this=this;
            axios.post(REQUEST_URL+'/cancelAddress',{
                aId:arg.aId
             }).then(function(res){
                  if(res.data.code==1){  
                    var arr=_this.state.addressList;
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].aId==arg.aId){
                           arr.splice(i,1);
                           _this.setState({
                            addressList:arr
                           })
                        }
                    }
                  }
             }).catch(function(err){
                 console.log(err)
             })
          }},
        ])
        
    }

    componentWillMount(){
        var _this=this;
        axios.get(REQUEST_URL+'/getStatus')
        .then(function(res){
            _this.setState({
                uId:res.data.uId      
            })
            axios.get(REQUEST_URL+'/address',{
               params:{
                  uId:_this.state.uId
            }})
            .then(function(res){
                _this.setState({
                    addressList:res.data.addressList    
                })
            }).catch(function(err){
                console.log(err)
            })
        }).catch(function(err){
            console.log(err)
        })
         
    }

    render(){
        return(
            <div className='address'>
              <div style={{marginTop:60}}>
              <Header title="收货地址管理"/>
              <ul className='addressList'>
                    {
                        this.state.addressList.map((item)=>{
                               return(
                                <li key={item.aId}> 
                                    <p>
                                       <span style={{display:'inline-block',width:'85%'}}>{item.name}&nbsp;{item.phone}<br/>
                                       {item.address}</span>
                                       <img src="/src/common/img/del.svg" style={{ width:35,height:41 }} 
                                        onClick={this.cancelAddress.bind(this,item)}/> 
                                     </p>
                                      
                                </li>
                               )
                        })
                       
                    }         
                </ul>
               <p  className='addAddress' >
                   <button onClick={this.goaddAddress.bind(this)}>添加收货地址</button>
               </p>
              </div>
            </div>
            
        )
    }
}

export default Address;