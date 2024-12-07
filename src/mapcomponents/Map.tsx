"use client";

//order of leaflet imports matter; preserve spacing to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
//import PizzaIcon from '../public/pizza_mapicon.png'
import * as T from '../libs/types'

interface MapProps {
    pizzerias: T.Pizzeria[];
    handlePizzeriaSelection: (id: number) => void;
    iconUrl?: string;
}

export default function Map({pizzerias, handlePizzeriaSelection, iconUrl= '/pizza_mapicon.png'}: MapProps) {
    
    //Can extend Icon to customize further
    const pizzaIcon = new Icon({
        iconUrl
    });
    
    const pizzeriaMarkers = pizzerias.map(pizzeria => {
        const {latitude, longitude} = pizzeria.location;

        return (
            <Marker
                key={pizzeria.id}
                icon={pizzaIcon}
                position={[latitude, longitude]}
                eventHandlers={{
                    click: () => handlePizzeriaSelection(pizzeria.id),
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                }}
            >
                <Popup>
                    <p>{pizzeria.name}</p>
                </Popup>
            </Marker>
        );
    });

    return (
    <MapContainer
        center={[40.758896, -73.985130]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "400px" }}
    >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pizzeriaMarkers}
    </MapContainer>
    );
}