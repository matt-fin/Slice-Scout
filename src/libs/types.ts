export type Pizzeria = {
    id: bigint;
    name: string;
    location: Location;
}

export type Location = {
    latitude: number;
    longitude: number;
}