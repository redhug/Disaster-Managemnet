import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../static/css/openIncident.css"

export default class openIncident extends Component
{
    constructor()
    {
        super();
        this.state={
            timeofIncident:"April 17th, 2013 08:55 PM",
            location:"West Fertilizer Co.,1471 Jerry Mashek Drive,West, Texas, U.S",
            Description:"On April 17th, 2013, the West Fertilizer Company, a plant housing anhydrous ammonia gas and an unreported stockpile of ammonium nitrate blew up, killing 15 people (including 12 first-responders who had never been trained to fight fires at a plant full of chemicals used in fertilizer production) and injuring hundreds of residents. The blast destroyed dozens of homes and a middle school. Registering as a magnitude 2.1 earthquake on U.S. Geological Survey seismographs, the explosion was likened by West's mayor to the detonation of a nuclear bomb. "
         };
    }
    render()
    {
        return(
            <div className="openIncident">
                <div className="timeofIncident">
                    <label name="timeofIncident">Time of Incident:</label>
                    <p>{this.state.timeofIncident}</p>
                </div>
                <div className="location">
                    <label name="location">Location:</label>
                    <p>{this.state.location}</p>
                </div> 
                <div className="Description">
                    <label name="Description:">Description:</label>
                    <p>{this.state.Description}</p>
                </div> 
                <div className="buttons">
                <Button type="submit" name="Close">
                    Close
                </Button>
                <Button type="submit" name="Modify">
                    Modify
                </Button>
                <Button type="submit" name="Assign">
                    Assign
                </Button>
                <Button type="submit" name="Submit Report">
                    Submit Report
                </Button>
                </div>
            </div>
        );
    }



}
