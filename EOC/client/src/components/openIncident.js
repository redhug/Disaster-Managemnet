import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component";
import { Link } from "react-router-dom";

export default class openIncident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incident: props.location.data,
            //incident: this.props.data,
            timeofIncident: "10-21-2019 13:30",
            btnName:"update",
            location: "West Fertilizer Co.,1471 Jerry Mashek Drive,West, Texas, U.S",
            description: "On April 17th, 2013, the West Fertilizer Company, a plant housing anhydrous ammonia gas and an unreported stockpile of ammonium nitrate blew up, killing 15 people (including 12 first-responders who had never been trained to fight fires at a plant full of chemicals used in fertilizer production) and injuring hundreds of residents. The blast destroyed dozens of homes and a middle school. Registering as a magnitude 2.1 earthquake on U.S. Geological Survey seismographs, the explosion was likened by West's mayor to the detonation of a nuclear bomb. "
        };
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange(){
        this.props.history.push(
                    {pathname: '/viewReports',
                    state:this.state});
        //window.location = '/createIncident'
    }
    
    renderIncidents() {
        //console.log()
        if (this.state.incident) {
          return (
            <div className="container mt20">
                <div className="timeofIncident">
                    <h2>{this.state.incident.name}</h2>
                    <h5>Time of Incident:</h5>
                    <span >{this.state.timeofIncident}</span>
                </div>
                <div className="location mt20">
                    <h5>Location:</h5>
                    <span >{this.state.location}</span>
                </div>
                <div className="Description mt20">
                    <h5>Description:</h5>
                    <p>{this.state.description}</p>
                </div>
                <div className="text-center">
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
                </div>
            
        </div>
          );
        }
        else{
            return(
                  <div> No incidents
                 </div>  
            );
        }
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
