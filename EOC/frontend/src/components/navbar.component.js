import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NavbarApp extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
       <Navbar bg="dark" variant="dark">
       <Link to="/" className="navbar-brand">Emergency Operation Center</Link>
       <Navbar.Collapse>
           <Nav className="ml-auto">
               <Link to="/incidentsList" className="nav-link">Incidents List</Link>
               <Link to="/resources" className="nav-link">Resources</Link>
               <Link to="/incidentsList" className="nav-link">Tutorial</Link>
               <Link to="/incidentsList" className="nav-link">About us</Link>
               <Link to="" onClick={this.onLogoutClick} className="nav-link">Log out</Link>
           </Nav>
       </Navbar.Collapse>
      </Navbar>
    );
  }
}
NavbarApp.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavbarApp);