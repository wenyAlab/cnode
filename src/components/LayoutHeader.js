import React from 'react';
import {withRouter}  from 'react-router-dom'
import { connect} from 'react-redux';
import { userLogoutSuc } from '../actions/actions'

import { Layout, Menu, Input } from 'antd';
import './LayoutHeader.less';

const { Header } = Layout;

class LayoutHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      defaultKey: ['1'],
    }
  }
  handleMenu = ({key}) =>{
    switch (key) {
      case '1':
        this.props.history.push('/');
        break;
      case '2':
        this.props.history.push('/');
        break;
      case '3':
        this.props.history.push('/');
        break;
      case '4':
        this.props.history.push('/');
        break;
      case '5':
        this.props.history.push('/');
        break;
      case '6':
        this.props.history.push('/');
        break;
      case '7':
        this.props.history.push('/');
        break;
      case '8':
        this.props.history.push('/');
        break;
      case '9':
        this.props.history.push('/login');
        break;
      default:
        break;
    }

  }

  render() {
    return (
      <Header className="cnode_header">
        <div className="cnode_header_wrap">
          <span className="logo">
            <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="logo"/>
          </span>
          <span className="search">
            <Input.Search />
          </span>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={this.state.defaultKey}
            onClick={this.handleMenu}
          >
            <Menu.Item key="1">首页</Menu.Item>
            {
              this.props.authLogin &&
                <Menu.Item key="2">未读消息</Menu.Item>
            }
            <Menu.Item key="3">新手入门</Menu.Item>
            <Menu.Item key="4">API</Menu.Item>
            <Menu.Item key="5">关于</Menu.Item>
            {
              this.props.authLogin &&
                <Menu.Item key="6">设置</Menu.Item>
            }
            {
              this.props.authLogin &&
                <Menu.Item key="7">退出</Menu.Item>
            }
            {
              !this.props.authLogin &&
              <Menu.Item key="8">注册</Menu.Item>
            }
            {
              !this.props.authLogin &&
              <Menu.Item key="9">登录</Menu.Item>
            }
          </Menu>
        </div>
      </Header>
    )
  }
}

const mapStateToProps = (state) => ({
  authLogin: state.authLogin,
})
const mapDispatchToProps = (dispatch) => ({
   signOut(history){
    dispatch(userLogoutSuc(history))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutHeader));