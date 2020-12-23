import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
    }
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 51.5287718, lng: -0.2416804 }}
            >
                {
                    // markers.map((elem) => {
                    //     return (
                    //         <Marker id={elem.id} position={{ lat: elem.coord.lat, lng: elem.lat.lng }} onClick={}/>
                    //     )
                    // })
                }
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAIkre_O9RtahXEtJ6-s_k2XbfneiVo8eI",
    language: "RU"
})(MapContainer);