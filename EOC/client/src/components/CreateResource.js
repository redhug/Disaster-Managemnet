import React from "react";
import { Button } from "react-bootstrap";
import NavbarApp from "./navbar.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import axios from "axios";

export default class createResource extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      typeOfResource: "",
      subtype: "",
      resourceName: "",
      contactnumber: "",
      email: "",
      address: "",
      zip:"",
      county:"",
      city:"",
      state:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}    

handleChange(e) {
  let target = e.target;
  let value = target.value;
  let name = target.name;
  this.setState({
    [name]: value
  });
}

createResource(){
  var data = {
    typeOfResource: this.state.typeOfResource,
    subtype: this.state.subtype,
    resourceName: this.state.resourceName,
    contactnumber: this.state.contactnumber,
    email: this.state.email,
    address: this.state.address,
    zip: this.state.zip,
    county: this.state.county,
    city: this.state.city,
    state: this.state.state
  }
  axios.post('/api/resource/createResource', data)
      .then(response =>{
        if(response.status == 200){
            this.props.history.push('/resources');
        }else{
            console.log(response)
        }
    })
      .catch(error => {
          console.log(error)
      })
}

onSubmit = e =>{
    e.preventDefault();
    console.log(this.state);
    this.createResource();
};

  render() {
    return (
    <div>
      <NavbarApp />
      <div className="signup form-wrapper">
        <h2 align="center">Create Resource</h2>   
      <form onSubmit={this.onSubmit}>        
      <div class="inputBox width70">
        <label for="typeOfResource">Type of Resource</label>
           <select name="typeOfResource" value={this.state.typeOfResource} 
                                    onChange={this.handleChange}
                                    placeholder="Select resource type">  
                                    <option value="">Select resource type</option>                                  
                                    <option value="EMS">EMS</option>
                                    <option value="Fire">Fire</option>
                                    <option value="Hazmat">Hazmat</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Others">Others</option>
            </select>
      </div> 
      <div class="inputBox width70">
        <label for="subtype">Sub-type</label>
        <input type="text"
                
                 name="subtype"
                 id="subtype"
                 placeholder="Sub type"
                 value={this.state.subtype}
                 onChange={this.handleChange}
            />
      </div>
      <div class="inputBox width70 ">
          <label for="resourceName">Resource Name</label>
          <input type="text"                
                 name="resourceName"
                 placeholder="Resource name"
                 value={this.state.resourceName}
                 onChange={this.handleChange}
            />
          </div>
            <div class="inputBox width70 ">
          <label for="contactnumber">Contact Number</label>
          <input type="number"
                class="contactnoInput"
                 name="contactnumber"
                 id="contactnumber"
                 placeholder="Contact Number"
                 value={this.state.contactnumber}
                 onChange={this.handleChange}
            />
        </div> 
        <div class="inputBox width70 ">
          <label for="email">Email-id</label>
          <input type="text"
                
                 name="email"
                 id="email"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={this.handleChange}
            />
          </div>  
        <div class="inputBox width70">
        <label for="address">Address</label>
        <input type="text"
               
               name="address"
               id="address"
               placeholder="Address"
               value={this.state.address} 
               onChange={this.handleChange}
        />
        </div>
      <div class="inputBox">
        <label for="city">City</label>
          <input type="text"
             
                 name="city"
                 id="city"
                 placeholder="City"
                 value={this.state.city}
                 onChange={this.handleChange}
          />
      </div> 
      <div class="inputBox col-md-6">
        <label for="county">County</label>
          <input type="text"
                
                 name ="county"
                 placeholder="County"
                 value={this.state.county} 
                 onChange={this.handleChange}
          />
      </div>
        <div class="inputBox">
          <label for="zip">Zip code</label>
            <input type ="text"
                 
                   name="zip"
                   placeholder="Zip"
                   value={this.state.zip} 
                   onChange={this.handleChange}
            />
        </div>
        <div class="inputBox col-md-6">
          <label for="state">State</label>
          <input type="text"                 
                 name="state" 
                 placeholder="State"
                 value={this.state.state} 
                 onChange={this.handleChange}
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