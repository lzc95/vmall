import React from 'react';
import {withRouter} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../common/css/head.css'
class Header extends React.Component{
    back(){
        this.props.history.goBack() 
    }
    render(){
        return(
            <div>
                <div className='header'>
                {this.props.hiddenLeft == 'true' ?'':<span className='left' onClick={this.back.bind(this)}><Icon type='left' size='lg'/></span>}
                {this.props.title}</div>
            </div>
        )
    }
}

export default withRouter(Header);
