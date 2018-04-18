
import React from 'react';
import {withRouter} from 'react-router-dom';
import { TabBar } from 'antd-mobile';

// import Search from '../components/Search';
// import Kinds from '../components/kinds'; 
// import Home from '../views/Home'
// import Cart from '../views/Cart';
// import User from '../views/User';
import 'antd-mobile/dist/antd-mobile.css'; 
import '../common/css/main.css'

class TabBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'indexTab',
      hidden: false,
      fullScreen: true,
    };
  }
  
  componentWillMount(){
    let obj = {
      '/':'indexTab',
      '/kinds':'kindsTab',
      '/cart':'cartTab',
      '/user':'myTab'
    }
    var key = window.location.href.split('#')[1];
    key=key.substr(0,6)
    this.setState({
       selectedTab: obj[key],
    });
  }

  componentWillReceiveProps(){
    let obj = {
      '/':'indexTab',
      '/kinds':'kindsTab',
      '/cart':'cartTab',
      '/user':'myTab'
    }
    var key = window.location.href.split('#')[1];
    key=key.substr(0,6)
    this.setState({
       selectedTab: obj[key],
    });         
  }

  // renderContent(page) {
  //   return (
  //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
  //     {page}
  //     </div>
  //   );
  // }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : ''}
        style={{position:'fixed',zIndex:100,left:0,bottom:0,width:'100%'}}
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden} 
          >
          
          <TabBar.Item
            title="首页"
            key="index"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(/src/common/img/index.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(/src/common/img/index_1.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'indexTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'indexTab',
              });
              this.props.history.push("/");
            }}
            
          >
            {/* {this.renderContent(<Home/>)} */}
          </TabBar.Item>
        
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(/src/common/img/kinds.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(/src/common/img/kinds_1.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="分类"
            key="kinds"
            selected={this.state.selectedTab === 'kindsTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'kindsTab',
              });
              this.props.history.push("/kinds");
              
            }}
          >
            {/* {this.renderContent(<Kinds/>)} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(/src/common/img/cart.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(/src/common/img/cart_1.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="购物车"
            key="cart"
            selected={this.state.selectedTab === 'cartTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'cartTab',
              });
              this.props.history.push("/cart");
            }}
          >
            {/* {this.renderContent(<Cart/>)} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(/src/common/img/my.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(/src/common/img/my_1.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'myTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'myTab',
              });
              this.props.history.push("/user");
            }}
          >
            {/* {this.renderContent(<User/>)} */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default withRouter(TabBarMenu);
