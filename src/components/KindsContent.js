import React from 'react';
import {withRouter} from 'react-router-dom';
import '../common/css/kindsContent.css';
import parseQuery from '../common/parseQuery';
import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

const URL=REQUEST_URL+'/upload/';

   class KindsContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            subCategory:[]
        }
    }

    //跳转
     goSearch(arg){
         let url='/searchGoods?scId='
         this.props.history.push(url+arg)
     }

    //首次加载
    componentWillMount(){
        var _this = this;
        var url = window.location.href;
        var cId=1;
        if(url.indexOf('?')>-1){
            var query=parseQuery(url);
            cId=query.cId
        }
        axios.get(REQUEST_URL+'/getSubCategory',{
            params:{
                cId:cId
            }
          })
          .then(function(res){
            _this.setState({
                subCategory:res.data.subCategory
            })
            console.log(res.data.subCategory)
          })
          .catch(function(err){
              console.log(err);
          });
          
    }
    
    
    componentWillReceiveProps(){
       var _this = this;
        var url = window.location.href;
        var cId=1;
        if(url.indexOf('?')>-1){
            var query=parseQuery(url);
            cId=query.cId
        }
        axios.get(REQUEST_URL+'/getSubCategory',{
            params:{
                cId:cId
            }
          })
          .then(function(res){
            _this.setState({
                subCategory:res.data.subCategory
            })
            console.log(res.data.subCategory)
          })
          .catch(function(err){
              console.log(err);
          });
     }

    render(){
          return(
            <div className="main" >
               <div>
                    <p className="title-logo">
                     <a href='#'><img src="/src/common/img/banner.jpg"/></a>
                    </p>
                    <ul>
                        {
                            this.state.subCategory.map((item)=>{
                                return(<li key={item.scId} onClick={this.goSearch.bind(this,item.scId)}>
                                    <img src={URL+item.subCategoryImg}/><br/>
                                    <span>{item.scName}</span>
                                </li>)
                            })
                        }  
                    </ul>
                </div>
            </div>
          )
    }
}

export default withRouter(KindsContent);