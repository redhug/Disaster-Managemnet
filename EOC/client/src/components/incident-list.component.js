import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from "react-bootstrap";
import NavbarApp from "./navbar.component"
import "../static/css/App.css";
import axios from "axios";
import moment from "moment";

export default class IncidentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidentList: [],
            status: "open"
        };
        this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
       this.getIncidentsList();
    }
    async getIncidentsList(){
        await axios.get('/api/incident/getIncidents',
        {
            params: {
                status: this.state.status
            }
        })
        .then(response => {
            console.log(response.data)
            this.setState({ incidentList: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    routeChange() {
        this.props.history.push('/createIncident');
        //window.location = '/createIncident'
    }
    async handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        //console.log(target.name)
        await this.setState({
            [name]: value
        });
        this.getIncidentsList();
    }
    incidentListManage() {
        return (
            <div className="alert-secondary clearfix">
                <ul>
                    {this.state.incidentList.map(item => (
                        <li className="liCss color-black" key={item.incidentId}>
                            <Link to={{ pathname: "/viewIncident", state: item }} className="color-black">
                                <u>{item.incidentName}</u>
                            </Link>                            
                                <span> - {moment(item.dateAndTime).format("MM/DD/YYYY HH:mm")}</span>
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
                    <div className="row width100 height100">
                        <div className="col-md-10">
                            <div>
                                <h3 className="float-left">Incidents List</h3>
                                <div className="float-right mb10">
                                    <select name="status"
                                        className="browser-default custom-select" value={this.state.status}
                                        placeholder="Select status"
                                        onChange={this.handleChange}>
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            {this.incidentListManage()}
                        </div>

                        <div className="col-md-2 border-left">
                            <div className="mt20">
                                <button type="button" className="btn btn-secondary width100" onClick={this.routeChange}>Create incident</button>
                                {/*<button type="button" className="btn btn-secondary mt20 width100">Archived incidents</button>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}