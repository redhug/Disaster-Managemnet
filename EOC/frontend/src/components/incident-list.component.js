import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarApp from "./navbar.component"
import "../static/css/App.css";

export default class IncidentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incidentList: [{ "id": 1, "name": "Maryville incident" },
            { "id": 2, "name": "NWMSU incident" }]
        };
    }

    routeChange(){
        window.location = '/createIncident'
    }

    incidentListManage() {
        return (
            <div className="alert-secondary">
                <ul>
                    {this.state.incidentList.map(item => (
                        <li className="liCss" key={item.id}>
                            <Link to={{pathname: "/openIncident", data:item}} className="color-white">
                                <u>{item.name}</u>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div>
                <NavbarApp />
                <div className="App width100 height100">
                    <div class="row width100 height100">
                        <div class="col-md-10">
                            <h3>Incidents List</h3>
                            {this.incidentListManage()}
                        </div>

                        <div class="col-md-2 border-left">
                            <div class="mt20">
                            <button type="button" class="btn btn-secondary width100" onClick={this.routeChange}>Create incident</button>
                            <button type="button" class="btn btn-secondary mt20 width100">Archived incidents</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}