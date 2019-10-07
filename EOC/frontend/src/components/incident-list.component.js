import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarApp from "./navbar.component"
import "../static/css/App.css";

export default class IncidentList extends Component {
    render() {
        return (
            <div>
               <NavbarApp/>
               <div className="App">
               <h3>Incidents List</h3>
               </div>
            </div>
            );
  }
}