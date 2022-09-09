import GMap from "components/GMap";
import { useForm, SubmitHandler } from "react-hook-form";
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { database, createCollection } from '../../firebaseConfig';
import Geocode from "react-geocode";
import GMap from '../../components/GMap'
import * as React from 'react';

import { Inputs } from '../../src/types'

interface IGeolocation {
    lat: number,
    lng: number
}

const dbInstance = collection(database, 'baba-gift-wraps');
Geocode.setApiKey(process.env.GOOGLEAPI);


export default function Giftwrap() {
    const [geoLocation, setGeoLocation] = React.useState<IGeolocation[]>([{ lat: 39, lng: -90 }]);
    let [point, setPoints] = React.useState(1)
    const [giftwrapID, setGiftwrapID] = React.useState("")

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    // Updates Geolocation with coodinates
    const GetCoordinates = async () => {
        const giftWrapCol = createCollection<Inputs>('giftwrap')
        const giftWrapDocs = await getDocs(giftWrapCol)
        giftWrapDocs.docs.forEach((giftWrapDoc) => {
            const giftwrap = giftWrapDoc.data()

            console.log('COODINATE: ', giftwrap)
            // Updates GeoLocation State
            setGeoLocation((value) => [...value, { lat: giftwrap.coordinates.lat, lng: giftwrap.coordinates.lng }])
        })
    }

    // Sets form data into Firestore
    const SetGiftWrap = async (value: Inputs, lat: number, lng: number) => {
        // Incrementing value for document numberization
        point++;
        setPoints(point)

        const giftWrapCol = createCollection<Inputs>(value.giftwrap_id)
        const giftWrapDocs = doc(giftWrapCol, `giftwrap_${point}`)

        await setDoc(giftWrapDocs, {
            giftwrap_id: value.giftwrap_id,
            city: value.city,
            state: value.state,
            memo: value.memo,
            coordinates: {
                lat: lat,
                lng: lng
            }
        }, { merge: false })
    }

    const insert = async ({ ...data }: Inputs) => {
        // Get latitude & longitude from address.
        Geocode.fromAddress(`${data.city}, ${data.state}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                SetGiftWrap(data, lat, lng)
            },
            (error) => {
                console.error(error);
            }
        );

        console.log("Data submitted to db.", data)
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        insert(data);
    };


    return (
        <div>
            <div className="py-12 bg-white text-black">
                <div className="mt-5 md:mt-0 md:col-span-2 mx-auto  w-1/2 flex justify-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="giftwrap id" className="block text-sm font-medium text-gray-700">GiftWrap ID</label>
                                        <input defaultValue="" {...register("giftwrap_id")} type="text" name="giftwrap_id" id="giftwrap_id" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input defaultValue="" {...register("city")} type="text" name="city" id="city" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                        <input defaultValue="" {...register("state")} type="text" name="state" id="state" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="memo" className="block text-sm font-medium text-gray-700">Memo</label>
                                        <input defaultValue="" {...register("memo")} type="text" name="memo" id="memo" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                <button onClick={GetCoordinates} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Report</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <GMap
                    geoLocation={geoLocation}
                /> */}
            </div>
        </div>
    );
}

