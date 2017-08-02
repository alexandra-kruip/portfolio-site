import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { yelpData } from '../actions/index';
 
class Yelp extends Component {
    constructor(props){
        super(props);
        this.state = {restaurant: 0};
    }

    handlePrevious(decrease) {
        if(decrease === 0){
            decrease = this.props.yelp.data.businesses.length
        }
        this.setState({restaurant: --decrease});
        this.renderYelpData();
    }

    handleNext(increase) {
        if(increase === this.props.yelp.data.businesses.length -1){
            increase = -1;
        }
        this.setState({restaurant: ++increase});
        this.renderYelpData();
    }
    
    prevNextButton(){
        return (
            <div className='row'>
                <div className='col-xs-3 prev-button'><btn className="btn btn-warning" onClick={() => this.handlePrevious(this.state.restaurant)}><i style={{paddingLeft: '5px'}} className="glyphicon glyphicon-chevron-left"/></btn></div>
                <div className='col-xs-6 panel-title'>What To Eat</div>
                <div className='col-xs-3 next-button'><btn className="btn btn-info" onClick={() => this.handleNext(this.state.restaurant)}><i style={{paddingLeft: '5px'}} className="glyphicon glyphicon-chevron-right"/></btn></div>
            </div>
        )
    }
    
    renderYelpData() {
        if(!this.props.yelp) {
            return <div>Woomp Woomp No Food...</div>
        }
              
        const { name, display_phone, image_url, price, rating, url } = this.props.yelp.data.businesses[this.state.restaurant];
        const { address1, city, state, zip_code } = this.props.yelp.data.businesses[this.state.restaurant].location;
        const { title } = this.props.yelp.data.businesses[this.state.restaurant].categories["0"]
        
        return(
            <Panel header={this.prevNextButton()} bsStyle="danger" className="text-center">
                <a href={url} target="_blank"><h2>{name}</h2></a>
                <img src={image_url} className="img-responsive" alt="food_location" style={{marginBottom: '10px'}}/>
                <div className="y-data">
                    <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                    {`${address1} ${city}, ${state}, ${zip_code}`}
                </div>
                <div className="y-data">
                    <span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>
                    {` Contact Number: ${display_phone}`}
                </div>
                <div className="y-data">
                    {` Yelp Rating: ${rating} | Category: ${title} | Price: ${price} ` } 
                </div>
                <div>
                    
                </div>
            </Panel>
        )
    }

    render() {
        return (
            <div>
                 { this.renderYelpData() } 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        yelp: state.yelp.data
    }
}

export default connect(mapStateToProps, {yelpData})(Yelp);
