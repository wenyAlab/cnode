import React, { Component } from 'react';
import { List, Card, Avatar, Icon } from 'antd';
import { connect } from 'react-redux';

const cardStyle = {
    marginBottom: '20px',
}
const cardHeader = {
    backgroundColor: "#f6f6f6",
}
class Reply extends Component{
    render() {
        const { detail, loading } = this.props;
        return (
            <Card title={`${detail.replies.length}回复`} style={cardStyle} headStyle={cardHeader}>
                <List
                    itemLayout="horizontal"
                    dataSource={detail && detail.replies}
                    loading={loading}
                    style={{padding: '0px 24px 10px 24px '}}
                    split
                    locale={{emptyText: '暂无评论'}}
                    renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.author.avatar_url} />}
                        title={`${item.author.loginname}${item.create_at}`}
                        description={item.content}
                    />
                    <div><Icon type="like" />{item.ups.length}</div>
                    </List.Item>
                )}
            />
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = dispatch => ({
    // fetchCreateDispatch(payload, history) {
    //     dispatch(createTopics(payload, history))
    // },
    // fetchEditDispatch(payload, history) {
    //     dispatch(editTopics(payload, history))
    // }
})
export default connect(mapStateToProps, mapDispatchToProps)(Reply);