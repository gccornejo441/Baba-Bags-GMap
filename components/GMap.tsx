import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import * as React from 'react';
import Geocode from "react-geocode";

// We will use these things from the lib
import {
    GoogleMap,
    MarkerF,
    InfoWindow,
    Polyline,
    useLoadScript,
    PolylineF
} from "@react-google-maps/api";


const googM = `${process.env.GOOGLEAPI}`

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 37.772, lng: -122.214
};

Geocode.setApiKey(googM);
// Get address from latitude & longitude.
Geocode.fromLatLng({...center}).then(
    (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    (error) => {
        console.error(error);
    }
)

const GMap = ({ ...props }) => {
    
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: googM!
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 }
        ],
        zIndex: 1
    };

    const flightPlanCoordinates = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 },
    ];

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>
                <MarkerF  position={center} />
                <PolylineF
                path={flightPlanCoordinates}
                options={options}
                />
                
            </>
        </GoogleMap>
    ) : <></>
}


export default GMap;
