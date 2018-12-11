import React, { Component } from 'react';
import { Layout, Spin, Tag, List, Avatar, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import MarkDown from  'react-markdown';
import AuthorSide from './AuthorSide';
import Command from './Command';
import { connect } from 'react-redux';
import { queryDetailById, clearDetail, saveTopics, cancelSaveTopics, likeCommand} from '../actions/actions';

const { Content } = Layout;

const Image = (props) => {
    return <img {...props} style={{maxWidth: '100%'}} alt="img" />
}

class Detail extends Component{
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
        this.props.fetchDetailDispatch(id);
    }
    componentWillUnmount() {
        this.props.clearDetail();
    }
    saveTopics = () => {
        const { detail, saved } = this.props;
        const { id } = detail;
        const payload = {
            accesstoken: '90fabfa0-692c-40ad-bb3b-83b44c9cf4d7',
            topic_id: id,
        }
        if (!saved) {
            this.props.saveTopicsDispatch(payload);
        } else {
            this.props.cancelSaveDispatch(payload);
        }
    }
    edit = () => {
        const { detail } = this.props;
        this.props.history.push({pathname: '/create', state: {
            title: detail && detail.title,
            content: detail && detail.content,
            id: detail && detail.id,
        }})
    }
    delete = () => {
        alert('delete')
    }
    like =() => {
        const payload = {
            accesstoken: '90fabfa0-692c-40ad-bb3b-83b44c9cf4d7',
        }
        this.props.likeCommandFn(payload);
    }
    render() {
      const { detail, loading, saved, liked, authLogin} = this.props;
        return (
            !loading  ?
            <Layout>
                <Content style={{ width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
                    <Row>
                        <Col span={18}>
                        <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            <h2 style={{ padding: 24, fontWeight:'bold', boxSizing: 'border-box', margin: '0 auto' }}>{detail && detail.top ? <Tag color="#87d068">置顶</Tag> : null}{detail && detail.title}</h2>
                            <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto', display: 'flex', }}>
                                作者：<Tag style={{flex: 1}} >{detail && detail.author.loginname}</Tag> |
                                发布时间：<Tag style={{flex: 1}} >{detail && detail.create_at} </Tag> |
                                浏览次数：<Tag style={{flex: 1}}> {detail && detail.visit_count}</Tag> |
                                来自：<Tag style={{flex: 1}} > {detail && detail.tab}</Tag>
                                <Tag 
                                    onClick={this.saveTopics} 
                                    color={saved ? '#ccc' : '#87d068'}
                                    style={{marginLeft: '300px', flex: 1, height: '30px', lineHeight: '30px', textAlign: 'center', fontSize: '14px'}}
                                >
                                 {saved ? '取消收藏' : '收藏'}
                                </Tag>
                            </div>
                            {
                                detail.author_id === '5bfcea46be1b120abac5d4b9' &&
                                <div style={{ padding: '0px 24px' }}>
                                <Icon type="form" style={{marginRight: '16px'}} onClick={this.edit} /><Icon type="delete" onClick={this.delete} />
                                </div>
                            }
                            <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto' }}>
                                <MarkDown source={detail && detail.content} renderers={{image: Image}} />
                            </div>
                            <p style={{ margin: '16px 0', padding: '20px 24px', backgroundColor: '#f4fcf0' }}>
                                {`${detail && detail.replies.length} 回复`}
                            </p>
                            <List
                                itemLayout="horizontal"
                                dataSource={detail && detail.replies}
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
                                        description={item.content}
                                    />
                                    <div><Icon type='like' theme={!liked ? '' : 'filled'} onClick={this.like} />{item.ups.length}</div>
                                    </List.Item>
                                </Link>
                                )}
                            />
                            {/*
                                <ReplyList detail={detail} loading={loading}/>
                            */}
                            {
                                authLogin &&
                                <Command detail={detail}/>
                            }
                        </div>
                        </Col>
                        <Col span={5} offset={1}>
                            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            <AuthorSide author={detail && detail.author.loginname} title="作者"/>
                            </div>
                        </Col>
                    </Row>

                </Content></Layout> : <Spin/>
        )
    }
}

const mapStateToProps = (state) => ({
    detail: state.detail,
    loading: state.detailLoading,
    saved: state.saved,
    liked: state.liked,
    authLogin: state.authLogin,
})
const mapDispatchToProps = dispatch => ({
    fetchDetailDispatch(params) {
        dispatch(queryDetailById(params))
    },
    clearDetail(){
        dispatch(clearDetail())
    },
    saveTopicsDispatch(payload) {
        dispatch(saveTopics(payload))
    },
    cancelSaveDispatch(payload) {
        dispatch(cancelSaveTopics(payload))
    },
    likeCommandFn(payload){
        dispatch(likeCommand(payload))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Detail);