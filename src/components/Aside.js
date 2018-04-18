import React from 'react';
import '../common/css/aside.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import parseQuery from '../common/parseQuery';
import {REQUEST_URL} from '../common/lib';

class Aside extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            items:[],
            activeId:-1
        }
    }
    componentWillMount(){
        var _this=this;
        var url = window.location.href;
        if(url.indexOf('?')>-1){
            var query=parseQuery(url);
            this.setState({
                activeId:query.cId
            })
        }
        else{
            this.setState({
                activeId:1
            })
        }

        axios.get(REQUEST_URL+'/getCategory',{
           
          })
          .then(function(res){
            _this.setState({
                items:res.data.sortData
            })
            console.log(res.data.sortData);
          })
          .catch(function(err){
              console.log(err);
          });
          
    }
    
    componentWillReceiveProps(){
        var url = window.location.href;
        if(url.indexOf('?')>-1){
            var query=parseQuery(url);
            this.setState({
                activeId:query.cId
            })
        }
        
    }

    render(){
        const activeBg={
            color:'#33A3F4',
            background:'#F3F6F9'
        }
        const defaultBg={}

        return(
            <div className="aside">
              <div>
                <ul>
                    {
                    this.state.items.map((item)=>{
                        return(
                         <Link to={{pathname:'/kinds',search:'?cId='+item.cId }} key={item.cId} >
                           <li style={(this.state.activeId==item.cId)?activeBg:defaultBg}>{item.cName} </li>
                         </Link>
                       )
                    })
                    }
                </ul>
              </div>
            </div>
        )
    }
}

export default Aside;
