import React, { Component } from 'react';
import { Layout, Spin, Tag, List, Avatar, Icon, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import MarkDown from  'react-markdown';
import AuthorSide from './AuthorSide';
const fetch = require('node-fetch');

const { Content } = Layout;

export default class ListComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            detailData: null,
            loading: true,
        }
    }
    componentDidMount() {
        const { match: {params} } = this.props;
        const { id } = params;
        this.getDetail(id);
    }
    componentWillUnmount() {
        this.setState({
            detailData: null,
        })
    }
    
    getDetail = (params)=>{
        fetch(`/topic/${params}?mdrender=false`)
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
                        <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            <h2 style={{ padding: 24, fontWeight:'bold', boxSizing: 'border-box', margin: '0 auto' }}>{detailData.top ? <Tag color="#87d068">置顶</Tag> : null}{detailData.title}</h2>
                            <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto' }}>
                                作者：<Tag >{detailData.author.loginname}</Tag> |
                                发布时间：<Tag >{detailData.create_at} </Tag> |
                                浏览次数：<Tag> {detailData.visit_count}</Tag> |
                                来自：<Tag  > {detailData.tab}</Tag>
                            </div>
                            {/* <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto' }}> */}
                                <MarkDown source={detailData.content} />
                            {/* </div> */}
                            <p style={{ margin: '16px 0', padding: '20px 24px', backgroundColor: '#f4fcf0' }}>
                                {`${detailData.replies.length} 回复`}
                            </p>
                            <List
                                itemLayout="horizontal"
                                dataSource={detailData.replies}
                                loading={loading}
                                style={{padding: '0px 24px 10px 24px '}}
                                split
                                locale={{emptyText: '暂无评论'}}
                                renderItem={item => (
                                <Link to={`/detail/${item.id}`}>
                                    <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.author.avatar_url} />}
                                        title={`${item.author.loginname}${item.create_at}`}
                                        // title={`${item.reply_count}/${item.visit_count}${item.top ? this.renderTag('置顶') : ''}${item.title}`}
                                        description={item.content}
                                    />
                                    {/*
                                        <div><Icon type="like" theme="filled" />{item.ups.length}</div>
                                    
                                    */}
                                    <div><Icon type="like" />{item.ups.length}</div>
                                    </List.Item>
                                </Link>
                                )}
                            />
                        </div>
                        </Col>
                        <Col span={5} offset={1}>
                            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            <AuthorSide author={detailData.author.loginname} title="作者"/>
                            </div>
                        </Col>
                    </Row>

                </Content></Layout> : <Spin/>
        )
    }
}