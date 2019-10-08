import React, { Component } from "react";
//import { Router } from 'react-router';
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import 'rc-datetime-picker/dist/picker.css';
import NavbarApp from "./navbar.component";
import { Button } from "react-bootstrap";

export default class CreateIncident extends Component {
  constructor(props) {
    super();
    this.state = {
      title: " ",
      date: " ",
      time: " ",
      location: " ",
      description: " ",
      moment: moment(),
      timeDate:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    window.location = '/incidentsList';
  }

  render() {
    return (
        <div>
            <NavbarApp />
        <div className="signup form-wrapper">
          <h2>Create Incident</h2>
          <form onSubmit={this.handleSubmit}>
          <div className="inputBox width70">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="Title"
                placeholder="Title of the incident"
                name="title"
                value={this.state.Title}
                onChange={this.handleChange}
              />
            </div>           
            <div className="inputBox width70">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="Location"
                placeholder="Location"
                name="location"
                value={this.state.Location}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox width70">
            <label htmlFor="description">Incident date and time</label>
              <DatetimePickerTrigger
                moment={this.state.moment}
                onChange={this.handleChangeMoment}>
                <input className="width100"
                  type="text"
                  value={this.state.timeDate}
                />
              </DatetimePickerTrigger>
            </div>
            <div className="inputBox width100">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="Description"
                placeholder="Description"
                name="description"
                value={this.state.Description}
                onChange={this.handleChange}
              />
            </div>         
            <div className="createAccount mt20">
                <Button 
                bssize="large" type="submit">Create Incident</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}