'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import MapCaller from "../../../mapcomponents/MapCaller";
import SearchBar from '../../../components/SearchBar';
import Filters from './results-components/Filters';
import PizzaCardArea from './results-components/PizzaCardArea';
import ContactUsButton from '@/components/ContactUsButton';
import * as T from "../../../libs/types"; // Adjust the path to `types` as needed

export default function Results() {
  const searchParams = useSearchParams();
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.758896, -73.985130]); // Default to Times Square

  // Only update searchLocation when the query parameter changes
  useEffect(() => {
    const location = searchParams.get('location');
    if (location) {
      setSearchLocation(location);
    }
  }, [searchParams]);

  // Dummy pizzeria data
  const test: T.Pizzeria[] = [
    {
      id: 1,
      name: "Pizzeria1",
      location: {
        latitude: 40.64114410546463,
        longitude: -74.01552994651469,
      },
    },
  ];

  const handlePizzeriaSelection = (id: number) => {
    console.log("Selected Pizzeria ID:", id);
  };

  return (
    <Box bg="#fffcf5" minHeight="80vh" overflowY="auto">
      <main>
        <Stack marginTop="70px" align="center" justify="center" spacing={4}>
          <SearchBar
            onSearch={(coordinates: [number, number]) => {
              setMapCenter(coordinates); // Update map center
              setSearchLocation(`${coordinates[0]}, ${coordinates[1]}`); // Update search location text
            }}
          />
        </Stack>
        <Text marginLeft="250px">
          Search Results for "{searchLocation}".
        </Text>
        <HStack
          spacing={4}
          alignItems="flex-start"
          w="100%"
          padding="10px 20px"
        >
          <Filters />
          <PizzaCardArea />
          <Box display="flex" justifyContent="flex-end">
            <MapCaller
              pizzerias={test}
              handlePizzeriaSelection={handlePizzeriaSelection}
              centerCoordinates={mapCenter} // Dynamically update the map center
            />
          </Box>
        </HStack>
        <ContactUsButton />
      </main>
    </Box>
  );
}