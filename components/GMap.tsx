import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import * as React from 'react';
import Geocode from "react-geocode";

// We will use these things from the lib
import {
    GoogleMap,
    InfoWindow,
    Polyline,
    useLoadScript,
    PolylineF,
    MarkerF
} from "@react-google-maps/api";


const googM = `${process.env.GOOGLEAPI}`

const containerStyle = {
    height: "70vh",
    width: "100%"
};


const GMap = ({ ...props }) => {
    const [center, setCenter] = React.useState({ lat: 41 , lng: -88 });
    const [zoom, setZoom] = React.useState(5);
    
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB44B4NFC_nSRBMq8YcRtHX7xFgT5RnHWg"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        map.setZoom(zoom)
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
        paths: [{center}],
        zIndex: 1
    };

    const flightPlanCoordinates = [
        {...center}, {...props.coordinates[0]}
    ];

    // This will handle the right click events on the initial marker.
    const onMarkerRightClick = () => {
        alert("This is the initialization point for Baba Gift Bag: `S4D56F4SD`")
    }

    const image = "bbStick.png";

    return isLoaded ? (
        <GoogleMap
            zoom={zoom}
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>
            <MarkerF
            position={center}
            onRightClick={onMarkerRightClick}
            icon={image}
            />
                <PolylineF
                path={flightPlanCoordinates}
                options={options}
                />
                
            </>
        </GoogleMap>
    ) : <></>
}


export default GMap;
