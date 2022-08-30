import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import * as React from 'react';
import Geocode from "react-geocode";

// We will use these things from the lib
import {
    GoogleMap,
    Marker,
    InfoWindow,
    Polyline,
    useLoadScript,
    PolylineF
} from "@react-google-maps/api";


const googM = process.env.GOOGLEAPI!;

const containerStyle = {
    height: "70vh",
    width: "100%"
};


const GMap = ({ ...props }) => {
    const [center, setCenter] = React.useState({ lat: 44.076613, lng: -98.362239833 });
    const [zoom, setZoom] = React.useState(5);

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: googM
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        map.setZoom(zoom)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
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
        paths: [{ center }],
        zIndex: 1
    };

    const flightPlanCoordinates = [
        { lat: 39.09366509575983, lng: -94.58751660204751 },
        { ...center }
    ];

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>


                <PolylineF
                    path={flightPlanCoordinates}
                    options={options}
                />

            </>
        </GoogleMap>
    ) : <></>
}


export default GMap;