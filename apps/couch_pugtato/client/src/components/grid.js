import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import MoviePanel from './media_panel';
import YelpPanel from './yelp_panel';
import Error from './imgs/400.jpg'

class grid extends Component {
    render(){
        if(this.props.media === undefined && this.props.yelp === undefined) {
            return(
                <div className='text-center'>
                    <div className='row text-center'>
                        <div className='col-sm-12'>
                            <img className='error img-responsive' src={Error}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h3>Please go back to Pugtato and enter a valid address and/or movie genre</h3>
                            <Link className='btn btn-primary' to='/'>Back to Pugtato!</Link>
                        </div>
                    </div>
                </div>
            )
        }
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
                        <Link to='/' className='btn btn-primary'>Go back to Pugtato!</Link>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return{
        media: state.media.list,
        yelp: state.yelp.data
    }
}

export default connect(mapStateToProps)(grid);