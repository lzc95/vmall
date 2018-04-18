import React from 'react';
import {Icon} from 'antd';
import {withRouter} from 'react-router-dom';
import Search from '../components/Search'
import '../common/css/searchGoods.css';
import parseQuery from '../common/parseQuery';
import axios from 'axios';
import {REQUEST_URL,toFixed_2} from '../common/lib';



class searchGoods extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goodsList:[],
            active:'time',  //规则排序状态
            price:'',
            up:false,
            down:false
        }
        this.compare=this.compare.bind(this);
        this.timeSort=this.timeSort.bind(this);
        this.priceSort=this.priceSort.bind(this);
        this.saleSort=this.saleSort.bind(this);
    }
    //返回
    back(){
        this.props.history.goBack();
    }
    

    //跳转商品详情
    goDetail(arg){
        let url='/goodsDetail?gId='
        this.props.history.push(url+arg)
    }

    //活跃规则状态
    activeColor(arg){
        this.setState({
            active:arg,
            up:false,
            down:false
        })
    }

    //排序函数
    compare(property){
        return (obj1,obj2)=>{
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2;     // 升序
        }
    }

    //时间排序
    timeSort(){
        var arr=this.state.goodsList;
        var timeSort = arr.sort(this.compare('gTime')).reverse();
        this.setState({
            active:'time',
            up:false,
            down:false,
            goodsList:timeSort
        })

    }
    //价格升降序
    priceSort(){
        var arr=this.state.goodsList;
        this.setState({
            active:'price',
            up:true
        })
        if(this.state.up){
            var downPrice =arr.reverse()
            this.setState({
               up:false,
               down:true, 
               goodsList:downPrice
            })
        }
        else{
            var upPrice = arr.sort(this.compare('gPrice'));
            this.setState({
                up:true,
                down:false,
                goodsList:upPrice
             })
        }

    }

    //销量降序
    saleSort(){
        var arr=this.state.goodsList;
        var saleSort = arr.sort(this.compare('sale')).reverse();
        this.setState({
            active:'salesVolume',
            up:false,
            down:false,
            goodsList:saleSort
        })
    }

    componentWillMount(){
        var _this = this;
        var query=parseQuery(window.location.href);
         for(var prop in query){
             //查找二级子类目录下商品
             if(prop == 'scId'){
                axios.get(REQUEST_URL+'/getSubCategoryGoods',{
                    params:{
                        scId:query.scId
                    }
                  })
                .then(function(res){
                    _this.setState({
                       goodsList:res.data.goodsList
                    })
                  })
                .catch(function(err){
                      console.log(err);
                });
             }
             
             //关键字查找
             if(prop == 'key'){
                axios.get(encodeURI(REQUEST_URL+'/searchGoods'),{
                    params:{
                        key:query.key
                    }
                  })
                .then(function(res){
                    _this.setState({
                       goodsList:res.data.goodsList
                    })
                  })
                .catch(function(err){
                      console.log(err);
                  });
             }
         }
         
      }

    render(){
        const activeColor={color:'#3E90F7'};
        const color={};
        const URL=REQUEST_URL+'/upload/';
        const UpImg='/src/common/img/up_black.svg';
        const DownImg='/src/common/img/down_black.svg';
        const UpActiveImg='/src/common/img/up.svg';
        const DownActiveImg='/src/common/img/down.svg';

        return(
            <div className='searchGoods'>
                <div>
                    <span style={{fontSize:28,position:'fixed',
                    left:0,top:3,zIndex:100,color:'#ccc'}}
                    onClick={this.back.bind(this)}
                    ><img src='/src/common/img/left_s.svg'/></span>
                    <Search/>
                </div>
                <div>
                    <ul className='rules'>
                        <li style={this.state.active=='time'?activeColor:color}
                        onClick={this.timeSort}>时间</li>
                        <li style={this.state.active=='salesVolume'?activeColor:color}
                        onClick={this.saleSort}>销量</li>
                        <li style={this.state.active=='price'?activeColor:color}
                        onClick={this.priceSort}>
                            <span>价格</span>
                           <img src={this.state.up?UpActiveImg:UpImg} className="priceUp" ref='UpImg'/>
                           <img src={this.state.down?DownActiveImg:DownImg} className="priceDown" ref="DownImg"/>
                        </li>
                    </ul>
                </div>
                <div className='goodsList'>
                    <ul>
                        {
                            this.state.goodsList.map((item)=>{
                                return(
                                    <li key={item.gId} onClick={this.goDetail.bind(this,item.gId)}>
                                        <p className='goods_pic'><img src={URL+item.gPic}/></p>
                                        <p className='goods_descr'>
                                            <span>{item.gName}</span><br/>
                                            <span className="price">¥{toFixed_2(item.gPrice)}</span>
                                        
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

export default withRouter(searchGoods);
