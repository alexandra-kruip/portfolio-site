import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { yelpData, fetchMedia } from '../actions';
import { Link } from 'react-router-dom'
import Footer from './footer';
import Pugtato from './imgs/splash-bg.png';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingButton: false
        };
    };

    onFormSubmit(value) {
        this.setState({
            loadingButton: true
        });
        this.props.fetchMedia(value);
        this.props.yelpData(value).then(() => {
            this.props.history.push(`/home/${value.genre}/${value.address}`);
        })
    }
    
    renderField(field) {
        const { label, meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-error has-feedback' : ''}`;
        
        return(
            <div className={className}>
                <label className="form-control-label">{field.label}</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder={field.placeholder}
                    { ...field.input }
                />
                <div className='help-block with-errors'>
                    { touched ? error : ''}
                </div>
            </div>
        );
    };

    renderDropdown(field) {
        const { label, meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-error has-feedback' : ''}`;

        function dropdownList() {
            const list = [
                {"id": '', "name": "Select a Genre"},
                {"id": 28, "name": "Action"},
                {"id": 12, "name": "Adventure"},
                {"id": 16, "name": "Animation"},
                {"id": 35, "name": "Comedy"},
                {"id": 80, "name": "Crime"},
                {"id": 99, "name": "Documentary"},
                {"id": 18, "name": "Drama"},
                {"id": 10751, "name": "Family"},
                {"id": 14, "name": "Fantasy"},
                {"id": 36, "name": "History"},
                {"id": 27, "name": "Horror"},
                {"id": 10402, "name": "Music"},
                {"id": 9648, "name": "Mystery"},
                {"id": 10749, "name": "Romance"},
                {"id": 878, "name": "Science Fiction"},
                {"id": 10770, "name": "TV Movie"},
                {"id": 53, "name": "Thriller"},
                {"id": 10752, "name": "War"},
                {"id": 37, "name": "Western"}
            ]

            return list.map((genre) => {
                return(
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                )
            })
        }

        return(
            <div className={className}>
                <label className='form-control-label'>{field.label}</label>
                <select className='form-control' {...field.input}>
                    {dropdownList()}
                </select>
                <div className='help-block with-errors'>
                    { touched ? error : ''}
                </div>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <div>
                <h1 className="title">Welcome to Couch Pugtato!</h1>
                <div className="bg-splash">
                    <div className="container splash-content">
                        <div className="splash-items">
                            <div className="col-sm-12 col-md-7">
                                <img className="pugtato img-responsive" src={Pugtato} alt="pugtato"/>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit((value) => this.onFormSubmit(value))} className="row splash-form col-sm-12 col-md-5">
                            <p className="p-title">Please enter your location and select a movie genre to get started.</p>
                            <div>
                                <Field
                                    name='address'
                                    label="Address"
                                    placeholder='e.g. 9200 Irvine Center Drive, Irvine, CA 92618'
                                    component={this.renderField}

                                />
                                <Field
                                    name='genre'
                                    placeholder='Enter Movie Type'
                                    component={this.renderDropdown}
                                    label="Movie Genre"
                                />
                                {!this.state.loadingButton ? <button to='/home' type="submit" className='btn btn-warning btn-block' onClick={handleSubmit((value) => this.onFormSubmit(value))}>Submit</button> : <span className='btn btn-warning btn-block disabled'>Loading...</span>}
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

function validate(values) {
    const errors = {};

    if(!values.address) {
        errors.address = 'Please enter a valid address.'
    };
    if(!values.genre) {
        errors.genre = 'Please select a movie genre.'
    }

    return errors;
};

Splash = reduxForm({
    form: 'location_form',
    validate
})(Splash);

export default connect(null, { yelpData, fetchMedia })(Splash);