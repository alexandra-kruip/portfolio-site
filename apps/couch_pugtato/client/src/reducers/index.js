import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mediaReducer from './media_reducer';
import videos from './reducer_yt';
import yelpReducer from './yelp_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    media: mediaReducer,
    youtube: videos,
    yelp: yelpReducer,
    youtubeBoolean: videos
});

export default rootReducer;