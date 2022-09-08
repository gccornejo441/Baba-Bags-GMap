import * as React from 'react';
import { MAP_SETTINGS } from '@/gmapDefaults';

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
    const [center, setCenter] = React.useState(props.geoLocation[0])
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

    console.log("...props.geoLocation, ", ...props.geoLocation)

    const giftwrapCoordinates = [
        ...props.geoLocation
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
            center={MAP_SETTINGS.DEFAULT_CENTER}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <>
            <MarkerF
                    position={MAP_SETTINGS.DEFAULT_CENTER}
            onRightClick={onMarkerRightClick}
            icon={image}
            />
                <PolylineF
                path={giftwrapCoordinates}
                options={options}
                />
                
            </>
        </GoogleMap>
    ) : <></>
}


export default GMap;
