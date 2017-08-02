import actions from '../actions/types';

const DEFAULT_STATE = { homeBoolean: false };

export default function(state=DEFAULT_STATE, action) {
    switch(action.type) {
        case actions.HOME_BOOLEAN:
            return{...state, homeBoolean: action.payload}
        default:
            return state;
    }
}