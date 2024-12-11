"use client";

import { useState, useEffect } from 'react';
import MapCaller from './MapCaller'; 
import * as T from '../libs/types';

interface MapWrapperProps {
  centerCoordinates?: [number, number];
  width?: string;
  height?: string;
}

export default function MapWrapper({ 
  centerCoordinates = [40.7580, -73.9855], // Default to Times Square
  width = "400px",
  height = "600px"
}: MapWrapperProps) {
  const [pizzerias, setPizzerias] = useState<T.Pizzeria[]>([]);
  const [selectedPizzeria, setSelectedPizzeria] = useState<number | null>(null);

  useEffect(() => {
    // Fetch pizzerias - replace this with your actual data fetching method
    const fetchPizzerias = async () => {
      try {
        // Example fetch - replace with your actual data source
        const response = await fetch('/api/pizzerias');
        const data = await response.json();
        setPizzerias(data);
      } catch (error) {
        console.error('Failed to fetch pizzerias', error);
        setPizzerias([]); // Fallback to empty array
      }
    };

    fetchPizzerias();
  }, []);

  const handlePizzeriaSelection = (id: number) => {
    setSelectedPizzeria(id);
    // Add any additional logic for pizzeria selection
  };

  return (
    <div style={{ width, height }}>
      <MapCaller 
        pizzerias={pizzerias}
        handlePizzeriaSelection={handlePizzeriaSelection}
        centerCoordinates={centerCoordinates}
      />
    </div>
  );
}