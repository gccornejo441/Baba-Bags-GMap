import { Inputs } from '@/types'
import { getDocs } from '@firebase/firestore'
import { createCollection } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, mapData },
        method,
    } = req


    if (method == 'GET') {
        const giftWrapCol = createCollection<Inputs>(`${id}`)
        const getGiftWrapDocs = await getDocs(giftWrapCol)


        // returns values
        let giftwrapValues = {}

        // Get Google map data.
        const getMapData = () => {
            getGiftWrapDocs.docs.forEach((giftWrapDoc) => {
                const giftwrap = giftWrapDoc.data()
                const { giftwrap_id, zipcode, memo, coordinates } = giftwrap
                giftwrapValues = { giftwrap_id, zipcode, memo, coordinates }

                // setInfoBoxData({ giftwrap_id, zipcode, memo, coordinates })
                // setGeoLocation((value) => [...value, { lat: giftwrap.coordinates.lat, lng: giftwrap.coordinates.lng }])
            })
            return giftwrapValues
        }

        res.status(200).json({ id, mapData: getMapData() })
    } else {

    }
}