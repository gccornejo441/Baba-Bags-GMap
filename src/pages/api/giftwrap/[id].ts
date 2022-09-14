import { Inputs } from '@/types'
import { doc, setDoc, getDocs } from '@firebase/firestore'
import { createCollection } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import Geocode from "react-geocode";


export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {

    console.log("body: ", req.body)
    res.status(200).json({ giftwrap_id: 'John Doe' })

}
