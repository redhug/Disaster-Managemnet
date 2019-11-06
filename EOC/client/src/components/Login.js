import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../static/css/Login.css";
import NavBarLogin from "./navBarLogin"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import FlashMessage from 'react-flash-message'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",      
      errors: {},
      renderMsg:false
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/incidentsList");
    }
    if(this.props.location) {
      if(this.props.location.data){
        this.setState({renderMsg:this.props.location.data});
      }
    }
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/incidentsList");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
         <NavBarLogin/>
      <div className="Login">
        <h3 className="text-center">Login</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsssize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
             <span className="text-danger">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className="text-danger">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
          </FormGroup>
          <Button
            block
            bssize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Link to="/forgotPassword" variant="body2">
                      Forgot password?
              </Link>
        </form>
      </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);