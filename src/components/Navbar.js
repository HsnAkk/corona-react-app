import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';


function NavBar() {
    return (
        <div style={{width: '100%'}} className="bg-light">
            <Navbar bg="dark" expand="lg" className="container text-white" variant="dark">
                <Navbar.Brand href="/">COVID-19</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">HOME</Nav.Link>
                    <Nav.Link href="/country">SEARCH BY COUNTRY</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}



export default NavBar
