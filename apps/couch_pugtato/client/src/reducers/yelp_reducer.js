import types from '../actions/types';

const DEFAULT_STATE = {};

export default function(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case types.FETCH_YELP:
            return { ...state, data: action.payload};
        default:
            return state;
    }
}