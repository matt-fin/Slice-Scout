export type Pizzeria = {
    id: number;
    name: string;
    location: Location;
    price: number;
}

export type Location = {
    latitude: number;
    longitude: number;
}