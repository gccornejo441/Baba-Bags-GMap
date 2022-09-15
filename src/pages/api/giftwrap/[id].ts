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

        // Returns values
        let giftwrapValues: Inputs[] = []

        // Get Google map data.
        const getMapData = () => {
            getGiftWrapDocs.docs.forEach((giftWrapDoc) => {
                const giftwrap = giftWrapDoc.data()
                giftwrapValues.push(giftwrap)
            })
            return giftwrapValues
        }

        res.status(200).json({ id, mapData: getMapData() })
    } else {

    }
}