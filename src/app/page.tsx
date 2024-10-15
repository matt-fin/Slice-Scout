"use client";

import Image from "next/image";
import styles from "./page.module.css";
import MapCaller from '@/components/Map/MapCaller';
import * as T from '@/libs/types'

import { useState } from "react";

//mock data
const pizzerias: T.Pizzeria[] = [
  {
      id: 25,
      name: "Bob's Pizza",
      location: {
          latitude: 40,
          longitude: -73,
      }
  }
];

export default function Home() {
  const [selectedPizzeria, setSelectedPizzeria] = useState(-1);
  
  //can manipulate other components based on marker selection (via click)
  //ideally would manipulate shown cards
  const handlePizzeriaSelection = (id: number) => setSelectedPizzeria(id);

  return (
    <>
      <MapCaller pizzerias={pizzerias} handlePizzeriaSelection={handlePizzeriaSelection}/>
      <p>{selectedPizzeria === 1 ? "Nothing selected" : "Selected ID: " + selectedPizzeria}</p>
    </>
  );
}
