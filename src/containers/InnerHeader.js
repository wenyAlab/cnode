import React from 'react';
import { Menu } from 'antd';
import { queryAllTab } from '../actions/actions'
import { connect} from 'react-redux';


class InnerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKey: ['1'],
    }
  }
  componentDidMount() {
    this.props.fetchAllTab('all');
  }

  handleMenu = ({key}) =>{
    this.setState({
      loading: true,
    })
    let params;
    switch (key) {
      case '1':
        params = 'all';
        break;
      case '2':
        params = 'good';
        break;
      case '3':
        params = 'share';
        break;
      case '4':
        params = 'ask';
        break;
      case '5':
        params = 'dev';
        break;
      default:
        break;
    }

    this.props.fetchAllTab(params);
  }
  render() {
    return (
      <div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={this.props.defaultKey}
          style={{ height: '40px', lineHeight: '40px', backgroundColor: '#f6f6f6' }}
          onClick={this.handleMenu}
        >
          <Menu.Item key="1">全部</Menu.Item>
          <Menu.Item key="2">精华</Menu.Item>
          <Menu.Item key="3">分享</Menu.Item>
          <Menu.Item key="4">问答</Menu.Item>
          <Menu.Item key="5">客户端测试</Menu.Item>
        </Menu>
      </div>
    )
  }
}
const mapStateToProps = () => ({

})
const mapDispatchToProps = (dispatch) => ({
  fetchAllTab(params){
    dispatch(queryAllTab(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InnerHeader);