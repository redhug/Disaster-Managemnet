import React, { Component } from "react";
import NavbarApp from "./navbar.component";

export default class profile extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
        firstName:"Pavan kumar reddy",
        lastName:"byreddy",
        email:"pavan@gmail.com",
        contactNo:"6605380989",
        medicalCertification:"hi ",
        enforcementOfficer:false
        };
        //this.handleEvent=this.handleEvent.bind(this);
    }
    render()
    {
        return(
            <div>
            <NavbarApp />
            <h5 style={{padding: "20px"}}>User Details:</h5>  
                <div style={{marginLeft: "2%"}}>
                    <h6 style={{marginBottom:"2rem"}}>First Name: {this.state.firstName}</h6>
                    <h6 style={{marginBottom:"2rem"}}>Last Name:  {this.state.lastName} </h6>
                    <h6 style={{marginBottom:"2rem"}}>Contact Number: {this.state.contactNo}</h6>
                    <h6 style={{marginBottom:"2rem"}}>Medical Certifications: {this.state.medicalCertification ? this.state.medicalCertification :"No medical certifications"}</h6>
                    <h6 style={{marginBottom:"2rem"}}>Enforcement Officer:{this.state.enforcementOfficer?"enforcementOfficer: 6605380989":"Not an enforcementOfficer"}</h6>
                </div>  
                <div style={{textAlign:"center"}}>
                    <h6 style={{paddingTop: "10rem"}}>If you find any information present above is wrong. kindly reach out to below email id requesting necessary modifications.</h6>
                    <email><b><u>gdpproject@gmail.com</u></b></email>
                </div>
            </div> 
        )
    }
}