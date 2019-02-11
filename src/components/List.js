import React, { Component } from 'react';
import { List, Avatar, Spin, Tag } from 'antd';
import moment from 'moment';
import './list.less';
import 'moment/locale/zh-cn'
import { Link } from 'react-router-dom';


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

    render() {
      const { data, loading, pagination} = this.props;
        return (
          !loading ?
          <React.Fragment>
            <List
            itemLayout="horizontal"
            className="topics_list"
            dataSource={data}
            loading={loading}
            split={true}
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
          /> </React.Fragment>: <Spin tip="Loading..."/>
        )
    }
}

export default ListComponent;