// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
  } = req

  if (method === 'POST') {
    const zipcode = req.body.zipcode
    const giftwrapId = req.body.giftwrap
    
    const newZip = {
      id: Date.now(),
      giftwrapId,
      zipcode
    }
    //Update file
    fs.appendFileSync('./zipcodes.json', JSON.stringify({ giftwrap: [ newZip ]}), { encoding: "utf8", flag: "a+" })

    res.status(201).json(newZip)
  }
}