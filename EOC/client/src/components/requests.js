import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from "react-bootstrap";
import NavbarApp from "./navbar.component"
import "../static/css/App.css";
import axios from "axios";
import moment from "moment";
import store from "../store";

export default class PendingRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingRequests: [],
            status: "open"
        };
        this.routeChange = this.routeChange.bind(this);
    }
    async componentDidMount() {
             if(store.getState().auth.isAdmin){
                this.getPendingRequests();
             }
             else{
                this.props.history.push("/incidentsList");
             }
    }
    async getPendingRequests(){
        await axios.get('/api/auth/pendingRequests')
        .then(response => {
            console.log(response.data)
            this.setState({ pendingRequests: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    routeChange() {
        this.props.history.push('/createIncident');
        //window.location = '/createIncident'
    }
    pendingRequestsManage() {
        if(this.state.pendingRequests.length > 0){
        return (
            <div className="alert-secondary clearfix">
                <ul>
                    {this.state.pendingRequests.map(item => (
                        <li className="liCss color-black" key={item._id}>
                            <Link to={{ pathname: "/newUserDetails", state: item }} className="color-black">
                                <u>{item.firstName} {item.lastName}</u>
                            </Link>                            
                                {/* <span> - {moment(item.dateAndTime).format("MM/DD/YYYY HH:mm")}</span> */}
                        </li>
                    ))}
                </ul>
            </div>
        );
        }
        else{
            return(
            <div className="alert-secondary clearfix">
                No pending requests
            </div>
            );
        }
    }

    render() {
        return (
            <div>
                <NavbarApp />
                <div className="App width100 height100">
                    <div className="row width100 height100">
                        <div className="col-md-10">
                            <div>
                                <h3 className="float-left">Pending requests</h3>
                            </div>
                            {this.pendingRequestsManage()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}