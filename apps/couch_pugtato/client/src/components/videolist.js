import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { youtubeSearch, youtubeToggleFalse } from '../actions';

class YoutubeList extends Component {
    displayVideos() {
        if (this.props.video.length <= 0) {
            return <div>Loading...</div>;
        }

        return this.props.video.map((video) => {
            const videoId = video.id.videoId;
            const url = `https://www.youtube.com/embed/${videoId}`;

            return (
                <div key={video.snippet.title}>
                    <div>
                        <div  className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src={url}></iframe>
                        </div>
                        <br/>
                    </div>
                </div>
            )
        });
    };

    modalStyle = {
        maxHeight: '60vh',
        overflowY: 'auto'
    };

    render() {
        return(
            <Modal className='text-center' show={this.props.youtubeBoolean} onHide={this.props.youtubeToggleFalse} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Trailers</Modal.Title>
                </Modal.Header>
                <Modal.Body style={this.modalStyle}>
                    {this.displayVideos()}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.props.youtubeToggleFalse}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};

function mapStateToProps(state) {
    return {
        video: state.youtube.videos,
        youtubeBoolean: state.youtubeBoolean.youtubeBoolean,
    };
};

export default connect(mapStateToProps, { youtubeSearch, youtubeToggleFalse })(YoutubeList);