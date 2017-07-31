import React, { Component }from 'react';

class GoogleMap extends Component {
    componentDidMount() { // called automitcally after component renders to screen
        new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: this.props.lat,
                lng: this.props.lon
            }
        });
    }
    render() {
        return <div id="map" />; // ref system allows for direct reference to HTML that has been rendered to page
    }
}

export default GoogleMap;