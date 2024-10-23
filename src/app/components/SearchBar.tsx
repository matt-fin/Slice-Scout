import { Box, Icon, Input, InputGroup, InputLeftElement, Button, Stack, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { p } from "framer-motion/client";
import {MdMyLocation} from "react-icons/md"
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {

        const [location, setLocation] = useState("");
        const [suggestions, setSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);

        {/*insert api here*/}
        const placeholderResults = [
          {id: 1, name: "Current Location"},
          {id: 2, name: "New York, NY 10007"},
          {id: 3, name: "Brooklyn, NY 11214"}
        ];

        const fetchLocationSuggestion = async (query) => {

          const results = query ? placeholderResults.filter((item) => 
            item.name.toLowerCase().includes(query.toLowerCase())
          )
          : [{id: 1, name: "Current Location"}];

            setSuggestions(results);
            setShowSuggestions(true);
        };

        const handleInputChange = (e) => {
          const value = e.target.value;
          setLocation(value);
          fetchLocationSuggestion(value);
        };

        const handleSuggestionClick = (suggestion) => {
          setLocation(suggestion.name);
          setShowSuggestions(false);
        };

        const handleSearchBarFocus = () => {
          fetchLocationSuggestion("");
        };

        const getSuggestions = useDebouncedCallback(async () => {
          //minimum length of inputted string
          const MIN_LENGTH = 3;
          //time waited in ms until API call is made
          const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete";
          const API_KEY = "d302a1236f034f08b008afd7f2a7449c";

          if (location.length >= MIN_LENGTH) {
            const response = await fetch(BASE_URL + 
                                        "?text=" + 
                                        location + 
                                        "&lang=en" + 
                                        "&filter=place:51d9d1938d628052c0595938a4ac3a5b4440f00101f90121af020000000000c00208" +
                                        "&apiKey=" + 
                                        API_KEY);

            const data = await response.json();

            const retrievedSuggestions = data.features.map((feature, index) => ({id: index, name: feature.properties.address_line1 + ", " + (feature.properties.quarter || feature.properties.suburb || feature.properties.city)}));
            setSuggestions(retrievedSuggestions);
          }

        }, 500);

        //handles suggestion fetching
        useEffect(() => {getSuggestions()}, [location]);

  return (
    <Stack direction="row" spacing={2}>
      {/*Search Bar*/}
      <Stack direction="column" align="center" w="100%">
        <InputGroup flex="3">
          <Input
            placeholder="Enter a location to search for shops nearby"
            size="lg"
            variant="fill"
            htmlSize={"40"}
            value={location}
            onChange={handleInputChange}
            onFocus={handleSearchBarFocus}
          />
        </InputGroup>
        {showSuggestions && (
          <Box margin={-2} bg="rgba(255,255,255,.7)" w={"100%"} borderRadius="md">
            {suggestions.map((suggestion) => (
              <Stack
                key={suggestion.id}
                direction="row"
                align="center"
                p={3}
                _hover={{bg: "gray.100", cursor: "pointer"}}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name === "Current Location" && (
                  <Icon as={MdMyLocation} color="orange.500"/>
                )}
                <Text>{suggestion.name}</Text>
              </Stack>
            ))}
          </Box>
        )
      }
      </Stack>

      <Button colorScheme="red" size="lg">
        <Search2Icon/>
      </Button>
    </Stack>
  );
};

