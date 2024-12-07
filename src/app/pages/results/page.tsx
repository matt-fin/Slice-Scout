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
import { clientConnection } from '@/utils/supabase/server';

interface Pizzeria {
  pizzeria_id: bigint;
  pizzeria_name: string;
  phone_num: string;
  open_time: string;
  closing_time: string;
  slice_price: number;
  rating: number;
  shop_url: string;
  reviews_url: string;
  street_address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  borough: string;
  building_number: string;
}

interface PizzeriaMapping {
  id: bigint;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function Results() {
  //const router = useRouter();
  const searchParams = useSearchParams();
  const [searchLocation, setSearchLocation] = useState('');
  //query once and store data in instance
  const [filteredPizzerias, setFilteredPizzerias] = useState<Pizzeria[]>([]);
  const [allPizzerias, setAllPizzerias] = useState<Pizzeria[]>([]);
  const [mapPizzerias, setMapPizzerias] = useState<PizzeriaMapping[]>([]);
  const [showNoResults, setShowNoResults] = useState(false); //for when no results are shown

    useEffect(() => {
      
      const fetchAllPizzerias = async () => {
        const supabase = await clientConnection();

        const { data: mergedData, error: mergeError } = await supabase.from('pizzeria_locations').select(`
          pizzeria_id, 
          pizzeria_name,
          open_time,
          closing_time,
          slice_price,
          rating,
          shop_url,
          reviews_url,
          phone_num,
          street_address,
          zip_code,
          latitude,
          longitude,
          borough,
          building_number`
          );
          if (mergeError) {
            console.error("Error fetching pizzerias:", mergeError);
            alert("Failed to fetch pizzeria data. Please try again later.");
          } else {
            setAllPizzerias(mergedData);
        }
      };

      fetchAllPizzerias();
    }, []);

    useEffect(() => {
      const locationZip = searchParams.get('locationZip');
      setSearchLocation(locationZip || '');
  
      if (locationZip && allPizzerias.length > 0) {
        const filtered = allPizzerias
          .filter((pizzeria) => pizzeria.zip_code === locationZip)
          .sort((a, b) => 
            a.slice_price !== b.slice_price 
              ? a.slice_price - b.slice_price 
              : a.pizzeria_name.localeCompare(b.pizzeria_name)
          );
  
        setFilteredPizzerias(filtered);
        const truncated = filtered.map((pizzeria: Pizzeria) => ({
          id: pizzeria.pizzeria_id,
          name: pizzeria.pizzeria_name,
          location: {
            latitude: pizzeria.latitude,
            longitude: pizzeria.longitude,
          },
        }));
        setMapPizzerias(truncated);

        //controls a short time delay before showing not found message
        if (filtered.length === 0) {
          const timeoutId = setTimeout(() => {
            setShowNoResults(true);
          }, 1000); // 1 second delay
  
          return () => clearTimeout(timeoutId);
        }
      }
    }, [searchParams, allPizzerias]);

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
        {showNoResults && (
          <Text fontSize="xl" color="red.500" align="center" w="100%">
            Results not found for "{searchLocation}".
          </Text>
        )}
        {filteredPizzerias.length > 0 && (
          <Text marginLeft="250px">Search Results for "{searchLocation}".</Text>
        )}
          <HStack spacing={4}
            alignItems="flex-start"
            w={"100%"} 
            padding="10px 20px">
            <Filters/>
            <PizzaCardArea pizzerias={filteredPizzerias}/>
            <Box display="flex" justifyContent="flex-end">
                {<MapCaller pizzerias={mapPizzerias} handlePizzeriaSelection={handlePizzeriaSelection}/>}
            </Box>
        </HStack>
        <ContactUsButton />
      </main>
    </Box>
  );
}