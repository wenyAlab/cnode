import React, { Component } from 'react';
import { Button, Card } from 'antd';
import SimpleMDE from 'simplemde';
import { commandTopics } from '../actions/actions'
import { connect } from 'react-redux';

const cardStyle = {
    marginBottom: '20px',
}
const cardHeader = {
    backgroundColor: "#f6f6f6",
}
class Command extends Component{
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
    reply = () => {
        const { detail } = this.props;
        const payload = {
            accesstoken : '90fabfa0-692c-40ad-bb3b-83b44c9cf4d7',
            // title: this.state.title,
            // tab: 'dev',
            topic_id: detail.id,
            content: this.simplemde.value(),
        }
        this.props.fetchcommandDispatch(payload, this.props.history);
    }
    render() {
        return (
            <Card title="添加回复" style={cardStyle} headStyle={cardHeader}>
                <div style={{marginTop:'20px'}}>
                    <textarea id="markdown-editor"></textarea>
                </div>
                <Button type="primary" onClick={this.reply}>回复</Button>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = dispatch => ({
    fetchcommandDispatch(payload, history) {
        dispatch(commandTopics(payload, history))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(Command);