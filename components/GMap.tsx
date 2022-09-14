import * as React from 'react';
import { MAP_SETTINGS } from '@/gmapDefaults';

// We will use these things from the lib
import {
    GoogleMap,
    InfoWindowF,
    useLoadScript,
    PolylineF,
    MarkerF
} from "@react-google-maps/api";
import { IGeolocation, InfoBox } from '@/types';


const containerStyle = {
    height: "70vh",
    width: "100%"
};


const divStyle = {
    background: `white`,
    padding: 15
}

const GMap = ({ ...props }) => {
    const [center, setCenter] = React.useState(props.geoLocation[0])
    const [zoom, setZoom] = React.useState(5);
    const [geoLocation, setGeoLocation] = React.useState<IGeolocation[]>([{ lat: 41.88, lng: -87.63 }]);
    const [infoBoxData, setInfoBoxData] = React.useState<InfoBox>({ zipcode: "" })

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
        strokeOpacity: 1,
        strokeWeight: 5,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        geodesic: true,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 50000,
        paths: [{ center }],
        zIndex: 1
    };


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
                {giftwrapCoordinates.map((item, index) => {
                    return (
                        <>
                            {index == 0 ?
                                (<>
                                </>) : (
                                    <InfoWindowF
                                        position={{ lat: item.lat, lng: item.lng }}
                                    >
                                        <div style={divStyle}>
                                            <h1>{`${props.infoBoxData.zipcode}`}</h1>
                                        </div>
                                    </InfoWindowF>
                                )}
                        </>
                    )
                })}
                <PolylineF
                    path={giftwrapCoordinates}
                    options={options}
                />

            </>
        </GoogleMap>
    ) : <></>
}


export default GMap;
