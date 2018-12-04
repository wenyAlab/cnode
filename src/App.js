import React, { Component } from 'react';
import { Layout, Menu, Row, Col, Card, Button, Tag, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import  ListComponent  from './components/List'
import './App.css';
import { connect } from 'react-redux';
import { queryAllTab, clearList, userLogoutSuc } from './actions/actions'
import Ad from './images/ad.jpg';
const { Header, Content, Footer } = Layout;

const cardHeader = {
  backgroundColor: "#f6f6f6",
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      defaultKey: ['1'],
    }
  }
  componentDidMount() {
    this.props.fetchAllTab('all');
  }
  componentWillUnmount() {
    this.props.clearList();
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
    const { defaultKey } = this.state;
    const { loading, list, authLogin, userData } = this.props;
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
            <Menu.Item key="5">客户端测试</Menu.Item>
          </Menu>
          
        </Header>
        <Content style={{width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
        <Row>
          <Col span={18}>
            <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
              <ListComponent loading={loading} data={list && list} pagination/>
            </div>
          </Col>
          <Col span={5} offset={1}>
            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
            {
              !authLogin ?
                <Card
                  title="CNode：Node.js专业中文社区"
                  headStyle={cardHeader}
                >
                  <p>您可以 <Tag><Link to="/login">登录</Link></Tag>或 <Tag>注册</Tag> , 也可以</p>
                  <Button type="primary">通过gitHub登录</Button>
                </Card> :
                <Card
                  title="个人信息"
                  headStyle={cardHeader}
                >
                  <Link to={`/user/${userData.loginname}`}>
                    <Avatar src={userData.avatar_url} />
                    { userData.loginname}
                  </Link>
                  <div>
                      <p>{`积分：0`}</p>
                  </div>
                  <div>
                      <p>"这家伙很懒，什么个性签名都没有留下"</p>
                  </div>
                  <Button onClick={this.props.signOut}>退出</Button>
                </Card>
            }
            {
              authLogin &&
              <Card
                headStyle={cardHeader}
              >
                <Button type="primary"><Link to="/create">发布话题</Link></Button>
              </Card>
            }
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

const mapStateToProps = (state) => ({
  list: state.list,
  loading: state.tabLoading,
  authLogin: state.authLogin,
  userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  fetchAllTab(params){
    dispatch(queryAllTab(params))
  },
  clearList(){
    dispatch(clearList())
  },
  signOut(){
    dispatch(userLogoutSuc())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
