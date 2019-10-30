import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button
} from "react-bootstrap";
import "../static/css/ResetPassword.css";
import NavBarLogin from "./navBarLogin"

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            confirmPassword: "",
            codeSent: false,
            confirmed: false,
            errors:""
        };
    }
    validateForm() {
        return this.state.password.length > 0 && this.state.confirmPassword.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSendCodeClick = async event => {
        event.preventDefault()
        if(this.state.password.length >6 && this.state.confirmPassword.length > 6){
        if (this.state.password == this.state.confirmPassword) {
            var data = {
                resetToken: this.props.match.params.token,
                password: this.state.password
            }
            axios
                .post('/api/auth/resetPassword', data)
                .then(response =>{
                    if(response.data.code == 200){
                        this.props.history.push("/Login");
                    }else{
                        this.setState({
                            errors: response.data.message
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            this.setState({
                errors: "Passwords should match"
            });
        }
    }
    else{
        this.setState({
            errors: "Password length should be more than 6 characters"
        });
    }
    };

    render() {
        return (
            <div>
                <NavBarLogin />

                <div className="signup form-wrapper">
                    <h2>Reset Password</h2>
                    <form className="center-align" onSubmit={this.handleSendCodeClick}>

                        <div className="inputBox width70">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type="password"
                                className="password"
                                placeholder="Password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        </div>

                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                            className="width70"
                        >
                            Send reset link
                    </Button>
                    <span className="text-danger">
                            {this.state.errors}
                    </span>
                    </form>
                </div>
            </div>
        );
    }
}