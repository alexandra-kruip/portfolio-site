import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class navbarTest extends Component {
    render() {
        return (
            <Navbar collapseOnSelect className="navbar-inverse">
                <Navbar.Header>
                    <Navbar.Brand justified>
                        <a href="#">Couch Pugtato</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                     <Nav pullRight>
                         <NavItem eventKey={1} href="#"> 
                             <Button bsStyle="info" block>Log In / Sign Up</Button>
                         </NavItem> 
                     </Nav> 
                </Navbar.Collapse>
            </Navbar>
        )
    }    
}

export default navbarTest;