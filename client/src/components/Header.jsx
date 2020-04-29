import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/projects">Bug Tracker</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/projects">Home</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/tickets/list">My Tickets</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
