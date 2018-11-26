import { QUERY_ALL } from '../actions/actions';

const initState = {todo: {}};

function myReducer(state = initState, action) {
    switch (action) {
        case QUERY_ALL:
            return action.tab;
            // break;
    
        default:
            return state;
    }
}
export default myReducer;