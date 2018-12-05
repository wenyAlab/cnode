import { QUERY_ALL, QUERY_DETAIL, CLEAR_DETAIL,
    CLEAR_LIST, LOGIN_SUC, LOG_OUT, SAVE_TOPICS, CANCEL_SAVE} from '../actions/actions';
const initState = {
    list: [],
    authLogin: false,
    userData: {},
    tabLoading: true,
    detailLoading: true,
    detail: {},
    saved: false,
};

function myReducer(state = initState, action) {
    switch (action.type) {
        case QUERY_ALL:
            return {
                ...state,
                list: action.payload,
                tabLoading: false,
            };    
        case QUERY_DETAIL:
            return {
                ...state,
                detail: action.payload,
                detailLoading: false,
            };    
        case CLEAR_DETAIL:
            return {
                ...state,
                detail: [],
                detailLoading: true,
            };    
        case CLEAR_LIST:
            return {
                ...state,
                list: [],
                tabLoading: true,
            };    
        case LOGIN_SUC:
            return {
                ...state,
                authLogin: true,
                userData: action.payload,
            };    
        case LOG_OUT:
            return {
                ...state,
                authLogin: false,
            }; 
        case SAVE_TOPICS:
            return {
                ...state,
                saved: true,
            }
        case CANCEL_SAVE:
            return {
                ...state,
                saved: false,
            }
        default:
            return state;
    }
}
export default myReducer;