import React, { Component } from 'react'
import NavbarApp from "./navbar.component"
import { Button } from "react-bootstrap";
import "../static/css/Resources.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class Resources extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
         resources: [],
         restype: "EMS"
      }
      this.handleChange = this.handleChange.bind(this);
      this.getResourcesList = this.getResourcesList.bind(this);
   }
   componentDidMount(){
      this.getResourcesList(this.state.restype)
   }

   renderTableData() {
    return this.state.resources.map((resources, index) => {
       const { typeOfResource, resourceName, status,address, contactnumber,email } = resources 
       return (
          <tr >
             <td>{status}</td>
             <td>{typeOfResource}</td>
             <td>{resourceName}</td>
             <td>{address}</td>
             <td>{contactnumber}</td>
             <td>{email}</td>
          </tr>
       )
    })
 }
 async getResourcesList(type){
   await axios.get('/api/resource/getResources',
   {
       params: {
         typeOfResource: type
       }
   })
   .then(response => {
       console.log(response.data)
       this.setState({ resources: response.data })
   })
   .catch((error) => {
       console.log(error);
   })
}
 handleChange(e) {
   let target = e.target;
   let value = target.value;
   let name = target.name;
   //console.log(target.name)
   this.setState({
     [name]: value
   });
   this.getResourcesList(value);
 }
 renderTableHeader() {
  let header = (this.state.resources.length>0)?Object.keys(this.state.resources[0]):[]
  return header.map((key, index) => {
     if(key.toUpperCase()!="CITY" &&  
        key.toUpperCase()!="COUNTY" &&
        key.toUpperCase()!="__V" &&
        key.toUpperCase()!="STATE" &&
        key.toUpperCase()!="ZIP" &&
        key.toUpperCase()!="SUBTYPE" &&
        key.toUpperCase()!="_ID" &&
        key.toUpperCase()!="STATE"){
      return <th key={index}>{key.toUpperCase()}</th>
     }
  })
}
   render() { 
      return (
         <div>
                 <NavbarApp />
           <div class="App width100 height100">
              <div class="row mt20">
                 <div class="col-md-10">

                 <div >            
                 <h1 id='title' className="float-left">Resources</h1>    
                 <div className="float-right mb10">
              <h6>Type of Resource</h6>
                  <select
              name="restype"
              className="form-control"
              value={this.state.restype}
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

            <table id='resources'>
            <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
            </div>
            <div className="col-md-2 border-left">
              <Button className="btn btn-secondary align-middle"
                bssize="large" type="submit" onClick={()=>this.props.history.push(
                  {pathname: '/createresource'})}>Create New Resource</Button>
          </div>
          </div>
          </div>         
         </div>
         
      );
   }
}

export default Resources 


