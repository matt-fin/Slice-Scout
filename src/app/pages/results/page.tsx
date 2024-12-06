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
import SearchBar from '../../../components/SearchBar';
import Filters from './results-components/Filters'
import PizzaCardArea from './results-components/PizzaCardArea'
import ContactUsButton from '@/components/ContactUsButton';
import { clientConnection } from '@/utils/supabase/server';

interface Location {
  street_address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  borough: string;
}

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
  location: Location;
}

export default function Results() {
  //const router = useRouter();
  const searchParams = useSearchParams();
  const [searchLocation, setSearchLocation] = useState('');
  //query once and store data in instance
  const [pizzerias, setPizzerias] = useState<Pizzeria[]>([]);
  const [allPizzerias, setAllPizzerias] = useState<Pizzeria[]>([]);

    useEffect(() => {
      
      const fetchAllPizzerias = async () => {
        const supabase = await clientConnection();

        const { data: mergedData, error: mergeError } = await supabase.from('pizzerias').select(`
          pizzeria_id, 
          pizzeria_name,
          open_time,
          closing_time,
          slice_price,
          rating,
          shop_url,
          reviews_url,
          phone_num,
          location ( 
            street_address,
            zip_code,
            latitude,
            longitude,
            borough)`
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

    if(locationZip && allPizzerias.length > 0) {

      console.log("locationZip (type):", typeof locationZip, locationZip);

      const filteredPizzerias = allPizzerias.filter((p) => {
      console.log("p.location?.zip_code (type):", typeof p.location?.zip_code, p.location?.zip_code);
      return p.location?.zip_code === locationZip;
    });
      filteredPizzerias.sort((a, b) => {
        if(a.slice_price !== b.slice_price) {
          return a.slice_price - b.slice_price;
        }
        return a.pizzeria_name.localeCompare(b.pizzeria_name);
      });
      setPizzerias(allPizzerias);
    }
  }, [searchLocation, allPizzerias]);

    const handlePizzeriaSelection = (id: number) => {
        console.log("Selected Pizzeria ID:", id);
    };

  return (
    <Box bg="#fffcf5" minHeight="80vh" overflowY={"auto"}>
        <main>
        <Stack marginTop="70px" align="center" justify="center" spacing="4">
            <SearchBar/>
        </Stack>
        {allPizzerias.length === 0 || pizzerias.length === 0 ? (
          <Text fontSize="xl" color="red.500" align="center" w="100%">
            Results not found for "{searchLocation}".
          </Text>
        ) : (
          <Text marginLeft="250px">Search Results for "{searchLocation}".</Text>
        )}
          <HStack spacing={4}
            alignItems="flex-start"
            w={"100%"} 
            padding="10px 20px">
            <Filters/>
            <PizzaCardArea pizzerias={pizzerias}/>
            <Box display="flex" justifyContent="flex-end">
                {/*<MapCaller pizzerias={pizzerias} handlePizzeriaSelection={handlePizzeriaSelection}/>*/}
            </Box>
        </HStack>
        <ContactUsButton/>
        </main>
    </Box>
  );
}