//import { useRouter } from 'next/navigation';
import { Box, Icon, Input, InputGroup, Button, Stack, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import {MdMyLocation} from "react-icons/md";
import { useRouter } from 'next/navigation'
import { handleEnterKey } from "@/utils/handleEnterKeyEvents";

export default function SearchBar() {

        const router = useRouter();
        
        const [locationZip, setLocationZip] = useState("");
        const [suggestions, setSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [showSearchResults, setShowSearchResults] = useState(false);

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
          setLocationZip(value);
          fetchLocationSuggestion(value);
        };

        const handleSuggestionClick = (suggestion) => {
          setLocationZip(suggestion.name);
          setShowSuggestions(false);
        };

        const handleSearchBarFocus = () => {
          fetchLocationSuggestion("");
        };

        const handleSearch = () => {
          console.log("Searching for", locationZip);
          const queryParams = new URLSearchParams({ locationZip });
          router.push(`/pages/results?${queryParams.toString()}`);
        };

        //handles suggestion fetching
        const getSuggestions = async () => {
          //minimum length of inputted string
          const MIN_LENGTH = 3;
          //time waited in ms until API call is made
          const DEBOUNCE_DELAY = 500;

          const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete";
          const API_KEY = "d302a1236f034f08b008afd7f2a7449c";

          if (locationZip.length >= MIN_LENGTH) {
            const newSuggestions = setTimeout(async () => {

              const response = await fetch(BASE_URL + "?text=" + location + "&apiKey=" + API_KEY);
              const data = await response.json();

              const retrievedSuggestions = data.features.map((feature, index) => ({id: index, name: feature.properties.city + ", " + feature.properties.address_line1}));

              setSuggestions(retrievedSuggestions);
            }, DEBOUNCE_DELAY);
            return () => clearTimeout(newSuggestions);
          }
        };

        //handles suggestion fetching
        useEffect(() => {getSuggestions()}, [location]);

  return (
    <Stack direction="row" spacing={2}>
      {/*Search Bar*/}
      <Stack direction="column" align="center" w="100%" padding="20px 0px">
        <InputGroup flex="3">
          <Input
            placeholder="Enter a zip code to search for shops nearby"
            size={{base: "sm", md: "md", lg: "lg"}}
            variant="fill"
            htmlSize={40}
            value={locationZip}
            onChange={handleInputChange}
            onFocus={handleSearchBarFocus}
            onKeyDown={handleEnterKey(handleSearch)}
          />
        </InputGroup>
        
        {showSuggestions && (
          <Box 
            position="absolute"
            margin={"48px"}
            bg="rgba(255,255,255,.8)"
            w={"29vw"}
            borderRadius="md"
            zIndex={"1300"}
          >
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

      {showSearchResults && (
        <Box>
          <Text>
            Search results for "{locationZip}".
          </Text>
        </Box>  
      )}
      </Stack>
        <Box padding="20px 0px">
          <Button colorScheme="red" size="lg" isDisabled={!locationZip} onClick={handleSearch}>
            <Search2Icon />
          </Button>
        </Box>
    </Stack>
  );
};
