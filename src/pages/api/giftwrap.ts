
import { Inputs } from '@/types'
import { doc, setDoc } from '@firebase/firestore'
import { createCollection } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import Geocode from "react-geocode";

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    let point = req.body.point

    const { giftwrap_id, zipcode, memo } = req.body
 
    const coordinates = {
        lat: 0,
        lng: 0
    }

    try {
        point++;

        // const giftWrapCol = createCollection<Inputs>(giftwrap_id)
        // const giftWrapDocs = doc(giftWrapCol, `giftwrap_${point}`)
        


        const insert = async ({ giftwrap_id, zipcode, memo }: Inputs) => {
            // Get latitude & longitude from address.
            Geocode.fromAddress(zipcode).then(
                (response) => {
                    console.log("Zipcode plsease: ", response.results[0].geometry.location)
                    const { lat, lng } = response.results[0].geometry.location;
                    coordinates.lat = lat, coordinates.lng = lng
                    console.log("coordinat: ", coordinates.lat)
                    sendToDoc({giftwrap_id, zipcode, memo, coordinates})
                },
                (error) => {
                    console.error(error);
                }
            );
        }

        const sendToDoc = ({ giftwrap_id, zipcode, memo, coordinates }: Inputs) => {

        }



        // await setDoc(giftWrapDocs, {
        //     giftwrap_id: giftwrap,
        //     zipcode: zipcode,
        //     memo: memo,
        //     coordinates: {
        //         lat: coordinates.lat,
        //         lng: coordinates.lng
        //     }
        // })

        res.status(201).json({ giftwrap_id, zipcode, memo })

    } catch (err) {
        res.status(500).send({ error: "failed fetch" })
    }

}
