import React, { Component } from 'react';
import { Layout, Spin, Tag, List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
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
        // const { match: {params} } = this.props;
        // const { id } = params;
        const { author } = this.props;
        this.getDetail(author);
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
                <Content style={{background: '#fff', width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
                    <h2 style={{ padding: 24, fontWeight:'bold', boxSizing: 'border-box', margin: '0 auto' }}>{detailData.top ? <Tag color="#87d068">置顶</Tag> : null}{detailData.title}</h2>
                    <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto' }}>
                        作者：<Tag >{detailData.author.loginname}</Tag> |
                        发布时间：<Tag >{detailData.create_at} </Tag> |
                        浏览次数：<Tag> {detailData.visit_count}</Tag> |
                        来自：<Tag  > {detailData.tab}</Tag>
                    </div>
                <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto' }}>
                    {detailData.content}
                </div>
                <p style={{ margin: '16px 0', padding: '20px 24px', backgroundColor: '#f0f2f5' }}>
                    {`${detailData.replies.length} 回复`}
                </p>
                <List
                    itemLayout="horizontal"
                    dataSource={detailData.replies}
                    loading={loading}
                    style={{padding: '0px 24px 10px 24px '}}
                    split
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
                </Content></Layout> : <Spin/>
        )
    }
}