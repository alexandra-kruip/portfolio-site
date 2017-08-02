import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { fetchMedia } from '../actions/index';
import { connect } from 'react-redux';
import { genre_decoder } from './helper_functions';
import { youtubeSearch, youtubeToggleTrue, youtubeToggleFalse } from '../actions/index'

class MediaPanel extends Component {
    constructor(props){
        super(props);
        this.state = {movie: 0};
    }

    handlePrevious(decrease) {
        if(decrease === 0){
            decrease = 20
        }
        this.setState({movie: --decrease});
        this.props.youtubeToggleFalse();
        this.renderMedia();
    }

    handleNext(increase) {
        if(increase === 19){
            increase = -1;
        }
        this.setState({movie: ++increase});
        this.props.youtubeToggleFalse();
        this.renderMedia();
    }
    
    prevNextButton(){
        return (
            <div className='row'>
                <div className='col-xs-3 prev-button'><btn className='btn btn-warning' onClick={() => this.handlePrevious(this.state.movie)}><i style={{paddingLeft: '5px'}} className="glyphicon glyphicon-chevron-left"/></btn></div>
                <div className='col-xs-6 panel-title'>What To Watch</div>
                <div className='col-xs-3 next-button'><btn className="btn btn-info" onClick={() => this.handleNext(this.state.movie)}><i style={{paddingLeft: '5px'}} className="glyphicon glyphicon-chevron-right"/></btn></div>
            </div>
        )
    }
    
    renderMedia(){
        if(!this.props.media){
            return <div>Woomp Woomp No Movie...</div>
        }
        const resultsArr = this.props.media.data.results;

        const { title, overview, poster_path, vote_average, genre_ids, release_date } = resultsArr[this.state.movie];

        const term = `${title} trailer`

        this.props.youtubeSearch(term);

        return(
            <Panel header= {this.prevNextButton()} bsStyle="info" className='text-center'>
                <h2>{title}</h2>
                <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + poster_path}/>
                <h4>Rating: <i className="glyphicon glyphicon-star"/>{vote_average}</h4>
                <btn className="btn btn-primary" style={{marginBottom: '10px'}} onClick={() => this.props.youtubeToggleTrue()}><i className="glyphicon glyphicon-play"/>  Show Trailers</btn>
                <p>Genres: {`${genre_decoder(genre_ids)}`}</p>
                <p>Release Date: {release_date}</p>
                <p>{overview}</p>
            </Panel>
        )
    }
    render() {
        return (
            <div>
                {this.renderMedia()}
            </div>
        )
    }
};

function mapStateToProps(state){
    return {
        media: state.media.list
    }
}

export default connect(mapStateToProps, {fetchMedia, youtubeSearch, youtubeToggleTrue, youtubeToggleFalse })(MediaPanel);



