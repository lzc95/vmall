import React from 'react';
import '../common/css/searchCon.css';
import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class searchCon extends React.Component{
    constructor(props){
        super(props);

    }
    back(){
        this.props.history.goBack() 
    }
    
    search(){
        let url='/searchGoods?key=';
        let key=this.refs.key.value;
        this.props.history.push(url+key)
    }
    
    render(){
         return(
             <div className="searchCon">
                  <span style={{fontSize:28,position:'fixed',
                    left:0,top:3,zIndex:100,color:'#ccc'}}
                    onClick={this.back.bind(this)}
                    ><img src='/src/common/img/left_s.svg'/></span>
                  <div className='search'>
                      <input placeholder="搜索你要的商品" ref='key'/>
                      <button className="search_btn" onClick={this.search.bind(this)}>搜索</button>
                  </div>
             </div>
         )
    }
}

export default searchCon;