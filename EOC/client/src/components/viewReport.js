import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component";
import { Link } from "react-router-dom";

export default class ViewReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incident: props.location.data,
            //incident: this.props.data,
            titleOfReport: "Bus Collision",
            reportDateTime:"10-21-2019 13:30",
            location: "West Fertilizer Co.,1471 Jerry Mashek Drive,West, Texas, U.S",
            description: "On October 21st, 2019, a bus collided with a truck, killing 15 people (including 12 first-responders who had never been trained to fight fires at a plant full of chemicals used in fertilizer production) and injuring hundreds of residents. The blast destroyed dozens of homes and a middle school. Registering as a magnitude 2.1 earthquake on U.S. Geological Survey seismographs, the explosion was likened by West's mayor to the detonation of a nuclear bomb. ",
            typeOfincident: "Accident",
            levelOfImpact: "High",
            levelOfStrDmg: "Low",
            casRed: "2",
            casYellow: "3",
            casGreen: "5",
            casBlack: "1",
            hazType: "Disaster",
            notes: "A bus collided with a Truck leading 15 deaths"

        };
       // this.routeChange = this.routeChange.bind(this);
    }
    
    
    
    render() {
        return (
            <div>
            <NavbarApp />
            <div className="container mt20">
                <div >
                    <h2>Sample report</h2>
                    <h5>Title of the Report:</h5>
                    <span >{this.state.titleOfReport}</span>
                </div>
                <div className="mt20">
                    <h5>Report Date and Time:</h5>
                    <span >{this.state.reportDateTime}</span>
                </div>
                <div className="mt20">
                    <h5>Location:</h5>
                    <span >{this.state.location}</span>
                </div>
                <div className="mt20">
                    <h5>Description:</h5>
                    <p>{this.state.description}</p>
                </div>
                <div className="mt20">
                    <h5>Type of Incident:</h5>
                    <p>{this.state.typeOfincident}</p>
                </div>
                <div className="mt20">
                    <h5>Level of Impact:</h5>
                    <p>{this.state.levelOfImpact}</p>
                </div>
                <div className="mt20">
                    <h5>Level of Structural Damage:</h5>
                    <p>{this.state.levelOfStrDmg}</p>
                </div>
                <div className="mt20">
                    <h5>Red:</h5>
                    <p>{this.state.casRed}</p>
                </div>
                <div className="mt20">
                    <h5>Yellow:</h5>
                    <p>{this.state.casYellow}</p>
                </div>
                <div className="mt20">
                    <h5>Green:</h5>
                    <p>{this.state.casGreen}</p>
                </div>
                <div className="mt20">
                    <h5>Black:</h5>
                    <p>{this.state.casBlack}</p>
                </div>
                <div className="mt20">
                    <h5>Hazmat Type:</h5>
                    <p>{this.state.hazType}</p>
                </div>
                <div className="mt20">
                    <h5>Notes:</h5>
                    <p>{this.state.notes}</p>
                </div>
                {/* <div className="text-center">
                    <Button name="edit" onClick={()=>this.props.history.push(
                                                {pathname: '/createIncident',
                                                state:this.state})}>
                        Edit incident
                    </Button>
                    <Button type="submit" name="Assign" className="ml2" >
                        Assign
                    </Button>
                    <Button type="submit" className="ml2" name="viewReports" 
                        onClick={this.routeChange}>
                        View Reports
                    </Button>
                </div> */}
        </div>   
            </div>         
        );
    }
}
