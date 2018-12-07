import React, { Component } from 'react';
import { Layout, Button, Input, Row, Col, Card, message } from 'antd';
import SimpleMDE from 'simplemde';
import CreateSide from '../components/CreateSide';
import { createTopics, editTopics } from '../actions/actions'
import { connect } from 'react-redux';

const { Content } = Layout;
const cardStyle = {
    marginBottom: '20px',
}
const cardHeader = {
    backgroundColor: "#f6f6f6",
}
class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content:'',
        }
    }
    componentDidMount() {
        this.initMarkdownEditor();
    }
     // 初始化markdown编辑器
     initMarkdownEditor = () => {
        this.simplemde = new SimpleMDE({
            element: document.getElementById("markdown-editor"),
            spellChecker: false, 				// 启用拼写检查，会有背景色
            autoDownloadFontAwesome: false,	 // 是否需要下载字体图标
            toolbar: ["bold", "italic", "strikethrough", "heading", "|", "code", "quote", "unordered-list", "numbered-list", "|", "link", "image", "horizontal-rule", "|", "preview", "side-by-side", "guide"]	
        });
    }
    componentWillUnmount() {
    }
    create = () => {
        const { location } = this.props;
        const payload = {
            accesstoken: '90fabfa0-692c-40ad-bb3b-83b44c9cf4d7',
            title: this.state.title,
            tab: 'dev',
            content: this.simplemde.value(),
        }
        if (!location.state) {
            // 新建主题
            this.props.fetchCreateDispatch(payload, this.props.history);
        } else {
             // 编辑状态下
            payload.topic_id = location.state.id
            this.props.fetchEditDispatch(payload, this.props.history)
        }
    }
    titleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    render() {
        const { location } = this.props;
        return (
            <Layout>
                <Content style={{ width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
                    <Row>
                        <Col span={18}>
                        <Card title="主页/发布话题" style={cardStyle} headStyle={cardHeader}>
                            <p>发布模块：客户端测试</p>
                            <Input placeholder="标题字数10字以上" defaultValue={location.state && location.state.title} onChange={this.titleChange} />
                            <div style={{marginTop:'20px'}}>
                                <textarea id="markdown-editor" defaultValue={location.state && location.state.content}></textarea>
                            </div>
                            <Button type="primary" onClick={this.create}>发布</Button>
                        </Card>
                        </Col>
                        <Col span={5} offset={1}>
                            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            <CreateSide/>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = dispatch => ({
    fetchCreateDispatch(payload, history) {
        dispatch(createTopics(payload, history))
    },
    fetchEditDispatch(payload, history) {
        dispatch(editTopics(payload, history))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Detail);