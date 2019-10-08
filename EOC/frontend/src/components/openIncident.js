import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../static/css/openIncident.css";
import NavbarApp from "./navbar.component"

export default class openIncident extends Component {
    constructor(props) {
        console.log(props.location.data);
        super();
        this.state = {
            incident: props.location.data,
            //incident: this.props.data,
            timeofIncident: "April 17th, 2013 08:55 PM",
            location: "West Fertilizer Co.,1471 Jerry Mashek Drive,West, Texas, U.S",
            Description: "On April 17th, 2013, the West Fertilizer Company, a plant housing anhydrous ammonia gas and an unreported stockpile of ammonium nitrate blew up, killing 15 people (including 12 first-responders who had never been trained to fight fires at a plant full of chemicals used in fertilizer production) and injuring hundreds of residents. The blast destroyed dozens of homes and a middle school. Registering as a magnitude 2.1 earthquake on U.S. Geological Survey seismographs, the explosion was likened by West's mayor to the detonation of a nuclear bomb. "
        };
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
                    <p>{this.state.Description}</p>
                </div>
                <div className="buttons">
                    <Button type="submit" name="edit">
                        Edit incident
                    </Button>
                    <Button type="submit" name="Assign" className="ml2" >
                        Assign
                    </Button>
                    <Button type="submit" className="ml2" name="viewReports">
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
