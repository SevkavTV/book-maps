import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends React.Component {
    render(){
        return(
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 51.5287718, lng: -0.2416804 }}
            >

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAIkre_O9RtahXEtJ6-s_k2XbfneiVo8eI",
    language: "RU"
  })(MapContainer);