
// 收藏列表
import React from 'react';
import {WhiteSpace,Button,Modal} from 'antd-mobile';
import Header from '../components/Header';
import '../common/css/list.css';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

const URL=REQUEST_URL+'/upload/';
const alert = Modal.alert;

class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uId:-1,
            collectList:[],
        }
    }

    goDetail(arg){
        let url='/goodsDetail?gId='
        this.props.history.push(url+arg)
    }

    cancelCollect(arg){ 
        alert('删除提醒', '确认要删除此收藏物品么?', [
        { text: '我再想想', onPress: () =>{} },
        { text: '确认', onPress: () =>{
            var _this=this;
            axios.post(REQUEST_URL+'/collect',{
                act:'cancel',
                uId:this.state.uId,
                gId:arg.gId
             }).then(function(res){
                  if(res.data.code==1){  
                    var arr=_this.state.collectList;
                    console.log(arr)
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].collectId==arg.collectId){
                           arr.splice(i,1);
                           _this.setState({
                              collectList:arr
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
        var _this = this;
        axios.get(REQUEST_URL+'/getCollectGoods')
        .then(function(res){
              if(res.data.uId){
                 _this.setState({
                    uId:res.data.uId,
                    collectList:res.data.collectList
                 })
              }          
        }).catch(function(err){
              console.log(err);
        });
    }

     render(){
         return(
             <div className='collect'>
                <div className='collect_list'>
                    <Header title='我的收藏'/>
                    <div>
                        <ul>
                        {
                            this.state.collectList.map((item)=>{
                                return(
                                    <li key={item.collectId} >
                                        <span onClick={this.goDetail.bind(this,item.gId)}>
                                          <img src={URL+item.gPic}/>
                                          <span className='goodsCon'>{item.gName}</span>
                                        </span>
                                        <img src="/src/common/img/del.svg" style={{ width:35,height:41 }}  
                                        onClick={this.cancelCollect.bind(this,item)}/>
                                        <WhiteSpace/>
                                    </li>

                                )
                            })
                        }
                        </ul>
                        <p style={{color:'#3E90F7',textAlign:'center',marginTop:50}}>***^_^人家也是有底线的^_^***</p>
                    </div>
                </div>
             </div>

         )
     }
}
export default List;
