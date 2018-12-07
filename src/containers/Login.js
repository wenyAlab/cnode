import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Input, Form, Icon, Row, Col, Card } from 'antd';
import { userLogin } from '../actions/actions'

const { Content } = Layout;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 10 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 12,
        offset: 2,
      },
      sm: {
        span: 12,
        offset: 4,
      },
    },
  };

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    submit = () => {
        this.props.loginSuc(this.props.history);
    }
    render() {
        const { form, authLogin } = this.props;
        console.log(authLogin)
        const { getFieldDecorator } = form;
        return (
            <Layout>
                <Content style={{ width: '90%', maxWidth: '1400px', minWidth: '960px', margin: '15px auto', minHeight: '400px'}}>
                    <Row>
                        <Col span={18}>
                        <div style={{ background: '#fff', padding: 24, boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem label="用户名" {...formItemLayout}>
                            {getFieldDecorator('userName', {
                                initialValue: 'test',
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                            </FormItem>
                            <FormItem label="密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                initialValue: '123456',
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: '10px'}} onClick={this.submit}>
                                    登录
                                </Button>
                                 <Button type="primary" htmlType="submit" className="login-form-button">
                                    通过gitHub登录
                                </Button>
                            </FormItem>
                        </Form>
                        </div>
                        </Col>
                        <Col span={5} offset={1}>
                            <div style={{boxSizing: 'border-box', minHeight: '100vh', margin: '0 auto' }}>
                            
                            <Card
                                title="关于"
                            >
                                <p>CNode：Node.js专业中文社区</p>
                                <p>在这里你可以</p>
                                <ul>
                                    <li>向别人提出你遇到的问题</li>
                                    <li>帮助遇到问题的人</li>
                                    <li>分享自己的知识</li>
                                    <li>和其它人一起进步</li>
                                </ul>
                            </Card>
                            </div>
                        </Col>
                    </Row>
                </Content></Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.authLogin,
    authLogin: state.authLogin,
})
const mapDispatchToProps = dispatch => ({
    loginSuc(history) {
        dispatch(userLogin(history));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(Login))
// export default Form.create()(Login)