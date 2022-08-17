import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import * as React from 'react';
import Geocode from "react-geocode";

// We will use these things from the lib
import { GoogleMap, useLoadScript } from '@react-google-maps/api';



const containerStyle = {
    width: '400px',
    height: '400px'
};

interface IOption {
    options: any[]
}


const GMap = ({ ...props }) => {
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC3VCDaWLypkC2vOX_P4J4v-IvhuxadC2k"
    })

    const [mapRef, setMapRef] = React.useState(null);
    const [map, setMap] = React.useState(null)
    
    const [selectedPlace, setSelectedPlace] = React.useState(null);
    const [zip, setZip] = React.useState("")
    const [zoom, setZoom] = React.useState(5)
    const [infoOpen, setInfoOpen] = React.useState(false); 
    const [clickedLatLng, setClickedLatLng] = React.useState(null);
    const [markerMap, setMarkerMap] = React.useState({});
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 33.87545706670063,
        lng: -117.56669469076199,
    });


    // Get latitude & longitude from address.
    Geocode.fromAddress(props.geoAddress).then(
        (response: any) => {
            const { lat, lng } = response.results[0].geometry.location;
        },
        (error: Error) => {
            console.error(error);
        }
    );
 
    // The places I want to create markers for.
    // This could be a data-driven prop.
    const myPlaces = [
        { id: "place1", pos: { lat: 39.09366509575983, lng: -94.58751660204751 } },
        { id: "place2", pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
        { id: "place3", pos: { lat: 39.07602397235644, lng: -94.5184089401211 } }
    ];


    const options = {
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER // ,
            // ...otherOptions
        }
    }
    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            options={
                options
            }
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}


export default GMap;
