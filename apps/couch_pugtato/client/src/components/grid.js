import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { fetchMedia, yelpData } from '../actions';
import MoviePanel from './media_panel';
import YelpPanel from './yelp_panel';

class grid extends Component {
    componentDidMount() {
        if(this.props.media === undefined && this.props.yelp === undefined) {
            const split = this.props.match.url.split('/');
            const url = {
                genre: split[2],
                address: split[3]
            }
            this.props.fetchMedia(url);
            this.props.yelpData(url);
        }
    }
    
    render(){
        if(this.props.media === undefined && this.props.yelp === undefined) {
            return(
                <div className="loader-div">
                    <div className="loader"></div>  
                </div>  
            );
        };

        return (
            <Grid className="result">
                <Row className="show-grid">
                    <Col sm={12} md={6} >
                        <MoviePanel />
                    </Col>
                    <Col sm={12} md={6} >
                        <YelpPanel />
                    </Col>
                    <Col sm={12} className='text-center'>
                        <Link to='/' className='btn btn-warning'>Make a New Search!</Link>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return{
        media: state.media.list,
        yelp: state.yelp.data,
    }
}

export default connect(mapStateToProps, { fetchMedia, yelpData })(grid);