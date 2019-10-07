import React, { Component } from "react";
import "../static/css/Signup.css";
import NavBarLogin from "./navBarLogin"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Signup extends Component {

  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
      contactno: "",
      certificationsCheck: "",
      certifications: ""
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValueChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleChange(event) {
    this.setState({
      certificationsCheck: event.target.value
    });
  }
  renderCertifications() {
    if (this.state.certificationsCheck == "true") {
      return (
        <div className="inputBox width100">
        <label htmlFor="certifications">Enter your certifications</label>
        <textarea name="certifications" value={this.state.certifications} onChange={this.handleValueChange} />
      </div>
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("The form was submitted!!");
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <NavBarLogin />
        <div className="signup form-wrapper">
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="inputBox width50">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleValueChange}
              />
            </div>
            <div className="inputBox width50 ml2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleValueChange}
              />
            </div>
            <div className="inputBox email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleValueChange}
              />
            </div>

            <div className="inputBox contactno">
              <label htmlFor="contactno">Contact number</label>
              <input
                type="number"
                className="contactnoInput"
                placeholder="Enter contact number"
                name="contactno"
                value={this.state.contactno}
                onChange={this.handleValueChange}
              />
            </div>
            <div className="inputBox width50">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleValueChange}
              />
            </div>
            <div className="inputBox width50 ml2">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="password"
                placeholder="Password"
                name="confirmpassword"
                value={this.state.confirmpassword}
                onChange={this.handleValueChange}
              />
            </div>
            <div>
              <label htmlFor="certificationCheck">
                Do you have any certifications in Medical field</label>
              <div  classname="inputBox">
                <input type="radio" name="certificationCheck"
                  checked={this.state.certificationsCheck === "true"}
                  onChange={this.handleChange}
                 
                  value="true"
                />Yes
                <input type="radio" name="certificationCheck"
                  onChange={this.handleChange}
                  value="false"
                  checked={this.state.certificationsCheck === "false"}
                  className="ml2"
                />No
              </div>
            </div>
            {this.renderCertifications()}
            <div className="createAccount mt20">
              <Button 
                bssize="large">Create Account</Button>
              <Link to="/login" variant="body2">
                      Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

