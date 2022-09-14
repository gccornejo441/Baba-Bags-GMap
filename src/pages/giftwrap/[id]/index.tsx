
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
    const [infoBoxData, setInfoBoxData] = React.useState<InfoBox>({ city: "", state: "" })
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const router = useRouter()

    console.log("dddddddddddddddddd: ", router.query)

    const { data, error } = useSWR(
        router.query.id ? `/api/giftwrap/${router.query.id}` : null,
        fetcher
      )

    console.log("data: ", data)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>


    // Sets form data into Firestore
    // const onSubmit: SubmitHandler<Inputs> = (data) => {
    //     const { zipcode,
    //         giftwrap_id,
    //         memo } = data

    //     fetch('/api/giftwrap', {
    //         method: 'GET',
    //         body: JSON.stringify({
    //             zipcode,
    //             giftwrap_id,
    //             memo
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((res) => {
    //         if (res.ok) router.push({
    //             pathname: "/giftwrap/[id]/",
    //             query: { id: giftwrap_id }
    //         })
    //     })
    // }

    // Updates Geolocation with coodinates
    const GetCoordinates = async () => {
        //This colleection is static will need to up dynamic in production
        const giftWrapCol = createCollection<Inputs>('gcornejo441')
        const giftWrapDocs = await getDocs(giftWrapCol)
        giftWrapDocs.docs.forEach((giftWrapDoc) => {
            const giftwrap = giftWrapDoc.data()
            // Updates GeoLocation State

            setInfoBoxData({ city: giftwrap.city, state: giftwrap.state })
            setGeoLocation((value) => [...value, { lat: giftwrap.coordinates.lat, lng: giftwrap.coordinates.lng }])
        })
    }

    return (
        <div>
            <div className="py-12 bg-white text-black">
                <Link href="/">
                    <Button variant="gradient">Back Home</Button>
                </Link>
                 <div>YOUR GIFTWRAP ID IS: {data.name}</div>
                {/* <GMap
                    geoLocation={geoLocation}
                    infoBoxData={infoBoxData}
                /> */}
            </div>
        </div>
    );
}

export default Giftwrap;
