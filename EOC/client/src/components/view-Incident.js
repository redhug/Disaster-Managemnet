import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component";
import moment from "moment";
import { Link } from "react-router-dom";

export default class viewIncident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidentName: "",
            //incident: this.props.data,
            timeofIncident: "",
            btnName:"update",
            location: "",
            description: "",
            incidentId: 0,
            status:""
        };
        this.routeChange = this.routeChange.bind(this);
    }
    componentDidMount() {
       console.log(this.props.location.state.status)
        if (this.props.location) {
            if (this.props.location.state) {
                if (this.props.location.state.incidentName) {
                    this.setState({ incidentName: this.props.location.state.incidentName });
                }
                if (this.props.location.state.incidentId) {
                    this.setState({ incidentId: this.props.location.state.incidentId });
                }
                if (this.props.location.state.address) {
                    this.setState({ location: this.props.location.state.address });
                }
                if (this.props.location.state.dateAndTime) {                    
                    console.log(this.props.location.state.dateAndTime)
                    var date = moment(this.props.location.state.dateAndTime);
                    this.setState({ timeofIncident: date.format("MM-DD-YYYY HH:mm") });
                }
                if (this.props.location.state.description) {
                    this.setState({ description: this.props.location.state.description });
                }
                if(this.props.location.state.status){
                    this.setState({ status: this.props.location.state.status });
                }
            }
        }
    }
    routeChange(){
        this.props.history.push(
                    {pathname: '/viewReports',
                    state:this.state});
        //window.location = '/createIncident'
    }
    
    renderIncidents() {
        //console.log()
        if (this.state.incidentName) {
          return (
            <div className="container mt20">
                <div className="timeofIncident">
                    <h2>{this.state.incidentName}</h2>
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
                   {(this.state.status != 'closed') ?
                   <span className="pull-left">
                    <Button name="edit" onClick={()=>this.props.history.push(
                                                {pathname: '/createIncident',
                                                state:this.state})}>
                        Edit incident
                    </Button>
                    <Button type="submit" name="Assign" className="ml2" >
                        Assign
                    </Button></span>: <div></div>}
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
