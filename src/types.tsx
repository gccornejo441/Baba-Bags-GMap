export type Coordinate = {
    lat: number,
    lng: number
}

export type Inputs = {
    giftwrap_id: string,
    zipcode: string,
    memo: string,
    coordinates: {
        lat: number,
        lng: number
    }
};


export type InfoBox = {
    zipcode: string
}

export type IGeolocation =  {
    lat: number,
    lng: number
}