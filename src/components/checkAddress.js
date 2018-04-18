import React from 'react';
import {AreaSelect,AreaCascader} from 'react-area-linkage';
import {Modal,Toast} from 'antd-mobile';
import Header from '../components/Header';
import parseQuery from '../common/parseQuery';

import '../common/css/checkAddress.css'
const alert = Modal.alert;

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class checkAddress extends React.Component{
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
            <div className='mask'>
              <div  className='allAddress'>
              <p className="operation">
                  <span className="cancel">取消</span> 
                  <span className="add">添加地址</span>
              </p>
              <ul className='allAddressCon'>
                    {
                        this.state.addressList.map((item)=>{
                               return(
                                <li key={item.aId}> 
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
}

export default checkAddress;