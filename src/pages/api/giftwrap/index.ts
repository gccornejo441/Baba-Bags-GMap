
import { Inputs } from '@/types'
import { doc, setDoc } from '@firebase/firestore'
import { createCollection } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
 let point = req.body.point

 const { giftwrap, zipcode, memo } = req.body

 console.log(req.method)

switch (req.method) {
  case 'GET':
    // Get data from your database
    // res.status(200).json({ id, name: `User ${id}` })
    break
  case 'POST':
    // Update or create data in your database
    // Incrementing value for document numberization
    try {
        point++;

        // const giftWrapCol = createCollection<Inputs>(giftwrap)
        // const giftWrapDocs = doc(giftWrapCol, `giftwrap_${point}`)
        
        // await setDoc(giftWrapDocs, {
            //     giftwrap_id: giftwrap,
        //     zipcode: zipcode,
        //     memo: memo,
        //     coordinates: {
        //         lat: 0,
        //         lng: 0
        //     }
        // })
        
        res.status(200).json({ giftwrap })
        res.redirect(307, `/giftwraps/${giftwrap}`)

    } catch (err) {
        res.status(500).send({error: "failed fetch"})
    }
    break
  default:
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}

  // const email = searchParams.get('email')
  // return new Response(email)
}
