import React, { Component } from 'react'
import NavbarApp from "./navbar.component"
import { Button } from "react-bootstrap";
import "../static/css/Resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
         reources: [
            { id: 1, type: 'EMS', name: 'Ambulance', status: 'Available', address: 'Maryville' },
            { id: 2, type: 'EMS', name: 'Air Ambulance', status: 'Staged', address: 'Maryville'},
            { id: 3, type: 'EMS', name: 'Resource Truck', status: 'Assigned', address: 'Maryville'},
            { id: 4, type: 'EMS', name: 'Field Aid Station', status: 'Rehabilitating', address: 'Maryville'}
         ]
      }
   }

   renderTableData() {
    return this.state.reources.map((reources, index) => {
       const { id, type, name, status,address } = reources 
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{type}</td>
             <td>{name}</td>
             <td>{status}</td>
             <td>{address}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
  let header = Object.keys(this.state.reources[0])
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
            <table id='reources'>
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


