const fetch = require('node-fetch');

export const QUERY_ALL = 'QUERY_ALL';
export const QUERY_DETAIL = 'QUERY_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CLEAR_LIST = 'CLEAR_LIST';

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