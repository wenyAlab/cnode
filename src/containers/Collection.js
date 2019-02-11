import React, { Component } from 'react';
import { Layout, Row, Col, Card, Button, Tag, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import  { ListComponent }  from '../components'
// import './App.css';
import { connect } from 'react-redux';
import { userLogoutSuc } from '../actions/actions'
import Ad from '../images/ad.jpg';
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
  }
  componentWillUnmount() {
  }
  render() {
    const { collectionList, authLogin, userData } = this.props;
    return (
      <Layout className="layout">
        <Content style={{width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
        <Row>
          <Col span={18}>
            <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
              <ListComponent loading={false} data={collectionList && collectionList} pagination/>
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
                    <Avatar style={{marginRight:'10px'}} src={userData.avatar_url} />
                    <span style={{color: '#778087'}}>{ userData.loginname}</span>
                  </Link>
                  <div style={{marginTop: '10px'}}>
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
            <Card style={{width: '100%'}} title="客户端二维码">
              <div>
                <img width="100%" style={{marginBottom: '8px'}} alt='广告' src='https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU'/>
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
  authLogin: state.authLogin,
  collectionList: state.collectionList,
  userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  signOut(){
    dispatch(userLogoutSuc())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
