import React, { Component } from 'react';
import { List, Avatar, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';


const RenderTag = ({item}) => {
  return (
    `${item.reply_count}/${item.visit_count}${item.top ? <Tag>置顶</Tag> : ''}${item.title}`
  )
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
                    title={<RenderTag item={item}/>}
                    // title={`${item.reply_count}/${item.visit_count}${item.top ? this.renderTag('置顶') : ''}${item.title}`}
                  />
                  <div>{item.last_reply_at}</div>
                </List.Item>
              </Link>
            )}
          /> : <Spin tip="Loading..."/>
        )
    }
}