import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from "react-bootstrap";

export default class NavbarApp extends Component {

  render() {
    return (
       <Navbar bg="dark" variant="dark">
       <Link to="/" className="navbar-brand">Emergency Operation Center</Link>
       <Navbar.Collapse>
           <Nav className="ml-auto">
               <Link to="/incidentsList" className="nav-link">Incidents List</Link>
               <Link to="/incidentsList" className="nav-link">Resources</Link>
               <Link to="/incidentsList" className="nav-link">Tutorial</Link>
               <Link to="/incidentsList" className="nav-link">About us</Link>
           </Nav>
       </Navbar.Collapse>
      </Navbar>
    );
  }
}