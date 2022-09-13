
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

interface IGeolocation {
    lat: number,
    lng: number
}

Geocode.setApiKey("AIzaSyB44B4NFC_nSRBMq8YcRtHX7xFgT5RnHWg");

function Giftwrap({ router }) {
    const [geoLocation, setGeoLocation] = React.useState<IGeolocation[]>([{ lat: 41.88, lng: -87.63 }]);
    const [infoBoxData, setInfoBoxData] = React.useState<InfoBox>({ city: "", state: "" })
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


    console.log("Giftwarp: ", router)

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


    const insert = async ({ ...data }: Inputs) => {
        // Get latitude & longitude from address.
        Geocode.fromAddress("").then(
            (response) => {
                console.log("Zipcode plsease: ", response.results[0].geometry.location)
                // const { lat, lng } = response.results[0].geometry.location;
                // SetGiftWrap(data, lat, lng)
            },
            (error) => {
                console.error(error);
            }
        );
    }

    return (
        <div>
            <div className="py-12 bg-white text-black">
                <Link href="/">
                <Button variant="gradient">Back Home</Button>
                </Link>
                {/* <GMap
                    geoLocation={geoLocation}
                    infoBoxData={infoBoxData}
                /> */}
            </div>
        </div>
    );
}

export default withRouter(Giftwrap)
