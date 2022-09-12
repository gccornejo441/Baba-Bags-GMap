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
    city: string,
    state: string
}