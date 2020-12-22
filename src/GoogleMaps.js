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
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            >

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAIkre_O9RtahXEtJ6-s_k2XbfneiVo8eI'
})(MapContainer);