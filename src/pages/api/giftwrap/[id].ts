import { Inputs } from '@/types'
import { doc, setDoc, getDocs, collection } from '@firebase/firestore'
import { createCollection, database } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import Geocode from "react-geocode";

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, name },
        method,
    } = req



    if (method == 'GET') {
        const giftWrapCol = createCollection<Inputs>(`${id}`)
        const getGiftWrapDocs = await getDocs(giftWrapCol)

        // Updates Geolocation with coodinates
        const getMapData = () => {

            let name = ""

            getGiftWrapDocs.docs.forEach((giftWrapDoc) => {
                const giftwrap = giftWrapDoc.data()
                const { giftwrap_id, zipcode, memo, coordinates } = giftwrap
                console.log('YOU WANT TO GET DATA?', giftwrap)
                name = giftwrap_id
                
                // setInfoBoxData({ giftwrap_id, zipcode, memo, coordinates })
                // setGeoLocation((value) => [...value, { lat: giftwrap.coordinates.lat, lng: giftwrap.coordinates.lng }])
            })
            return name
        }

        res.status(200).json({ id, name: getMapData() })
    }


}