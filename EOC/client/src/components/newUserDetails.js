import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { store } from "react-notifications-component";

export default class NewUserDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userDetails: this.props.location.state,
      adminCheck: "false",
      rejectedReason: ""
    };
    this.rejectUserRequest = this.rejectUserRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.acceptUserRequest = this.acceptUserRequest.bind(this);
  }
  componentDidMount() {
    console.log(this.state.userDetails);
  }
  async acceptUserRequest() {
    var message = "";
    await axios
      .post("/api/auth/acceptUser", {
        params: {
          id: this.state.userDetails._id,
          isAdmin: this.state.adminCheck
        }
      })
      .then(response => {
        if (response.data.code == 200) {
          message = "User added !!!";
          this.props.history.push("/pendingRequests");
        } else {
          this.props.history.push("/pendingRequests");
          message = "User added !!!";
        }
      })
      .catch(error => {
        message = error;
      });
    console.log(message);
    store.addNotification({
      title: "Info",
      message: message,
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
  }
  async rejectUserRequest() {
    var message = "";
    await axios
      .post("/api/auth/rejectUser", {
        params: {
          id: this.state.userDetails._id,
          name:
            this.state.userDetails.firstName +
            " " +
            this.state.userDetails.lastName,
          email: this.state.userDetails.email,
          rejectedReason: this.state.rejectedReason
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.code == 200) {
          message = "User rejected";
          console.log(message);
          this.props.history.push("/pendingRequests");
        } else {
          message = "Something went wrong";
        }
      })
      .catch(error => {
        console.log(message);
        this.state.rejectedReason = "Something went wrong";
        message = error;
      });
    store.addNotification({
      title: message,
      message: this.state.rejectedReason,
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
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderIncidents() {
    return (
      <div className="signup mt20">
        <div>
          <h2>
            {this.state.userDetails.firstName} {this.state.userDetails.lastName}
          </h2>
        </div>
        <form>
          <div className="width100 mt20">
            <b>Email:</b> <label>{this.state.userDetails.email}</label>
          </div>
          <div className="width100 mt20">
            <b>Contact number:</b> {this.state.userDetails.contactNo}
          </div>
          <div className="width100 mt20">
            <b>Enrollment officer: </b>
            {this.state.userDetails.enforcementOfficer}
          </div>
          {this.state.userDetails.medicalCertification ? (
            <div className="width100 mt20">
              <b>Medical certifications:</b>
              <p>{this.state.userDetails.medicalCertification}</p>
            </div>
          ) : (
            <span />
          )}
          <div className="mt20">
            <b htmlFor="certificationCheck">
              Do you want to make this user as admin
            </b>
            <div className="mb10">
              <input
                type="radio"
                name="adminCheck"
                checked={this.state.adminCheck === "true"}
                onChange={this.handleChange}
                value="true"
              />
              Yes
              <input
                type="radio"
                name="adminCheck"
                onChange={this.handleChange}
                value="false"
                checked={this.state.adminCheck === "false"}
                className="ml2"
              />
              No
            </div>
          </div>
          <div className="inputBox width100">
            <label htmlFor="rejection">Reason if rejecting</label>
            <textarea
              name="rejectedReason"
              value={this.state.rejectedReason}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <div className="mt20 text-center">
          <Button name="accept" onClick={this.acceptUserRequest}>
            Accept
          </Button>
          <Button
            onClick={this.rejectUserRequest}
            name="reject"
            className="ml2"
          >
            Reject
          </Button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <NavbarApp />
        <div>{this.renderIncidents()}</div>
      </div>
    );
  }
}
