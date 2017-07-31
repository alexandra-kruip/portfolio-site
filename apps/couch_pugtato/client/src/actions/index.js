import axios from 'axios';
import YTSearch from 'youtube-api-search';
import actions from './types';
import { yt_key } from '../../api_keys';
import { tmdb_key } from '../../api_keys';

const YELP_URL = 'https://couch-pugtato.herokuapp.com/yelp';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?with_genres=';
const TAIL_URL = '&api_key='+ tmdb_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&page=1';

export function fetchMedia (val){
    const { genre } = val;
    
    const request = axios.get(`${BASE_URL}${genre}${TAIL_URL}`);
        return {
            type: actions.FETCH_MEDIA,
            payload: request
        }
}

export function yelpData(val) {
    const location = val.address;
    const yelp = axios.get(`${YELP_URL}/${location}`);
        return {
            type: actions.FETCH_YELP,
            payload: yelp
        }
}

export function youtubeSearch(term) {
    return (dispatch) => {
        var response = [];
        YTSearch({
            key: yt_key,
            term
        }, (videos) => {
            dispatch({
                type: actions.YOUTUBE_SEARCH,
                payload: videos
            });
        });
    }
    
}

export function youtubeToggleTrue() {
    return{
        type: actions.YOUTUBE_TOGGLE_TRUE,
        payload: true
    };
}

export function youtubeToggleFalse() {
    return{
        type: actions.YOUTUBE_TOGGLE_FALSE,
        payload: false
    };
}