import React, { Component } from 'react';
import { Layout, Spin, Avatar, Icon, Row, Col, Card } from 'antd';
import moment from 'moment';
import ListComponent from  '../components/List';
import AuthorSide from './AuthorSide';
const fetch = require('node-fetch');

const { Content } = Layout;
const cardStyle = {
    marginBottom: '20px',
}
const cardHeader = {
    backgroundColor: "#f6f6f6",
}

export default class UserPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            detailData: null,
            loading: true,
        }
    }
    componentDidMount() {
        const { match: {params} } = this.props;
        const { loginname } = params;
        this.getDetail(loginname);
    }
    componentWillUnmount() {
        this.setState({
            detailData: null,
        })
    }
    
    getDetail = (params)=>{
        fetch(`/user/${params}`)
        .then(res => res.json())
        .then(res => this.setState({detailData: res.data, loading: false}));    
      }
    render() {
      const {loading, detailData} = this.state;
        return (
            !loading ?
            <Layout>
                <Content style={{ width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
                    <Row>
                        <Col span={18}>
                        <Card title="主页" style={cardStyle} headStyle={cardHeader}>
                            <Avatar src={detailData.avatar_url} /> { detailData.loginname}
                            <div style={{marginTop: '20px'}}>
                                <p>{`积分：${detailData.score}`}</p>
                            </div>
                            <div>
                                <p>{`注册时间：${moment(detailData.create_at).fromNow()}`}</p>
                            </div>
                            <div>
                                <p><a href={`https://github.com/${detailData.githubUsername}`} target="_blank"><Icon type="github" /> { detailData.githubUsername}</a></p>
                            </div>
                        </Card>
                        <Card title="最近创建的话题" style={cardStyle} headStyle={cardHeader}>
                            <ListComponent loading={loading} data={detailData && detailData.recent_topics}/>
                        </Card>
                        <Card title="最近参与的话题" style={cardStyle} headStyle={cardHeader}>
                            <ListComponent loading={loading} data={detailData && detailData.recent_replies}/>                            
                        </Card>
                        </Col>
                        <Col span={5} offset={1}>
                            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                                <AuthorSide author={detailData && detailData.loginname} title="个人信息"/>
                            </div>
                        </Col>
                    </Row>

                </Content></Layout> : <Spin/>
        )
    }
}