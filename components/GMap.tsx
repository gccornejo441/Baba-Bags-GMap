import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import * as React from 'react';

const GMap = ({...props}) => {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [zip, setZip] = React.useState("")
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });


    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };



    const Staticform = () => {
        const [zip, setZip] = React.useState("")
        const [city, setCity] = React.useState("");
        const [city2, setCity2] = React.useState("");

        const getMap = (e: React.MouseEvent<HTMLButtonElement>): void => {
            e.preventDefault();

            const mapurl = `https://maps.googleapis.com/maps/api/staticmap?&size=600x600&maptype=&path=color:0xff0000ff|weight:5|${city}, CA|7C${city2}, CA&markers=size:mid%7Ccolor:red%7C${city}, CA%7C${city2}, CA&key=AIzaSyC3VCDaWLypkC2vOX_P4J4v-IvhuxadC2k`

            const map = document.getElementById('map') as HTMLImageElement || null

            if (map != null) {
                map.src = mapurl
            }
        }


        return (
            <div
                style={{
                    padding: "1rem",
                    flexBasis: "250px",
                    height: "100%",
                    overflow: "auto",
                }}
            >
                <label htmlFor="zip">City</label>
                <input
                    type="string"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(event) => setCity(String(event.target.value))}
                />
                <br />
                <label htmlFor="zoom">City 2</label>
                <input
                    type="string"
                    id="city2"
                    name="city2"
                    value={city2}
                    onChange={(event) => setCity2(String(event.target.value))}
                />
                <br />
                <label htmlFor="zoom">Zoom</label>
                <input
                    type="number"
                    id="zoom"
                    name="zoom"
                    value={zoom}
                    onChange={(event) => setZoom(Number(event.target.value))}
                />
                <br />
                <button className='border-2 border-red-500' onClick={getMap}>Get Map</button>
            </div>
        )
    }


    return (
        <div className="h-[100vh]">
            <Staticform />
            <br />
            <div className='border-2 border-black'>
                <div className='border-2 border-blue-500 w-1/2 h-1/3'>
                    <img className='h-full' id="map" />
                </div>
            </div>
        </div>
    );
}


interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
}

const Map = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
}: MapProps) => {

    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}))
        }
    }, [ref, map])

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);


    // React.useEffect(() => {
    //     if (map) {
    //         const polyline = new window.google.maps.Polyline({
    //             path: [
    //                 new google.maps.LatLng(28.613939, 77.209021),
    //                 new google.maps.LatLng(51.507351, -0.127758),
    //                 new google.maps.LatLng(40.712784, -74.005941),
    //                 new google.maps.LatLng(28.213545, 94.868713)
    //             ],

    //             strokeColor: "#000FFF",
    //             strokeOpacity: 0.6,
    //             strokeWeight: 2,
    //         })

    //         polyline.setMap(map)
    //     }

    // }, [map, options])

    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    )
}


const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);


    React.useEffect(() => {
        if (marker) {
            marker.getPosition()
        }
    }, [marker])

    const bubble = '<div style="width:125px; height:auto; overflow:hidden !important;">' + " to<br /> " + "</div> ";

    React.useEffect(() => {
        if (marker) {
            const infowindow = new window.google.maps.InfoWindow({
                content: bubble,

            });
            marker.setOptions(options);

            marker.addListener("click", () => {
                infowindow.open({
                    anchor: marker,
                    shouldFocus: false
                });
            });
        }
    }, [marker, options]);

    return null;
}




const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any, meta?: undefined) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}


export default GMap;
