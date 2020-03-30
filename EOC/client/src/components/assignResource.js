import React, { Component } from "react";
import NavbarApp from "./navbar.component";
import "../static/css/Resources.css";
import { Button } from "react-bootstrap";
import axios from "axios";

export default class assignResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      rtype: "Fire",
      selectedResources: []
    };
    this.getResourcesList();
    this.handleChange = this.handleChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getResourcesList() {
    await axios.get('/api/resource/getAvailableResources')
      .then(response => {
        this.setState({ resources: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  handleChecked(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      this.setState({
        selectedResources: this.state.selectedResources.concat(item)
      })
    }
    else {
      var array = [...this.state.selectedResources];
      var index = array.indexOf(item)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ selectedResources: array });
      }
    }
  }
  renderTableData() {
    return this.state.resources.map((resource, index) => {
      if (this.state.rtype == resource.typeOfResource) {
        const { _id, subtype, resourceName, status, address, contactnumber, email } = resource
        return (
          <tr key={_id}>
            <input type="checkbox" name={_id} checked={this.state.selectedResources.indexOf(_id) > -1} onChange={this.handleChecked} />
            <td>{status}</td>
            <td>{subtype}</td>
            <td>{resourceName}</td>
            <td>{address}</td>
            <td>{contactnumber}</td>
            <td>{email}</td>
          </tr>
        );
      }
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
  renderTableHeader() {
    let header = (this.state.resources.length > 0) ? Object.keys(this.state.resources[0]) : []
    return header.map((key, index) => {
      if (key.toUpperCase() != "CITY" &&
        key.toUpperCase() != "COUNTY" &&
        key.toUpperCase() != "__V" &&
        key.toUpperCase() != "STATE" &&
        key.toUpperCase() != "ZIP" &&
        key.toUpperCase() != "TYPEOFRESOURCE" &&
        key.toUpperCase() != "_ID" &&
        key.toUpperCase() != "STATE") {
        return <th key={index}>{key.toUpperCase()}</th>
      }
    })
  }
  handleSubmit() {
    console.log(this.props.location.state.id)
    var data = {
      incidentId: this.props.location.state.id,
      resources: this.state.selectedResources
    }
    axios
      .post('/api/incident/assignResourceToIncident', data)
      .then(response => {
        if (response.status == 200) {
          console.log(response)
        } else {
          console.log(response)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <NavbarApp />
        <div className="container">
          <div className="mt20">
            <h3 className="float-left">Assign Resources</h3>
            <div className="float-right mb10">
              <select
                name="rtype"
                className="browser-default custom-select"
                value={this.state.rtype}
                placeholder="Select status"
                onChange={this.handleChange}
              >
                <option value="EMS">EMS</option>
                <option value="Fire">Fire</option>
                <option value="Hazmat">Hazmat</option>
                <option value="Utilities">Utilities</option>
                <option value="Person">Person</option>
              </select>
            </div>
          </div>
          <div className="table-wrapper-scroll-y clearfix">
            <table id="resources">
              <tbody>
                <tr>
                  <th>SELECT</th>
                  {this.renderTableHeader()}
                </tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
          <Button className="mt20" onClick={this.handleSubmit}>Assign</Button>
        </div>
      </div>
    );
  }
}
