
import { Inputs } from '@/types'
import { doc, setDoc } from '@firebase/firestore'
import { createCollection } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
 let point = req.body.point

 const { giftwrap, zipcode, memo } = req.body

    try {
        point++;

        // const giftWrapCol = createCollection<Inputs>(giftwrap)
        // const giftWrapDocs = doc(giftWrapCol, `giftwrap_${point}`)
        
        // await setDoc(giftWrapDocs, {
        //         giftwrap_id: giftwrap,
        //     zipcode: zipcode,
        //     memo: memo,
        //     coordinates: {
        //         lat: 0,
        //         lng: 0
        //     }
        // })

        res.status(201).json({ giftwrap, zipcode, memo})
        
    } catch (err) {
        res.status(500).send({error: "failed fetch"})
    }

}
