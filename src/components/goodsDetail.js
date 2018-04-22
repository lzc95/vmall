import React from 'react';
import {Toast} from 'antd-mobile';

import {withRouter} from 'react-router-dom';
import '../common/css/goodsDetail.css';

import parseQuery from '../common/parseQuery';
import axios from 'axios';
import {REQUEST_URL,toFixed_2} from '../common/lib';

const URL=REQUEST_URL+'/upload/';
const nocollect='/src/common/img/noCollect.svg';
const collected='/src/common/img/collected.svg';

class goodsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uId:-1,
            isCollect:false,
            goods:[],
            checkAttr:'',

        }
        this.isCollect=this.isCollect.bind(this)
    }

    go(des){
        this.props.history.push(des)
    }
    back(){
        this.props.history.goBack() 
    }

    checkAttr(attr){
       this.setState({
          checkAttr:attr,
       })
    }

    // 收藏
    isCollect(){
        console.log(this.state.isCollect)
        if(this.state.uId!=-1){
            var _this = this;
            var query=parseQuery(window.location.href);
            if(this.state.isCollect){
                //取消收藏
                axios.post(REQUEST_URL+'/collect',{
                act:'cancel',
                uId:_this.state.uId,
                gId:query.gId
                }).then(function(res){
                    if(res.data.code==1){
                        _this.setState({
                            isCollect:false
                        })
                    }  
                }).catch(function(err){
                    console.log(err)
                })

            }
            else{
                // 添加收藏   
                axios.post(REQUEST_URL+'/collect',{
                    act:'join',
                    uId:_this.state.uId,
                    gId:query.gId
                }).then(function(res){
                    if(res.data.code==1){
                        _this.setState({
                            isCollect:true
                        })
                    }  
                }).catch(function(err){
                    console.log(err)
                })
            }
        }
        else{
            Toast.fail('登录后才可以收藏!!!',1, null, false);
        }
        
    }

    componentWillMount(){
        var _this = this;
        var query=parseQuery(window.location.href);
        //商品详情
        axios.get(REQUEST_URL+'/getGoodsDetail',{
             params:{
                 gId:query.gId
             }
           })
           .then(function(res){
             _this.setState({
                goods:res.data.goods
             })
           })
           .catch(function(err){
               console.log(err);
           });
        
        //请求状态
        axios.get(REQUEST_URL+'/getStatus')
        .then(function(res){
            if(res.data.uId){
                _this.setState({
                    uId:res.data.uId,
                })

                axios.post(REQUEST_URL+'/collect',{
                    act:'query',
                    uId:_this.state.uId,
                    gId:query.gId
                }).then(function(res){
                    if(res.data.code==1){
                        _this.setState({
                            isCollect:true
                        })
                    }
                    else{
                        _this.setState({
                            isCollect:false
                        })
                    }  
                }).catch(function(err){
                    console.log(err)
                })
            }          
        }).catch(function(err){
            console.log(err);
        });
    }
   
    componentWillUpdate(){
        console.log(this.state.isCollect)
        if(this.state.isCollect){
            this.refs.collectImg=collected
        }
        else{
            this.refs.collectImg=nocollect
        }
    }

     //加入购物车
     addCart(){
        if(this.state.uId!=-1){
            if(this.state.checkAttr){
                var _this=this;
                var query=parseQuery(window.location.href);
                axios.post(REQUEST_URL+'/addCart',{
                    uId:this.state.uId,
                    gId:query.gId,
                    attr:this.state.checkAttr
                }).then(function(res){
                    
                }).catch(function(err){
                    console.log(err)
                })
            }
            else{
                Toast.fail('请选择商品规格!!!',1, null, false);
            }
            
        }
        else{
            Toast.fail('登录后才可以加入购物车!!!',1, null, false);
        }
     }

    
    

    render(){
        //未选择商品规格
        const noCheck={
            border:'1px dashed #ccc',
            color:'#000'

        }
        //选中商品规格
        const check={
            border:'1px solis #3E90F7',
            background:'#3E90F7',
            color:'#fff'
        }
        return(
            <div className='goodsDetail'>
                <div>
                    <span className='left' onClick={this.back.bind(this)}><img src="/src/common/img/left.svg"/></span>
                    <img className="collectImg" src={this.state.isCollect?collected:nocollect} onClick={this.isCollect} ref='collectImg'/>
                    <div>
                        {  this.state.goods.map((item)=>{
                             return(
                                 <div key={item.gId}>
                                     <img src={URL+item.gPic} className='goodsPho'/>
                                     <div className='goodsDetail_con'>
                                        <p>{item.gName}</p>
                                        <p style={{marginTop:10,color:'#3E90F7'}}>规格选项:</p>
                                        <ul  className='gAttr'>{
                                             item.attr.split('#').map((key)=>{
                                                return(
                                                    <li key={key} style={this.state.checkAttr==key?check:noCheck}
                                                    onClick={this.checkAttr.bind(this,key)}>{key}</li>
                                                )
                                             })
                                            }
                                        </ul>
                                        <p><span className="price">¥{toFixed_2(item.gPrice)}</span></p>
                                    
                                     </div>
                                 </div>
                             )
                        })
                            
                        }
                       
                    </div>
                    
                    <div className='footer'>
                        <ul>
                          <li className="goHome" onClick={this.go.bind(this,'/')}><img src='/src/common/img/home.svg'/></li> 
                          <li className="goCart" onClick={this.go.bind(this,'/cart')}><img src='/src/common/img/cart_1.svg'/></li> 
                          <li className="addCart" onClick={this.addCart.bind(this)}>加入购物车</li>   
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(goodsDetail);