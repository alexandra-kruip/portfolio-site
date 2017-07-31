import actions from '../actions/types';

const DEFAULT_STATE = {
    videos: [],
    youtubeBoolean: false
};

export default function(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case actions.YOUTUBE_SEARCH:
            return {...state, videos: action.payload};
        case actions.YOUTUBE_TOGGLE_TRUE:
            return {...state, youtubeBoolean: action.payload};
        case actions.YOUTUBE_TOGGLE_FALSE:
            return {...state, youtubeBoolean: action.payload};
        default:
            return state;
    }
};