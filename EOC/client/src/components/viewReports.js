import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarApp from "./navbar.component"
import "../static/css/App.css";

export default class ViewReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportList: [{ "id": 1, "name": "Bus collided" },
            { "id": 2, "name": "Farm truck on fire" }],
            incidentName:"",
            incidentId:""
        };
        this.routeChange = this.routeChange.bind(this);
    }
    componentDidMount() {
         //console.log(this.props.location)
         if (this.props.location) {
             if (this.props.location.state) {
                 console.log(this.props.location.state.name)
                 if (this.props.location.state.name) {
                     this.setState({ incidentName: this.props.location.state.name });
                 }
                 if (this.props.location.state.id) {
                     this.setState({ incidentId: this.props.location.state.id });
                 }
             }
         }
         console.log(this.state)
     }
    routeChange(){
        this.props.history.push({pathname: '/createReport',state: { incidentId: this.state.incidentId }});
        //window.location = '/createIncident'
    }

    reportListManage() {
        return (
            <div className="alert-secondary">
                <ul>
                    {this.state.reportList.map(item => (
                        <li className="liCss" key={item.id}>
                            <Link to={{pathname: "/viewReport", data:item}} className="color-black">
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
                    <div className="row width100 height100">
                        <div className="col-md-10">
                            <h3>Reports List - {this.state.incidentName}</h3>
                            {this.reportListManage()}
                        </div>

                        <div className="col-md-2 border-left">
                            <div className="mt20">
                            <button type="button" className="btn btn-secondary width100" onClick={this.routeChange}>Create report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}