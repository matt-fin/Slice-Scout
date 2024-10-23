"use client";

//order of leaflet imports matter; preserve spacing to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import PizzaIcon from '@/icons/pizza.png'
import * as T from '@/libs/types'

interface MapProps {
    pizzerias: T.Pizzeria[];
    location: T.Location;
    handlePizzeriaSelection: (id: number) => void;
}

export default function Map({pizzerias, location, handlePizzeriaSelection}: MapProps) {
    
    //for 1 to 1.50
    const greenIcon = new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [24, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    //for 1.50 to 2.00
    const yellowIcon = new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [24, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    //for 2.00 to 3.00
    const orangeIcon = new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [24, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    //for >3.00
    const redIcon = new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [24, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    //Can extend Icon to customize further
    const pizzaIcon = new Icon({
        iconUrl: PizzaIcon.src,
    });
    
    const getPizzaIcon = (pizzeria_price: number) => {
        const price = pizzeria_price;
        if (price <= 1.50) {
            return greenIcon;
        }
        else if (price <= 2) {
            return yellowIcon;
        }
        else if (price <= 3) {
            return orangeIcon;
        }
        else {
            return redIcon;
        }
    }

    const pizzeriaMarkers = pizzerias.map(pizzeria => {
        const {latitude, longitude} = pizzeria.location;

        return (
            <Marker
                key={pizzeria.id}
                icon={getPizzaIcon(pizzeria.price)}
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
            center={[location.latitude, location.longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "600px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pizzeriaMarkers}
        </MapContainer>
    );
}
