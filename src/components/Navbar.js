import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div style={{width: '100%'}} className="bg-dark">
            <Navbar bg="dark" expand="lg" className="container text-white" variant="dark">
                <Navbar.Brand href="/">COVID-19</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link className="text-light mr-3 link" to="/">HOME</Link>
                    <Link className="text-light mr-3 link" to="/country">SEARCH BY COUNTRY</Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}



export default NavBar
