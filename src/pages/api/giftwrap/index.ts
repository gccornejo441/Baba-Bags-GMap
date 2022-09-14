import { Inputs } from '@/types'
import { doc, setDoc, getDocs } from '@firebase/firestore'
import { createCollection } from 'firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import Geocode from "react-geocode";

// Geocode API
Geocode.setApiKey("AIzaSyB44B4NFC_nSRBMq8YcRtHX7xFgT5RnHWg");

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    let point = req.body.point
    const { giftwrap_id, zipcode, memo } = req.body

    // Digit Incrementation For Giftwrap Id e.g., giftwrap_xx
    point++;

    // Initializing coordinates
    const coordinates = {
        lat: 0,
        lng: 0
    }

    // Giftwrap Collection from Firestore
    const giftWrapCol = createCollection<Inputs>(giftwrap_id)

    // Get Giftwrap documents from Firestore
    const giftWrapDocs = doc(giftWrapCol, `giftwrap_${point}`)
    const getGiftWrapDocs = await getDocs(giftWrapCol)

    /**
* POST document to Firestore.
* @param  {HTMLFormControlsCollection} elements  the form elements
*/
    const sendToDoc = async ({ giftwrap_id, zipcode, memo, coordinates }: Inputs) => {
        await setDoc(giftWrapDocs, {
            giftwrap_id: giftwrap_id,
            zipcode: zipcode,
            memo: memo,
            coordinates: {
                lat: coordinates.lat,
                lng: coordinates.lng
            }
        })
    }

    /**
 * Get latitude & longitude from address.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 */
    const insertGeo = async ({ giftwrap_id, zipcode, memo, coordinates }: Inputs) => {
        Geocode.fromAddress(zipcode).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                coordinates.lat = lat, coordinates.lng = lng
                sendToDoc({ giftwrap_id, zipcode, memo, coordinates })
            }, (error) => {
                console.error(error);
            }
        );
    }

    // Updates Geolocation with coodinates
    const getMapData = async () => {
        getGiftWrapDocs.docs.forEach((giftWrapDoc) => {
            const giftwrap = giftWrapDoc.data()
            const { giftwrap_id, zipcode, memo, coordinates } = giftwrap

            // setInfoBoxData({ giftwrap_id, zipcode, memo, coordinates })
            // setGeoLocation((value) => [...value, { lat: giftwrap.coordinates.lat, lng: giftwrap.coordinates.lng }])
        })
    }

    switch (req.method) {
        case "GET":
            getMapData()
            break;
        case "POST":
            try {
                // await insertGeo({ giftwrap_id, zipcode, memo, coordinates })
                res.status(201).json({ giftwrap_id, zipcode, memo, coordinates })
            } catch (err) {
                res.status(500).send({ error: "failed fetch" })
            }
            break;
        default:
        // code block
    }

}
