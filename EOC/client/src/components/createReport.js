import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import 'rc-datetime-picker/dist/picker.css';
import moment from "moment";

export default class submitReport extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            timeDate: "",
            location: "",
            description: "",
            typeofIncident: "",
            impactLevel: "",
            structuralDamageImpact: "",
            red: "",
            green: "",
            yellow: "",
            black: "",
            hazmatType: "",
            moment: moment(),
            buttonName: "Submit Report",
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeMoment = (moment) => {
        this.setState({
            moment
        });
        this.setState({
            timeDate: this.state.moment.format("MM-DD-YYYY HH:mm")
        });
    }
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        //console.log(target.name)
        this.setState({
            [name]: value
        });
    }
    createReport(){
        var data = {
            title: this.state.title,
            timeDate: this.state.timeDate,
            location: this.state.location,
            description: this.state.description,
            typeofIncident: this.state.typeofIncident,
            impactLevel: this.state.impactLevel,
            structuralDamageImpact: this.state.structuralDamageImpact,
            red: this.state.red,
            green: this.state.green,
            yellow: this.state.yellow,
            black: this.state.black,
            hazmatType: this.state.hazmatType
        }
        //axios
            .post('/api/report/createReport', data)
            .then(response =>{
                if(response.status == 200){
                    this.props.history.push('/reportsList');
                }else{
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
        handleSubmit(event) {
            event.preventDefault();
            console.log(this.state.buttonName)
            if(this.state.buttonName=="Submit report"){
                console.log(this.state);
                this.createReport();
            }        
            //window.location = '/incidentsList';
        }

    render() {
        return (
            <div>
                <NavbarApp />
                <div className="signup form-wrapper">
                    <h2>Create Report</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="inputBox width70">
                            <label htmlFor="title">Title of Report:</label>
                            <input
                                type="text"
                                placeholder="Title of the report"
                                name="title"
                                value={this.state.Title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="description">Report date and time</label>
                            <DatetimePickerTrigger
                                moment={this.state.moment}
                                onChange={this.handleChangeMoment}>
                                <input className="width100"
                                    type="text"
                                    placeholder="Enter date and time"
                                    value={this.state.timeDate}
                                    onChange={this.handleChange}
                                />
                            </DatetimePickerTrigger>
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width100">
                            <label htmlFor="description">Description</label>
                            <textarea
                                placeholder="Description"
                                name="description"
                                value={this.state.Location}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="typeofIncident">Type of incident</label>
                            <input type="text"
                                placeholder="Type of incident"
                                name="typeofIncident"
                                value={this.state.typeofIncident}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="impactLevel">Level of Impact</label>
                                <select name="impactLevel" value={this.state.impactLevel} 
                                    onChange={this.handleChange}
                                    placeholder="Select impact level">  
                                    <option value="">Select impact level</option>                                  
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            
                        </div>
                        <div className="inputBox width70">
                            <label htmlFor="structuralDamageImpact">Level of Impact(Structural Damage)</label>
                                <select name="structuralDamageImpact" value={this.state.structuralDamageImpact} 
                                    onChange={this.handleChange}
                                    placeholder="Select impact level">  
                                    <option value="">Select impact level</option>                                  
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            
                        </div>
                        <div className="inputBox width70">
                            <table>
                            <tbody><tr><th colSpan="2">Casualities:</th></tr>
                               
                                <tr>
                                    <td>Red:</td>
                                    <td><input type="number" name="red" 
                                            placeholder="Enter the count"
                                            value={this.state.red} 
                                            onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>Yellow:</td>
                                    <td><input type="number" name="yellow"
                                         placeholder="Enter the count"
                                         value={this.state.yellow} 
                                         onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>Green:</td>
                                    <td><input type="number" name="green" 
                                        placeholder="Enter the count"
                                        value={this.state.green} 
                                        onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>Black:</td>
                                    <td><input type="number" name="black" 
                                        placeholder="Enter the count" 
                                        value={this.state.black} 
                                        onChange={this.handleChange}/></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="inputBox width70">
                        <label htmlFor="hazmatType">Hazmat Type:</label>
                        <input
                                type="text"
                                placeholder="Hazmat type"
                                name="hazmatType"
                                value={this.state.hazmatType}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="inputBox width70">
                        <label htmlFor="notes">Notes:</label>
                        <textarea 
                        placeholder="Notes"
                        name="notes"
                        value={this.state.notes}
                        onChange={this.handleChange}/>
                        </div>
                        <div className="inputBox width70">
                        <label>Upload Image</label>
                        <input type="file" name="image" accept="image/*" />
                        </div>
                        <div className="createAccount mt20">
                            <Button name={this.state.buttonName}
                                bssize="large" type="submit">{this.state.buttonName}</Button>
                                
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}