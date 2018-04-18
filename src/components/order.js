import React from 'react';
import Header from '../components/Header'
import '../common/css/banner.css';

import { Tabs, WhiteSpace } from 'antd-mobile';
class Order extends React.Component{
    
    
     render(){
        const tabs = [
            { title: '全部' },
            { title: '待发货' },
            { title: '待收货' },
            { title: '待评价' },
          ];
      
         return(
             <div className='banner'>
                 <Header title="我的订单" />
                 <p style={{marginTop:50}}></p>
                 <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div >
                    Content of first tab
                </div>
                <div >
                    Content of second tab
                </div>
                <div >
                    Content of third tab
                </div>
                <div >
                    Content of 4 tab
                </div>
                </Tabs>
             </div>
         )
     }
}
export default Order;