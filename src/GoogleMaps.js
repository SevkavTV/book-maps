import React from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';


const mapStyles = {
    width: '80%',
    height: '100%',
};

export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const books = []

        const markers_obj = this.props.markers

        for (let key in markers_obj) {
            books.push(
                <Marker key={key} id={key} position={{ lat: markers_obj[key].lat, lng: markers_obj[key].lng }} onClick={this.props.onMarkerClick} />
            )
        }
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 51.5287718, lng: -0.2416804 }}
                onClick={this.onMapClicked}
            >
                {books}  
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAIkre_O9RtahXEtJ6-s_k2XbfneiVo8eI",
    language: "RU"
})(MapContainer);