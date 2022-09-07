export type Coordinate = {
    lat: number,
    lng: number
}

export type Inputs = {
    giftwrap_id: string,
    city: string,
    state: string,
    memo: string,
    coordinates: {
        lat: number,
        lng: number
    }
};
