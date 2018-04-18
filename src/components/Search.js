import React from 'react';
import {withRouter} from 'react-router-dom';
import '../common/css/main.css'
class Search extends React.Component {
    constructor(props){
        super(props);
    }

    jumpSearchCon(){
        this.props.history.push('/searchCon')
    }

  render() {
    return (
    <div>
         <div className='search'>
            <input placeholder="搜索你要的商品" onFocus={this.jumpSearchCon.bind(this)}/>
         </div>
    </div>);
  }
}
 export default withRouter(Search);
