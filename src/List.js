import React, { Component } from 'react';
import { List, Avatar, Spin, Tag } from 'antd';
import moment from 'moment';
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
export default class ListComponent extends Component{
    

    render() {
      const { data, loading} = this.props;
        return (
          !loading ?
            <List
            itemLayout="horizontal"
            dataSource={data}
            loading={loading}
            split
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
            }}
            renderItem={item => (
              <Link to={`/detail/${item.id}`}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.author.avatar_url} />}
                    // title={<RenderTag item={item}/>}
                    title={<div><i color="#CCC">{item.reply_count}/{item.visit_count} </i>| {item.top ? <Tag color="#87d068"> 置顶</Tag>
                    : (item.good !== true ? <Tag> {renderTab(item.tab)}</Tag> : <Tag color="#87d068"> 精华</Tag> )}{item.title}</div>}
                  />
                  <div>{moment(item.last_reply_at).fromNow()}</div>
                </List.Item>
              </Link>
            )}
          /> : <Spin tip="Loading..."/>
        )
    }
}