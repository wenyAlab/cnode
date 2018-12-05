import React, { Component } from 'react';
import { Layout, Spin, Tag, List, Avatar, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import MarkDown from  'react-markdown';
import AuthorSide from './AuthorSide';
import { connect } from 'react-redux';
import { queryDetailById, clearDetail} from '../actions/actions';

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
    render() {
      const { detail, loading} = this.props;
      console.log(loading)
        return (
            !loading  ?
            <Layout>
                <Content style={{ width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
                    <Row>
                        <Col span={18}>
                        <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            <h2 style={{ padding: 24, fontWeight:'bold', boxSizing: 'border-box', margin: '0 auto' }}>{detail && detail.top ? <Tag color="#87d068">置顶</Tag> : null}{detail && detail.title}</h2>
                            <div style={{ padding: 24, boxSizing: 'border-box', margin: '0 auto' }}>
                                作者：<Tag >{detail && detail.author.loginname}</Tag> |
                                发布时间：<Tag >{detail && detail.create_at} </Tag> |
                                浏览次数：<Tag> {detail && detail.visit_count}</Tag> |
                                来自：<Tag  > {detail && detail.tab}</Tag>
                            </div>
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
                                    <div><Icon type="like" />{item.ups.length}</div>
                                    </List.Item>
                                </Link>
                                )}
                            />
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
})
const mapDispatchToProps = dispatch => ({
    fetchDetailDispatch(params) {
        dispatch(queryDetailById(params))
    },
    clearDetail(){
        dispatch(clearDetail())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Detail);