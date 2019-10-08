import React, { Component } from "react";
import "../static/css/submitReport.css"
import { Button } from "react-bootstrap";
export default class submitReport extends Component
{
    constructor()
    {
        super();
        this.state={
            timeofIncident:"",
            location:"",
            Description:"",
            IncidentType:""
         };
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    render()
    {
        return(
            <div className="submitReport">
                <div className="ReportTitle">
                    <label>Title of Report:</label>
                    <input type="text" placeholder="Title of Report"/>
                </div>
                <div>
                    <label>Date and Time of Incident:</label><br/>
                    <input type="datetime-local" name="timeofIncident" />
                </div>
                <div>
                    <label name="location">Location:</label>
                    <input type="text" name="location" placeholder="Location of Incident"/>
                </div> 
                <div>
                    <label name="Description:">Description:</label>
                    <textarea className="Description">{this.state.Description}</textarea>
                </div> 
                <label>Type of Incident:</label>
                <input type="text" name="IncidentType" placeholder="IncidentType" />
                <label>
                 Level of Impact:
                <select>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select>
                </label><br/>
                <label>Structural Damage:</label>
                <input type="text" name="StructuralDamage" placeholder="StructuralDamage" />
                Level of Impact:
                <select>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select><br/>
                <aside>
                    <table>
                        <th colSpan="2">Casualities:</th>
                        <tr>
                            <td>Red:</td>
                            <td><input type="number" name="Red" placeholder="Enter the count"/></td>
                        </tr>
                        <tr>
                            <td>Yellow:</td>
                            <td><input type="number" name="Yellow" placeholder="Enter the count"/></td>
                        </tr>
                        <tr>
                            <td>Green:</td>
                            <td><input type="number" name="Green" placeholder="Enter the count"/></td>
                        </tr>
                        <tr>
                            <td>Black:</td>
                            <td><input type="number" name="Black" placeholder="Enter the count"/></td>
                        </tr>
                    </table>
                </aside>
                <label>Hazmat Type:</label>
                <input type="text" name="HazmatType" placeholder="HazmatType" />
                <label name="Notes:">Notes:</label>
                    <textarea className="Notes"/><br/>
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*"/><br/>
                <Button type="submit" name="Submit Report">
                    Submit Report
                </Button>
            </div>
        );
    }
}