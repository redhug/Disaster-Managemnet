import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCATXtlwC2jaheZMq9--yLW7JIvzfrKtKo");
class MapsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0
        };
    }
    componentDidMount() {
        //this.setLocation(); 
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Position -> ', position);
            },
            (error) => console.log(error),
            { enableHighAccuracy: false, timeout: 50000 }
        );
        ///console.log(navigator.geolocation)   
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                console.log('coords');
                console.log(coords);
                this.setState({
                    lat: coords.latitude,
                    lng: coords.longitude
                });
            });
        }

    }
    async setLocation() {
        await Geocode.fromAddress("1115 North College Drive, Maryville, Mo").then(
            response => {
                //   const address = response.results[0].formatted_address;
                //console.log(response);
                if (response.status == "OK") {
                    this.setState({
                        lat: response.results[0].geometry.location.lat,
                        lng: response.results[0].geometry.location.lng
                    });
                }
                //console.log(response.results[0].geometry.location);
            },
            error => {
                console.error(error);
            }
        );
    }
    displayMarkers() {
        //console.log(this.state.lat)
        let iconMarker = new window.google.maps.MarkerImage(
            "https://github.com/redhug/Disaster-Managemnet/blob/master/EOC/client/src/static/images/flame.png?raw=true",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32)
        );
        return (
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }}
            icon={iconMarker} />

        )
    }
    render() {
        return (

            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 40.3558256, lng: -94.88271220000001 }}
            >
                {this.displayMarkers()}
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