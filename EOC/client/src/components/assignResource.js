import React, { Component } from 'react';
import NavbarApp from './navbar.component'
import "../static/css/Resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default class assignResource extends Component{
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
                 <input type='checkbox'></input>
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
    render()
    {
        return (
        
        <div>
            <NavbarApp />
             <div style={{margin:"1%"}}>
                <h2 style={{textAlign:"left"}}>Assign Resource</h2>
                <div className="float-right">
                <h6>Type of Resource</h6>
                  <select class="form-control" id="typeofresource">
                      <option value='0'>EMS</option>
                     <option value='0'>Fire</option>
                     <option value='1'>Hazmat</option> 
                     <option value='2'>Utilities</option>
                     <option value='3'>Person</option>
                  </select>
                  </div>  
            <table  id='resources'>
            <tbody>
                  <tr>
                    <th>SELECT</th>
                      {this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
                <Button style={{margin:'5%'}}>Assign</Button>
            </div>   
        </div>
       );
}

}
    
    