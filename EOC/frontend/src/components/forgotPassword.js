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
            email: "",
            password: "",
            errors: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSendCodeClick = async event => {
        event.preventDefault();
        event.preventDefault()
        axios
            .post('/api/auth/forgotPassword', { email: this.state.email })
            .then(response => {
                if (response.data.code == 200) {
                    this.props.history.push("/Login");
                } else {
                    this.setState({
                        errors: response.data.message
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        return (
            <div>
                <NavBarLogin />

                <div className="ResetPassword container">
                    <form onSubmit={this.handleSendCodeClick}>
                        <FormLabel> <h4>Forgot password ?</h4> </FormLabel>
                        <FormLabel>Enter your email id to receive reset password link </FormLabel>
                        <FormGroup bssize="large" controlId="email">

                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                         <span className="text-danger">
                            {this.state.errors}
                        </span>
                        </FormGroup>                       
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Send reset link
                    </Button>
                    </form>
                </div>
            </div>
        );
    }
}