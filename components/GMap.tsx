import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import * as React from 'react';
import Geocode from "react-geocode";

// We will use these things from the lib
import {
    useLoadScript,
    GoogleMap,
    Marker,
    InfoWindow,
    Polyline,
} from "@react-google-maps/api";

const GMap = ({ ...props }) => {
    const [mapRef, setMapRef] = React.useState(null);
    const [selectedPlace, setSelectedPlace] = React.useState(null);
    const [zip, setZip] = React.useState("")
    const [zoom, setZoom] = React.useState(5)
    const [infoOpen, setInfoOpen] = React.useState(false); 
    const [clickedLatLng, setClickedLatLng] = React.useState(null);
    const [markerMap, setMarkerMap] = React.useState({});
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyC3VCDaWLypkC2vOX_P4J4v-IvhuxadC2k"
    })

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

    // Iterate myPlaces to size, center, and zoom map to contain all markers
    const fitBounds = map => {
        const bounds = new window.google.maps.LatLngBounds();
        myPlaces.map(place => {
            bounds.extend(place.pos);
            return place.id;
        });
        map.fitBounds(bounds);
    };

    const loadHandler = map => {
        // Store a reference to the google map instance in state
        setMapRef(map);
        // Fit map bounds to contain all markers
        fitBounds(map);
    };

    // We have to create a mapping of our places to actual Marker objects
    const markerLoadHandler = (marker, place) => {
        return setMarkerMap(prevState => {
            return { ...prevState, [place.id]: marker };
        });
    };

    const markerClickHandler = (event, place) => {
        // Remember which place was clicked
        setSelectedPlace(place);

        // Required so clicking a 2nd marker works as expected
        if (infoOpen) {
            setInfoOpen(false);
        }

        setInfoOpen(true);
        // If you want to zoom in a little on marker click
        if (zoom < 13) {
            setZoom(13);
        }

        // if you want to center the selected Marker
        // setCenter(place.pos)
    };

    return (
        <div className="h-[100vh]">
            <GoogleMap
                onLoad={loadHandler}
                center={center}
                zoom={zoom}
                mapContainerStyle={{
                    height: "70vh",
                    width: "100%"
                }}
            >
                
            </GoogleMap>
        </div>
    );
}


export default GMap;
