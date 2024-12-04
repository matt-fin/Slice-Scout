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

const supabase = await clientConnection();


export default function results() {
  //const router = useRouter();
  const searchParams = useSearchParams();
  const [searchLocation, setSearchLocation] = useState('');
  //query once and store data in instance
  const [pizzerias, setPizzerias] = useState([]);
  const [allPizzerias, setAllPizzerias] = useState([]);
  const [pizza, setPizza] = useState([]);

    useEffect(() => {
      const fetchAllPizzerias = async () => {
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
          location: location ( 
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
    const location = searchParams.get('location');
    setSearchLocation(location);

    if(location && allPizzerias.length > 0) {
      const filteredPizzerias = allPizzerias
      .filter(p => p.location?.zip_code === location)
      .sort((a, b) => {
        if(a.slice_price !== b.slice_price) {
          return a.slice_price - b.slice_price;
        }
        return a.pizzeria_name.localeCompare(b.pizzeria_name);
      });
      setPizzerias(filteredPizzerias);
    }
  }, [searchLocation, allPizzerias])

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
                <MapCaller pizzerias={pizzerias} handlePizzeriaSelection={handlePizzeriaSelection}/>
            </Box>
        </HStack>
        <ContactUsButton/>
        </main>
    </Box>
  );
}