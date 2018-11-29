import { QUERY_ALL, QUERY_DETAIL, CLEAR_DETAIL, CLEAR_LIST} from '../actions/actions';
const initState = {
    list: [],
    authLogin: false,
    tabLoading: true,
    detailLoading: true,
    detail: {},
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
        default:
            return state;
    }
}
export default myReducer;