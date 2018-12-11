import React, { Component } from 'react';
import { List, Avatar, Spin, Tag, Menu } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { queryAllTab } from '../actions/actions'


const renderTab = (tab) => {
  let tabText = '';
  switch (tab) {
    case 'share':
      tabText = '分享';
      break;
    case 'ask':
      tabText = '问答';
      break;
    case 'good':
      tabText = '精华';
      break;
    default:
      tabText = 'cnode';
      break;
  }
  return tabText;
}
class ListComponent extends Component{
    constructor(props) {
      super(props);
      this.state = {
        defaultKey: ['1'],
      }
    }
    componentDidMount() {
      this.props.fetchAllTab('all');
    }
    handleMenu = ({key}) =>{
      this.setState({
        loading: true,
      })
      let params;
      switch (key) {
        case '1':
          params = 'all';
          break;
        case '2':
          params = 'good';
          break;
        case '3':
          params = 'share';
          break;
        case '4':
          params = 'ask';
          break;
        case '5':
          params = 'dev';
          break;
        default:
          break;
      }
  
      this.props.fetchAllTab(params);
    }

    render() {
      const { defaultKey } = this.state;

      const { data, loading, pagination} = this.props;
        return (
          !loading ?
            <List
            itemLayout="horizontal"
            dataSource={data}
            loading={loading}
            header={
              <div>
                <Menu
                  mode="horizontal"
                  defaultSelectedKeys={defaultKey}
                  style={{ height: '40px', lineHeight: '40px' }}
                  onClick={this.handleMenu}
                >
                <Menu.Item key="1">全部</Menu.Item>
                <Menu.Item key="2">精华</Menu.Item>
                <Menu.Item key="3">分享</Menu.Item>
                <Menu.Item key="4">问答</Menu.Item>
                <Menu.Item key="5">客户端测试</Menu.Item>
              </Menu>
            </div>
          }
            split
            locale={{
              emptyText: '暂无'
            }}
            pagination={pagination}
            renderItem={item => (
              <Link to={`/detail/${item.id}`}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar shape="square"  src={item.author.avatar_url} />}
                    // title={<RenderTag item={item}/>}
                    style={{flex: 2}}
                    title={<div style={{maxWidth: '100%'}}><span style={{color: '#ccc', width: '70px',display: 'inline-block', textAlign: 'center'}}><span style={{color: '#9e78c0'}}>{item.reply_count ? item.reply_count : '0'}</span>/<span style={{color: '#b4b4b4'}}>{item.visit_count ? item.visit_count : '99'} </span></span>{item.top ? <Tag color="#87d068"> 置顶</Tag>
                    : (item.good !== true ? <Tag> {renderTab(item.tab)}</Tag> : <Tag color="#87d068"> 精华</Tag> )}{item.title}</div>}
                  />
                  <div style={{color: '#778087', fontSize: '12px'}}>{moment(item.last_reply_at).fromNow()}</div>
                </List.Item>
              </Link>
            )}
          /> : <Spin tip="Loading..."/>
        )
    }
}
const mapStateToProps = () => ({

})
const mapDispatchToProps = (dispatch) => ({
  fetchAllTab(params){
    dispatch(queryAllTab(params))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);