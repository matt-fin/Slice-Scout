'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Box,
    Stack,
    Text,
    HStack,
    Container
  } from "@chakra-ui/react";
import MapCaller from "../../../mapcomponents/MapCaller"
import SearchBar from '../components/SearchBar';
import Filters from './results-components/Filters'
import PizzaCardArea from './results-components/PizzaCardArea'

export default function results() {
  //const router = useRouter();
  const searchParams = useSearchParams();
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const location = searchParams.get('location');
    if(location) {
      setSearchLocation(location);
    }
  }, [searchParams])

  const test: T.Pizzeria[] = [
    {
        id: 1,
        name: "Pizzeria1",
        location: {
            latitude: 40.64114410546463, 
            longitude: -74.01552994651469
        }
    }
]
    const handlePizzeriaSelection = (id: number) => {
        console.log("Selected Pizzeria ID:", id);
    };

  return (
    <Box bg="#fffcf5" minHeight="80vh" overflowY={"auto"}>
        <main>
        <Stack marginTop="70px" align="center" justify="center" spacing="4">
            <SearchBar/>
        </Stack>
        <Text marginLeft="250px">Search Results for "{searchLocation}".</Text>
        <HStack spacing={4}
            alignItems="flex-start"
            w={"100%"} 
            padding="10px 20px">
            <Filters/>
            <PizzaCardArea/>
            <Box display="flex" justifyContent="flex-end">
                <MapCaller pizzerias={test} handlePizzeriaSelection={handlePizzeriaSelection}/>
            </Box>
        </HStack>
        </main>
    </Box>
  );
}