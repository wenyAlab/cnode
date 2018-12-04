import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const cardStyle = {
    marginBottom: '20px',
}
const cardHeader = {
    backgroundColor: "#f6f6f6",
}
function CreateSide () {
    return (
        <React.Fragment>
        <Card
            title='markdown 语法参考'
            style={cardStyle}
            headStyle={cardHeader}
        >
            <div>
                <p>### 单行的标题</p>
                <p>**粗体**</p>
                <p>`console.log('行内代码')`</p>
                <p>```js\n code \n``` 标记代码块</p>
                <p>[内容](链接)</p>
                <p>![文字说明](图片链接)</p>
                <p><Link to="https://segmentfault.com/markdown">markdown 文档</Link></p>
            </div>
        </Card>
        <Card
            title="话题发布指南"
            style={cardStyle}
            headStyle={cardHeader}
        >
            <div>
                <p>尽量把话题要点浓缩到标题里</p>
                <p>代码含义和报错可在<Link to="https://segmentfault.com/markdown">SegmentFault</Link>提问</p>
            </div>
        </Card>
    </React.Fragment>
    )
}
export default CreateSide;