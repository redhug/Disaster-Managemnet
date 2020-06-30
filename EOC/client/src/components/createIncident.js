import React, { Component } from "react";
//import { Router } from 'react-router';
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import 'rc-datetime-picker/dist/picker.css';
import NavbarApp from "./navbar.component";
import { Button } from "react-bootstrap";
import axios from "axios";
import { store } from 'react-notifications-component';

export default class CreateIncident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            location: "",
            description: "",
            moment: moment(),
            timeDate: "",
            buttonName: "Create incident",
            incidentId:0
        };
        this.handleChange = this.handleChange.bind(this);
        this.closeIncident = this.closeIncident.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location)
        if (this.props.location) {
            if (this.props.location.state) {
                if (this.props.location.state.incidentName) {
                    this.setState({ title: this.props.location.state.incidentName });
                }
                if (this.props.location.state.location) {
                    this.setState({ location: this.props.location.state.location });
                }
                if (this.props.location.state.timeofIncident) {
                    this.setState({ timeDate: this.props.location.state.timeofIncident });
                }
                if (this.props.location.state.description) {
                    this.setState({ description: this.props.location.state.description });
                }
                if (this.props.location.state.incidentId) {
                    this.setState({ incidentId: this.props.location.state.incidentId });
                }
                if (this.props.location.state.btnName) {
                    if(this.props.location.state.btnName == "update"){
                        this.setState({ buttonName: "Edit incident" });
                    }
                }
            }
        }
    }
    handleChangeMoment = (moment) => {
        this.setState({
            moment
        });
        this.setState({
            timeDate: this.state.moment.format("MM-DD-YYYY HH:mm")
        });
    }
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }
    createIncident(){
        var data = {
            incidentName: this.state.title,
            address: this.state.location,
            dateAndTime: this.state.timeDate,
            description: this.state.description
        }
        axios
            .post('/api/incident/createIncident', data)
            .then(response =>{
                if(response.status == 200){
                    this.props.history.push('/incidentsList');
                }else{
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    editIncident(){
        var data = {
            incidentId: this.state.incidentId,
            incidentName: this.state.title,
            address: this.state.location,
            dateAndTime: this.state.timeDate,
            description: this.state.description
        }
        axios
            .post('/api/incident/editIncident', data)
            .then(response =>{
                if(response.status == 200){
                    this.props.history.push('/incidentsList');
                }else{
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.buttonName)
        if(this.state.buttonName=="Create incident"){
            console.log(this.state);
            this.createIncident();
        }  
        else if(this.state.buttonName=="Edit incident"){
            this.editIncident();
        }      
        //window.location = '/incidentsList';
    }
    closeIncident(){
        console.log(this.state.incidentId)
        axios
                .post('/api/incident/closeIncident',
                {
                    params: {
                        incidentId: this.state.incidentId
                    }
                })
                .then(response =>{
                    if(response.status == 200){
                        store.addNotification({
                            title: "Incident closed!",
                            message: "The incident is closed!!!",
                            type: "info",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            width: 300,
                            dismiss: {
                              duration: 5000,
                              onScreen: true
                            }
                          });
                        this.props.history.push('/incidentsList');
                    }else{
                        console.log(response)
                    }
                })
                .catch(error => {
                    console.log(error)
            })
    }
    renderCloseButton(){

        if(this.state.buttonName != 'Create incident'){
            return(
                <span  className="ml2 mt20"><Button name={this.state.buttonName}
                bssize="large" onClick={e =>
                    window.confirm("Are you sure you wish to archive this item?") &&
                    this.closeIncident(e)
                }>Close incident</Button></span>
            );
        }
    }

    render() {
        return (
            <div>
                <NavbarApp />
                <div className="signup form-wrapper">
                    <div className="card bg-light mb-3 m20">
                    <div className="card-header m20">
                    <h2>{this.state.buttonName}</h2>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="inputBox width70">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                placeholder="Title of the incident"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="location">Address/Co-ordinates</label>
                            <input
                                type="text"
                                placeholder="Address/Co-ordinates"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="timeDate">Incident date and time</label>
                            <DatetimePickerTrigger
                                moment={this.state.moment}
                                onChange={this.handleChangeMoment}>
                                <input className="width100"
                                    type="text"
                                    placeholder="Enter date and time"
                                    value={this.state.timeDate}
                                    onChange={this.handleChange}
                                />
                            </DatetimePickerTrigger>
                        </div>
                        <div className="inputBox width100">
                            <label htmlFor="description">Description</label>
                            <textarea
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </div>
                        
                    </form>
                    </div>
                    </div>
                    <div className="text-center">
                    <div className="mt20">
                        <span>
                            <Button name={this.state.buttonName}
                                bssize="large" type="submit">{this.state.buttonName}</Button>
                                                        
                        {this.renderCloseButton()}
                        </span>
                        </div>
                       </div> 
                </div>
            </div>
        );
    }
}