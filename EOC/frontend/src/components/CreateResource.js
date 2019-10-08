import React from "react";
import { Button } from "react-bootstrap";
import "../static/css/CreateResource.css";
import NavbarApp from "./navbar.component"

export default class Form extends React.Component {
  state = {
    typeOfResource: "",
    resourceName: "",
    location: "",
    address: "",
    zip:"",
    county:"",
    state:","
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  constructor(props){
    super(props);
    this.state={type:'', label: ''}
}      
handleChange = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    let value = e.target.value;
    this.setState({ type: value, label: label});
}

onSubmit = e =>{
    e.preventDefault();
    console.log(this.state);
};

  render() {
    return (
     <div><NavbarApp />
     
<h1 align="center">Create Resource</h1>
      <form align="center">
      <div className="inputBox width70">
          <label>Type Of Resource :  
                <select>
                     <option value='0'>EMS</option>
                     <option value='0'>Fire</option>
                     <option value='1'>Hazmat</option> 
                     <option value='2'>Utilities</option>
                     <option value='3'>Person</option>
                    </select>
        </label>
        </div> 
        <br/>
        <div className="inputBox width70">
        <label>
            Resource Name : 
        <select>
                     <option value='0'>Ambulance</option>
                     <option value='0'>Air Ambulance</option>
                     <option value='1'>Resouce Tank</option> 
                     <option value='2'>Field aid station</option>
                    </select>
        </label>
        </div>
        <br />
        <div className="inputBox width70">
        <label>
            Location :  
        <input
          name="location"
          placeholder="Location"
          value={this.state.location}
          onChange={e => this.change(e)}
        />
        </label>
        </div> 
        <br />
        <div className="inputBox width70">
        <label> Address : 
        <input
          name="address"
          placeholder="Address Line 1"
          value={this.state.description} 
          onChange={e => this.change(e)}
        />
          <input
          name="address"
          placeholder="Address Line 2"
          value={this.state.description} 
          onChange={e => this.change(e)}
        />
        <br />
        </label>
        </div> 
        <br />
        <div className="inputBox width70">
        <label>
          County :
          <input 
          name ="county"
          placeholder="Enter County name"
          value={this.state.description} 
          onChange={e => this.change(e)}
        />
        </label>
        </div> 
        <br />
        <div className="inputBox width70">
        <label>
          Zip :
          <input 
          name ="zip"
          placeholder="Enter Zip code"
          value={this.state.description} 
          onChange={e => this.change(e)}
        />
        </label>
        </div> 
        <br />
        <div className="inputBox width70">
        <label>
          State :
          <input 
          name ="state"
          placeholder="Enter state"
          value={this.state.description} 
          onChange={e => this.change(e)}
        />
        </label>
        </div> 
        <br />
        <Button onClick={e => this.onSubmit(e)}>Create</Button>
      </form>
      </div> 
    );
  }
}