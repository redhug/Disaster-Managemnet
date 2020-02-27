import { Map, GoogleApiWrapper, Marker,InfoWindow  } from 'google-maps-react';
import React, { Component } from 'react';
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import InfoWindowEx from "./InfoWindowEx";
import flame from "../static/images/flame.png";
import water from "../static/images/water.png";
import building from "../static/images/bulding.png";
import nature from "../static/images/nature.png";
import other from "../static/images/other.png";
Geocode.setApiKey("AIzaSyCATXtlwC2jaheZMq9--yLW7JIvzfrKtKo");
class MapsComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            reportList: [],
            currentLoc : {lat: 0,
                          lng: 0},
            showInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            report:{},
            total:0
        };
        this.getReports = this.getReports.bind(this);
        this.iconSelection = this.iconSelection.bind(this);
    }
    

    async componentDidMount() {      
        await this.getReports(this.props.incidentId);
        await this.getGeoLocation();  
        await this.setLocation(); 
    }
    async getReports(incidentId){
        await axios.get(`/api/report/getReports?incidentId=${this.props.incidentId}`)
        .then(response => {
            this.setState({ reportList: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
     }
     
    getGeoLocation = async () => {
        if (navigator && navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
            async (position) => {
              await this.setState({
                currentLoc:{
                            lat: position.coords.latitude,
                            lng: position.coords.longitude}
              })
            }
          )
        } 
      }
    async setLocation() {
        let  reportListLoc  = [...this.state.reportList];
        for(let i=0;i <reportListLoc.length;i++)
        {
            let report = reportListLoc[i]
            if(report.lat == 0 && report.lng==0){
                if(report.address){
                    await Geocode.fromAddress(report.address).then(
                        response => {
                            //console.log(response);
                            if (response.status == "OK") {
                                reportListLoc[i].lat=response.results[0].geometry.location.lat
                                reportListLoc[i].lng=response.results[0].geometry.location.lng
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
            }
          }
        }
        this.setState({ reportList : reportListLoc })
    }
    onMarkerClick = (props, marker) =>{
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
      report: this.state.reportList[marker.id],
      total:(this.state.reportList[marker.id].casualities.red+this.state.reportList[marker.id].casualities.yellow+this.state.reportList[marker.id].casualities.green+this.state.reportList[marker.id].casualities.black) 
    });
    }

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
    onMapClicked = () => {
        if (this.state.showingInfoWindow)
          this.setState({
            activeMarker: null,
            showingInfoWindow: false
          });
      };
    showDetails = () => {
        this.props.history.push(
            {pathname: '/viewReport',state: { report: this.state.report}})
        console.log(this.state.report);
      };
    iconSelection = (report) =>{
        if(report.typeOfIncident == 'fire'){
            return flame
        }
        else if(report.typeOfIncident == 'water'){
            return water
        }
        else if(report.typeOfIncident == 'collapse'){
            return building
        }
        else if(report.typeOfIncident == 'nature'){
            return nature
        }
        else{
            return other
        }
    }
    
    displayMarkers() {
        //console.log(this.state.lat)
        const showInfoWindow  = this.state.showInfoWindow;
        return this.state.reportList.map((report, index) => {
            let iconMarker = new window.google.maps.MarkerImage(
                this.iconSelection(report),
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new window.google.maps.Size(32, 32)
            );
            return <Marker key={index} id={index} position={{
             lat: report.lat,
             lng: report.lng
           }} icon={iconMarker} title="hello"
                onClick={this.onMarkerClick}
             // onClick={() => this.props.history.push({pathname: '/viewReport',data:report})}
            >
             {/* {showInfoWindow && (
                   <InfoWindow onCloseClick={() => this.handleMouseExit}><div>Hello</div></InfoWindow>
                )}           */}
            </Marker>            
          })
    }
    render() {
        return (
            <Map onMouseOver={this.handleMouseOver}
                google={this.props.google}
                zoom={8}
                onClick={this.onMapClicked}
                center={{ lat: this.state.currentLoc.lat, lng: this.state.currentLoc.lng }}
            >
                {this.displayMarkers()}
                {/* <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}>
                    <div> 
                    <button
                    onClick={() => console.log('Testing')}>
                      Testing</button>
                       Testing
                       
                    </div></InfoWindow> */}
                    <InfoWindowEx
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose}>
                        <div>
                        {this.state.report &&
                        <div>
                        <h4>{this.state.report.title}</h4>
                        <h6>Casualities:</h6>
                        {this.state.report.casualities &&
                        <table>
                            <tbody>
                            <tr>
                                <td>Red</td>
                                <td>{this.state.report.casualities.red}</td>
                            </tr>
                            <tr>
                                <td>Green</td>
                                <td>{this.state.report.casualities.green}</td>
                            </tr>
                            <tr>
                                <td>Yellow</td>
                                <td> {this.state.report.casualities.yellow}</td>
                            </tr>
                            <tr>
                                <td>Black</td>
                                <td>{this.state.report.casualities.black}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>
                                    {this.state.total}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        }
                        </div>
                        }
                        <br></br>
                        <button
                            type="button"
                            onClick={this.showDetails}
                        >
                            Show details
                        </button>
                        
                        </div>
          </InfoWindowEx>
            </Map>

        );
    }
}
const mapStyles = {
    width: '100%',
    height: '100%',
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCATXtlwC2jaheZMq9--yLW7JIvzfrKtKo'
})(MapsComponent);