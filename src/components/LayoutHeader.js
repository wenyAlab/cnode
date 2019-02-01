import React from 'react';
import {withRouter}  from 'react-router-dom'
import { Layout, Menu, Input } from 'antd';
import './LayoutHeader.less';

const { Header } = Layout;

class LayoutHeader extends React.Component {
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
      default:
        break;
    }

  }

  render() {
    console.log(this.props)
    return (
      <Header>
        <div className="cnode_header_wrap">
          <span className="logo">
            <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="logo"/>
          </span>
          <span className="search">
            <Input.Search />
          </span>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={this.props.defaultKey}
            onClick={this.handleMenu}
          >
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">未读消息</Menu.Item>
            <Menu.Item key="3">新手入门</Menu.Item>
            <Menu.Item key="4">API</Menu.Item>
            <Menu.Item key="5">关于</Menu.Item>
            <Menu.Item key="6">设置</Menu.Item>
            <Menu.Item key="7">退出</Menu.Item>
          </Menu>
        </div>
      </Header>
    )
  }
}

export default withRouter(LayoutHeader);