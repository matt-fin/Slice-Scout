import { Box, Icon, Input, InputGroup, InputLeftElement, Button, Stack, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { p } from "framer-motion/client";
import {MdMyLocation} from "react-icons/md"

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

