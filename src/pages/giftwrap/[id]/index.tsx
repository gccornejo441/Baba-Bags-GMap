
import { useForm, SubmitHandler } from "react-hook-form";
import { getDocs, setDoc, doc } from 'firebase/firestore';
import { createCollection } from '../../../../firebaseConfig';
import Geocode from "react-geocode";
import GMap from '../../../../components/GMap'
import * as React from 'react';
import { withRouter, useRouter } from 'next/router'
import { Inputs, InfoBox } from '@/types'
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import useSWR from 'swr'


interface IGeolocation {
    lat: number,
    lng: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Giftwrap() {
    const [geoLocation, setGeoLocation] = React.useState<IGeolocation[]>([{ lat: 41.88, lng: -87.63 }]);
    const [infoBoxData, setInfoBoxData] = React.useState<InfoBox>({ zipcode: "" })
    const router = useRouter()

    const { data, error } = useSWR(
        router.query.id ? `/api/giftwrap/${router.query.id}` : null,
        fetcher
    )

    // React.useEffect(() => {
    //     if (data.mapData) {
    //         const { giftwrap_id, zipcode, memo, coordinates } = data.mapData
    
    //         setGeoLocation((value) => [...value, { lat: coordinates.lat, lng: coordinates.lng }])
    //         setInfoBoxData({ zipcode: zipcode })
    //     }

    // }, [])

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log("data: ", data)

    return (
        <div>
            <div className="py-12 bg-white text-black">
                <Link href="/">
                    <Button variant="gradient">Back Home</Button>
                </Link>
                <GMap
                    mapData={data.mapData}
                />
            </div>
        </div>
    );
}

export default Giftwrap;
