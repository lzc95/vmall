import React from 'react';
import {AreaSelect,AreaCascader} from 'react-area-linkage';
import {Modal,Toast} from 'antd-mobile';
import  * as AreaData from '../data/data';
import Header from '../components/Header';

import '../common/css/main.css'
const alert = Modal.alert;

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class addAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uId:-1,
            address:'',
            addressList:[]
        }
    }

    handleSelectedChange(value){
        console.log(AreaData[value[0]],AreaData[value[1]],AreaData[value[2]])
        var addressCon=AreaData[value[0]]+AreaData[value[1]]+AreaData[value[2]]
        this.setState({
             address:addressCon
        })
    }
    
    addAddress(){
         var name=this.refs.name.value;
         var phone=this.refs.phone.value;
         var detaile=this.refs.detailedAddress.value;
         console.log(this.state.uId)
         axios.post(REQUEST_URL+'/address',{
             name:name,
             phone:phone,
             address:this.state.address+detaile
         }).then(function(res){
               if(res.data.code==1){
                  Toast.success('地址添加成功!!!', 2, null, false);
               }
         }).catch(function(){
             console.log(err)
         })

    }
    
   
   


    render(){
        return(
            <div className='address'>
              <div style={{marginTop:60}}>
                <Header title="添加收货地址"/>
                <p><label>收货人：</label><input type='text' className='userName' ref='name'/></p>
                <p><label>手机号码：</label><input type='text' ref='phone'/></p>
                <AreaSelect level={2} 
                   onChange={this.handleSelectedChange.bind(this)} 
                   size='md'
                   placeholders={['选择省','选择市','选择区']}
                />
                <input type='text' placeholder='详细地址到门牌号' className='detailedAddress' ref='detailedAddress'/>
                <button onClick={this.addAddress.bind(this)}>+添加地址</button>
                
              </div>
            </div>
            
        )
    }
}

export default addAddress;