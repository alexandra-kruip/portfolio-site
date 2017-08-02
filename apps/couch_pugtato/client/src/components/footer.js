import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const Footer = () => {
    const year = new Date().getFullYear();

    return(
        <Grid className='text-center footer' style={{marginBottom: '15px'}}>
            <Row>
                <Col xs={12}>Copyright © {year} Couch Pugtato</Col>
            </Row>
        </Grid>
    )
};

export default Footer;