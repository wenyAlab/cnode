import React, { Component } from 'react';
import { Layout, Spin, Tag, List, Avatar, Icon, Row, Col, Card } from 'antd';
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
        console.log(detailData)
        return (
            !loading ?
                <React.Fragment>
                    <Card
                    title="作者"
                    >
                    <Avatar src={detailData.avatar_url} /> { detailData.loginname}
                    <div>
                        <p>{`积分：${detailData.score}`}</p>
                    </div>
                    </Card>
                    <Card title="作者其他话题">
                    <List
                        itemLayout="horizontal"
                        dataSource={detailData.recent_topics}
                        loading={loading}
                        split
                        renderItem={item => (
                        <Link to={`/detail/${item.id}`}>
                            <List.Item
                            style={{overflow: 'hidden', textOverflow:'ellipsis',whiteSpace: 'nowrap'}}
                            >
                            <List.Item.Meta
                                title={item.title}
                                // style={{overflow: 'hidden', textOverflow:'ellipsis',whiteSpace: 'nowrap'}}
                            />
                            </List.Item>
                        </Link>
                        )}
                    />
                    </Card>
                </React.Fragment>
            : <Spin/>
        )
    }
}