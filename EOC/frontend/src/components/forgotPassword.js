import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    FormGroup,
    FormControl,
    FormLabel,
    Button
} from "react-bootstrap";
import "../static/css/ResetPassword.css";
import NavBarLogin from "./navBarLogin"


export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            email: "",
            password: "",
            codeSent: false,
            confirmed: false,
            confirmPassword: "",
            isConfirming: false,
            isSendingCode: false
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

        this.setState({ isSendingCode: true });
        console.log('Code Sending');
    };

    render() {
        return (
            <div>
                  <NavBarLogin/>
         
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
                    </FormGroup>

                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        ResetPassword
                    </Button>
                </form>
            </div>
            </div>
        );
    }
}