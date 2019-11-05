import React, { Component } from 'react'
import NavbarApp from "./navbar.component"
import { Button } from "react-bootstrap";
import "../static/css/Resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
         resources: [
            { id: 1, name: 'Ambulance', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com' },
            { id: 2, name: 'Air Ambulance', status: 'Staged', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
            { id: 3, name: 'Resource Truck', status: 'Assigned', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
            { id: 4, name: 'Field Aid Station', status: 'Rehabilitating', address: 'Maryville', contact: '123456789', email: 'sample@test.com'}
         ]
      }
   }

   renderTableData() {
    return this.state.resources.map((resources, index) => {
       const { id, type, name, status,address, contact,email } = resources 
       return (
          <tr key={id}>
             <td>{id}</td>
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
           <div>
            <h1 id='title'>Resources Status</h1>
           <form>
           <div class="inputBox width50" >
              <label for="typeofresource">Type of Resource</label>
                  <select class="form-control" id="typeofresource">
                      <option value='0'>EMS</option>
                     <option value='0'>Fire</option>
                     <option value='1'>Hazmat</option> 
                     <option value='2'>Utilities</option>
                     <option value='3'>Person</option>
                  </select>
              </div> 
              </form>
            <table id='resources'>
            <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
            </div>
            <div className="create mt20">
              <Button 
                bssize="large" type="submit">Create New Resource</Button>
          </div>
         </div>
         
      );
   }
}

export default Table 


