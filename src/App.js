import React, { Component } from 'react';
import { Layout, Menu, Row, Col, Card, Button, Tag, Input } from 'antd';
import { Link } from 'react-router-dom';
import  ListComponent  from './List'
import './App.css';
import Ad from './images/ad.jpg';
const fetch = require('node-fetch');
const { Header, Content, Footer } = Layout;
const Search = Input.Search;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      defaultKey: ['1'],
      loading: true,
    }
  }
  getList = (params)=>{
    fetch(`/topics?tab=${params || ''}`)
    .then(res => res.json())
    .then(json => this.setState({userData: json.data, loading: false}));
  }
  componentDidMount() {
    this.getList('all');
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
      default:
        break;
    }

    this.getList(params);
    // return params;
  }
  render() {
    const { userData, defaultKey, loading } = this.state;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={defaultKey}
            style={{ lineHeight: '64px' }}
            onClick={this.handleMenu}
          >
            <Menu.Item key="1">全部</Menu.Item>
            <Menu.Item key="2">精华</Menu.Item>
            <Menu.Item key="3">分享</Menu.Item>
            <Menu.Item key="4">问答</Menu.Item>
            {/*
              <Menu.Item key="1"><Link to='index/?tab=all'>全部</Link></Menu.Item>
              <Menu.Item key="2"><Link to='index/?tab=good'>精华</Link></Menu.Item>
              <Menu.Item key="3"><Link to='index/?tab=share'>分享</Link></Menu.Item>
              <Menu.Item key="4"><Link to='index/?tab=ask'>问答</Link></Menu.Item>
            */}

          </Menu>
            {/* <Search style={{width: '10%'}}/> */}
          
        </Header>
        <Content style={{width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
        <Row>
          <Col span={18}>
            <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
              <ListComponent loading={loading} data={userData && userData}/>
            </div>
          </Col>
          <Col span={5} offset={1}>
            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
            <Card
              title="CNode：Node.js专业中文社区"
            >
              <p>您可以 <Tag><Link to="/login">登录</Link></Tag>或 <Tag>注册</Tag> , 也可以</p>
              <Button type="primary">通过gitHub登录</Button>
            </Card>
            <Card style={{width: '100%'}}>
              <div>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src={Ad}/>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src={Ad}/>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src={Ad}/>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src={Ad}/>
              </div>
            </Card>
            </div>
          </Col>
        </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          cnode
        </Footer>
      </Layout>
    );
  }
}

export default App;
