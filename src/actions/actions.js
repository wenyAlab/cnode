
const fetch = require('node-fetch');
export const QUERY_ALL = 'QUERY_ALL';
export const QUERY_DETAIL = 'QUERY_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CLEAR_LIST = 'CLEAR_LIST';
export const LOGIN_SUC = 'LOGIN_SUC';
export const LOG_OUT = 'LOG_OUT';

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
export function userLogin () {
    return (dispatch) => {
        const accesstoken = '90fabfa0-692c-40ad-bb3b-83b44c9cf4d7';
        fetch(`/accesstoken`, {
            method: 'post',
            body: JSON.stringify({accesstoken: accesstoken}),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(res => dispatch(userLoginSuc(res)));
    }
}
// 设置用户登出
export const userLogoutSuc = () => {
    return {
        type: LOG_OUT,
        // payload: [],
    }
}