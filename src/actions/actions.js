import { message } from 'antd';
const fetch = require('node-fetch');
export const QUERY_ALL = 'QUERY_ALL';
export const QUERY_DETAIL = 'QUERY_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CLEAR_LIST = 'CLEAR_LIST';
export const LOGIN_SUC = 'LOGIN_SUC';
export const LOG_OUT = 'LOG_OUT';
export const SAVE_TOPICS = 'SAVE_TOPICS';
export const CANCEL_SAVE = 'CANCEL_SAVE';
export const IS_LIKE = 'IS_LIKE';

// 获取首页列表
export const queryAll =  (payload) => {
    return {
        type: QUERY_ALL,
        payload,
    }
}
export function queryAllTab(params) {
    return(dispatch) => {
        fetch(`/topics?tab=${params}`)
        .then(res => res.json())
        .then(json => dispatch(queryAll(json.data)));
    }
}

// 获取文章详情
export const queryDetail = (payload) => {
    return {
        type: QUERY_DETAIL,
        payload,
    }
}
export function queryDetailById(params) {
    return(dispatch) => {
        fetch(`/topic/${params}?mdrender=false`)
        .then(res => res.json())
        // .then(res => this.setState({detailData: res.data, loading: false}));
        .then(res => dispatch(queryDetail(res.data)))
    }
}

// 清楚详情data
export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
        payload: [],
    }
}
// 清楚列表
export const clearList = () => {
    return {
        type: CLEAR_LIST,
        payload: [],
    }
}
// 设置用户登录成功
export const userLoginSuc = (payload) => {
    return {
        type: LOGIN_SUC,
        payload,
    }
}
export function userLogin (history) {
    return (dispatch) => {
        const accesstoken = '90fabfa0-692c-40ad-bb3b-83b44c9cf4d7';
        fetch(`/accesstoken`, {
            method: 'post',
            body: JSON.stringify({accesstoken: accesstoken}),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(res => {
            dispatch(userLoginSuc(res))
            if (res.success) {
                message.success('登录成功');
                history.push('/')
            } else {
                message.error('登录失败')
            }
        });
    }
}
// 设置用户登出
export const userLogoutSuc = () => {
    return {
        type: LOG_OUT,
        // payload: [],
    }
}
 
// accesstoken String 用户的 accessToken
// title String 标题
// tab String 目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
// content String 主体内容

// 新建主题
export function createTopics(payload, history) {
    return (dispatch) => {
        fetch('/topics', {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(res =>  {
            if (res.success) {
                message.success('创建成功');
                history.push('/')
            } else {
                message.error('创建失败');
            }
        })
    }
}
// 收藏主题
export function saveTopics(payload) {
    return (dispatch) => {
        fetch('/topic_collect/collect', {
            method: 'post',
            body: JSON.stringify(payload),
            header: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(res => {
            dispatch(saveTopicsSuc())
            if (res.success) {
                dispatch(saveTopicsSuc())
            } else {
                message.error('收藏失败');
            }
        })
    }
}

export const saveTopicsSuc = () => {
    return {
        type: SAVE_TOPICS,
    }
}

// 取消收藏主题
 export function cancelSaveTopics (params) {
    return(dispatch) => {
        fetch('/topic_collect/de_collect', {
            method: 'post',
            body: JSON.stringify(params),
            header: {"Content-Type": 'application/json'},
        }).then(res => res.json())
        .then(res => dispatch(cancelSuc()))
    }
 }
 export const cancelSuc = () => {
     return {
         type: CANCEL_SAVE,
     }
 }

 // 编辑主题
 export function editTopics(params, history) {
     return(dispatch) => {
         fetch('/topics/update', {
             method:'post',
             body: JSON.stringify(params),
             header: {'Content-Type': 'application/json'},
         }).then(res => res.json())
         .then(res =>  {
            if (res.success) {
                message.success('编辑成功');
                history.push('/')
            } else {
                message.error('编辑失败');
            }
        })
     }
 }
 // 评论主题
 export function commandTopics(payload, history) {
     return(dispatch) => {
         fetch(`/topic/${payload.topic_id}/replies`, {
             method: 'post',
             body: JSON.stringify(payload),
             header: {"Content-Type": 'application/json'},
         }).then(res => res.json())
         .then(res =>  {
            if (res.success) {
                message.success('评论成功');
                history.push(`/detail/${payload.topic_id}`)
            } else {
                message.error('评论失败');
            }
        })
     }
 }

 // 评论点赞
 export function likeCommand(payload, history) {
     return(dispatch) => {
        fetch(`/reply/${payload.reply_id}/ups`, {
            method: 'post',
            body: JSON.stringify(payload),
            header: {"Content-Type": 'application/json'}
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                dispatch(queryLike())
            } else {
                message.error('点赞失败')
            }
        })
     }
 }
export const queryLike = () => {
    return {
        type: IS_LIKE,
    }
}
