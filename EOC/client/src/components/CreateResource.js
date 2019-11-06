import React from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';

export default class Form extends React.Component {
  state = {
    typeOfResource: "",
    resourceName: "",
    location: "",
    contactnumber: "",
    email: "",
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
    <div>
      <NavbarApp />
      <div className="signup form-wrapper">
        <h2 align="center">Create Resource</h2>   
      <form>        
      <div class="inputBox width70">
        <label for="typeofresource">Type of Resource</label>
          <select class="form-control" id="typeofresource">
                      <option value='0'>EMS</option>
                     <option value='0'>Fire</option>
                     <option value='1'>Hazmat</option> 
                     <option value='2'>Utilities</option>
                     <option value='3'>Person</option>
           </select>
      </div> 
      <div class="inputBox width70">
        <label for="resourcename">Resource Name</label>
            <select class="form-control" id="resourcename">
                     <option value='0'>Ambulance</option>
                     <option value='0'>Air Ambulance</option>
                     <option value='1'>Resouce Tank</option> 
                     <option value='2'>Field aid station</option>
            </select>
      </div>
        <div class="form-group width70 ">
          <label for="location">Location</label>
          <input type="text"
                class="form-control"
                 name="location"
                 placeholder="Location"
                 value={this.state.location}
                 onChange={e => this.change(e)}
            />
          </div>
            <div class="form-group width70 ">
          <label for="contactnumber">Contact Number</label>
          <input type="number"
                class="form-control"
                 name="contactnumber"
                 placeholder="Contact Number"
                 value={this.state.location}
                 onChange={e => this.change(e)}
            />
        </div> 
        <div class="form-group width70 ">
          <label for="email">Email-id</label>
          <input type="text"
                class="form-control"
                 name="email"
                 placeholder="email"
                 value={this.state.location}
                 onChange={e => this.change(e)}
            />
          </div>  
        <div class="form-group">
        <label for="address">Address</label>
        <input type="text"
               class="form-control"
               name="address"
               placeholder="Address Line 1"
               value={this.state.description} 
               onChange={e => this.change(e)}
        />
        </div>
        <div class="form-group col-md-6">
        <label for="address">Address 2</label>
          <input type="text"
                 class="form-control"
                 name="address"
                 placeholder="Address Line 2"
                 value={this.state.description} 
                 onChange={e => this.change(e)}
        />
      </div>
      <div class="form-group ">
        <label for="city">City</label>
          <input type="text"
                 class="form-control"
                 name="City"
                 placeholder="City"
                 value={this.state.location}
                 onChange={e => this.change(e)}
          />
      </div> 
      <div class="form-group col-md-6">
        <label for="county">County</label>
          <input type="text"
                 class="form-control"
                 name ="county"
                 placeholder="County"
                 value={this.state.description} 
                 onChange={e => this.change(e)}
          />
      </div>
        <div class="form-group ">
          <label for="zip">Zip code</label>
            <input type ="text"
                   class="form-control"
                   name="Zip"
                   placeholder="Zip"
                   value={this.state.description} 
                   onChange={e => this.change(e)}
            />
        </div>
        <div class="form-group col-md-6">
          <label for="state">State</label>
          <input type="text" 
                 class="form-control" 
                 name="State" 
                 placeholder="State"
                 value={this.state.description} 
                 onChange={e => this.change(e)}
          />
          <div className="create mt20">
              <Button 
                bssize="large" type="submit">Create Resource</Button>
          </div>
        </div>
      </form>
    </div> 
    </div>
    );
  }
}


//ReactDOM.render(<Select />, document.getElementById('appp'));