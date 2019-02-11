import React, { Component } from 'react';
import { Layout, Input, Row, Col, Card, Button, Tag, Avatar, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LayoutHeader, ListComponent } from './components'
import './App.less';
import { connect } from 'react-redux';
import { queryAllTab, clearList, userLogoutSuc } from './actions/actions'
import Ad from './images/ad.jpg';
import { InnerHeader } from './containers';
const { Content, Footer } = Layout;

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
  componentWillUnmount() {
    this.props.clearList();
  }
  render() {
    const { loading, list, authLogin, userData } = this.props;
    const pagination = {
      // pageNumber: 40,
      pageSize:40,
    }
    return (
      <Layout className="layout">
        <LayoutHeader/>
        <Content>
        <Row>
          <Col span={18}>
            <InnerHeader defaultKey={this.state.defaultKey}/>
            <div className="list_wrap">
              <ListComponent loading={loading} data={list && list} pagination={pagination}/>
            </div>
          </Col>
          <Col span={5} offset={1}>
            <div className="sider_wrap">
            {
              !authLogin ?
                <Card
                  title="CNode：Node.js专业中文社区"
                  headStyle={cardHeader}
                >
                  <div>您可以 <Tag><Link to="/login">登录</Link></Tag>或 <Tag>注册</Tag> , 也可以</div>
                  <Button type="primary" style={{backgroundColor: '#5bc0de', border:'#5bc0de'}}>通过gitHub登录</Button>
                </Card> :
                <Card
                  title="个人信息"
                  headStyle={cardHeader}
                >
                  <Link to={`/user/${userData.loginname}`}>
                    <Avatar src={userData.avatar_url} />
                    <span style={{color: '#778087'}}>{ userData.loginname}</span>
                  </Link>
                  <div style={{marginTop: '10px'}}>
                      <p>{`积分：0`}</p>
                  </div>
                  <div>
                      <p>"这家伙很懒，什么个性签名都没有留下"</p>
                  </div>
                  <Button onClick={() => this.props.signOut(this.props.history)}>退出</Button>
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
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src='https://static.cnodejs.org/Fv9R31Y6ySKKJi95ldk9TRkJ7o5O'/>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src='https://static.cnodejs.org/Fssu56hfLTZbS0QWUrTq_Cj_tpmO'/>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src='https://static.cnodejs.org/Fl_LDJY2VdTy0g060A8jm75dnufL'/>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src='https://static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_'/>
              </div>
            </Card>
            <Card style={{width: '100%'}} title="友情链接">
              <div>
                <img width="150px" style={{marginBottom: '8px'}} alt='链接1' src='https://static2.cnodejs.org/public/images/ruby-china-20150529.png'/>
                <img width="150px" style={{marginBottom: '8px'}} alt='链接2' src='https://static2.cnodejs.org/public/images/golangtc-logo.png'/>
                <img width="150px" style={{marginBottom: '8px'}} alt='链接3' src='https://static2.cnodejs.org/public/images/phphub-logo.png'/>
                <img width="150px" style={{marginBottom: '8px'}} alt='链接4' src='https://static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK'/>
              </div>
            </Card>
            <Card style={{width: '100%'}} title="客户端二维码">
              <div>
                <img width="100%" style={{marginBottom: '8px'}} alt='二维码' src='https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU'/>
              </div>
            </Card>
            </div>
          </Col>
        </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。
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
  signOut(history){
    dispatch(userLogoutSuc(history))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
