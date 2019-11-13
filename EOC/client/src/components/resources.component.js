import React, { Component } from 'react'
import NavbarApp from "./navbar.component"
import { Button } from "react-bootstrap";
import "../static/css/Resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Resources extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
         resources: [
            { id: 1, type: 'Ambulance', name: 'Mosaic Ambulance', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com' },
            { id: 2, type: 'Air Ambulance', name: 'Nodway county', status: 'Staged', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
            { id: 3, type: 'Resource Truck', name: 'Military ', status: 'Assigned', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
            { id: 4, type: 'Field Aid Station', name: 'Nodaway', status: 'Rehabilitating', address: 'Maryville', contact: '123456789', email: 'sample@test.com'}
         ]
      }
   }

   renderTableData() {
    return this.state.resources.map((resources, index) => {
       const { id, type, name, status,address, contact,email } = resources 
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{type}</td>
             <td>{name}</td>
             <td>{status}</td>
             <td>{address}</td>
             <td>{contact}</td>
             <td>{email}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
  let header = Object.keys(this.state.resources[0])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
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
                  <select class="form-control" id="typeofresource">
                      <option value='0'>EMS</option>
                     <option value='0'>Fire</option>
                     <option value='1'>Hazmat</option> 
                     <option value='2'>Utilities</option>
                     <option value='3'>Person</option>
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


