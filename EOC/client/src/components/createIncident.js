import React, { Component } from "react";
//import { Router } from 'react-router';
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import 'rc-datetime-picker/dist/picker.css';
import NavbarApp from "./navbar.component";
import { Button } from "react-bootstrap";

export default class CreateIncident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            location: "",
            description: "",
            moment: moment(),
            timeDate: "",
            buttonName: "Create incident"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location)
        if (this.props.location) {
            if (this.props.location.state) {
                if (this.props.location.state.incident && this.props.location.state.incident.name) {
                    this.setState({ title: this.props.location.state.incident.name });
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

    handleSubmit(event) {
        event.preventDefault();
        console.log("The details are submitted!!!!");
        console.log(this.state);
        this.props.history.push('/incidentsList');
        //window.location = '/incidentsList';
    }

    render() {
        return (
            <div>
                <NavbarApp />
                <div className="signup form-wrapper">
                    <h2>{this.state.buttonName}</h2>
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
                        <div className="createAccount mt20">
                            <Button name={this.state.buttonName}
                                bssize="large" type="submit">{this.state.buttonName}</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}