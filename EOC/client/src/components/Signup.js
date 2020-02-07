import React, { Component } from "react";
import "../static/css/Signup.css";
import NavBarLogin from "./navBarLogin"
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Signup extends Component {

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
      certifications: "",
      legalBadge: "",
      errors: {}
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/incidentsList");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
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
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.confirmpassword,
      contactNo: this.state.contactno,
      medicalCertification: this.state.certifications,
      enforcementOfficer: this.state.legalBadge
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
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
                className={classnames("", {
                  invalid: errors.firstName
                })}
              />
              <span className="text-danger">{errors.firstName}</span>
            </div>
            <div className="inputBox width50 ml2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleValueChange}
                className={classnames("", {
                  invalid: errors.lastName
                })}
              />
              <span className="text-danger">{errors.lastName}</span>
            </div>
            <div className="inputBox width70">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleValueChange}
                className={classnames("", {
                  invalid: errors.email
                })}
              />
              <span className="text-danger">{errors.email}</span>
            </div>

            <div className="inputBox width70">
              <label htmlFor="contactno">Contact number</label>
              <input
                type="number"
                className="contactnoInput"
                placeholder="Enter contact number"
                name="contactno"
                value={this.state.contactno}
                onChange={this.handleValueChange}
                className={classnames("contactnoInput", {
                  invalid: errors.contactNo
                })}
              />
              <span className="text-danger">{errors.contactNo}</span>
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
                className={classnames("", {
                  invalid: errors.password
                })}
              />
              <span className="text-danger">{errors.password}</span>
              <label style={{'font-size': '0.75em'}}>Password must include: <p>English alphabet uppercase letter (A-Z)
                                        <div>English alphabet lowercase letter (a-z)</div>
                                       <div>Decimal digit number (0-9)</div> 
                                        Special characters</p>
                </label>
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
                className={classnames("", {
                  invalid: errors.password2
                })}
              />
              <span className="text-danger">{errors.password2}</span>
            </div>
            <div>
              <label htmlFor="certificationCheck">
                Do you have any certifications in Medical field</label>
              <div className="mb10">
                <input type="radio" name="certificationsCheck"
                  checked={this.state.certificationsCheck === "true"}
                  onChange={this.handleChange}                 
                  value="true"  
                />Yes
                <input type="radio" name="certificationsCheck"
                  onChange={this.handleChange}
                  value="false"
                  checked={this.state.certificationsCheck === "false"}
                  className="ml2"
                />No
              </div>
            </div>
            {this.renderCertifications()}
            <div>
              <label htmlFor="legalBadge">
                Are you a law enforcement officer ?</label>
              <div className="mb10">
                <input type="radio" name="legalBadge"
                  checked={this.state.legalBadge === "true"}
                  onChange={this.handleChange}
                  
                  value="true"
                  className={classnames("", {
                    invalid: errors.enforcementOfficer
                  })}
                />Yes
                <input type="radio" name="legalBadge"
                  onChange={this.handleChange}
                  value="false"
                  checked={this.state.legalBadge === "false"}
                  className="ml2"
                />No
                <div>
                 <span className="text-danger">{errors.enforcementOfficer}</span>
                 </div>
              </div>
             
            </div>
            <div className="createAccount mt20">
              <Button 
                bssize="large" type="submit">Create Account</Button>
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

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));