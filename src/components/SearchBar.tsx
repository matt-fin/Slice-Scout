"use client";
import { Box, Icon, Input, InputGroup, Button, Stack, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch?: (coordinates: [number, number]) => void; // Expecting coordinates exclusively
}

interface Suggestion {
  id: number;
  name: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState<string>(""); // User input
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // Location suggestions
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const placeholderResults: Suggestion[] = [
    { id: 1, name: "Current Location" },
    { id: 2, name: "New York, NY 10007" },
    { id: 3, name: "Brooklyn, NY 11214" },
  ];

  const fetchLocationSuggestion = async (query: string) => {
    const results = query
      ? placeholderResults.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      : [{ id: 1, name: "Current Location" }];

    setSuggestions(results);
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    fetchLocationSuggestion(value);
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    if (suggestion.name === "Current Location" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          if (onSearch) onSearch(coordinates); // Pass coordinates to parent if onSearch is defined
          setLocation(`${coordinates[0]}, ${coordinates[1]}`);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      const coordinates = await fetchCoordinates(suggestion.name);
      if (coordinates) {
        if (onSearch) onSearch(coordinates); // Pass coordinates to parent
        setLocation(`${coordinates[0]}, ${coordinates[1]}`);
      }
    }
    setShowSuggestions(false);
  };

  const fetchCoordinates = async (query: string): Promise<[number, number] | null> => {
    const BASE_URL = "https://api.geoapify.com/v1/geocode/search";
    const API_KEY = "d302a1236f034f08b008afd7f2a7449c";

    try {
      const response = await fetch(
        `${BASE_URL}?text=${encodeURIComponent(query)}&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (data.features.length > 0) {
        const { lat, lon } = data.features[0].properties;
        return [lat, lon];
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    return null;
  };

  const handleSearch = async () => {
    const coordinates = await fetchCoordinates(location);
    if (coordinates) {
      if (onSearch) {
        onSearch(coordinates); // Use coordinates flow if onSearch is defined
      } else {
        router.push(`/pages/results?location=${location}`); // Fallback navigation
      }
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      {/* Search Bar */}
      <Stack direction="column" align="center" w="100%" padding="20px 0px">
        <InputGroup flex="3">
          <Input
            placeholder="Enter a location to search for shops nearby"
            size={{ base: "sm", md: "md", lg: "lg" }}
            htmlSize={35} // Adjust this number to make it wider
            variant="outline"
            bg="white" // Solid white background
            borderColor="gray.300" // Subtle border
            _hover={{ borderColor: "gray.400" }}
            _focus={{
              borderColor: "orange.500",
              boxShadow: "0 0 0 1px orange.500",
            }}
            value={location}
            onChange={handleInputChange}
            onFocus={() => fetchLocationSuggestion("")}
          />
        </InputGroup>

        {showSuggestions && (
          <Box
            position="absolute"
            marginTop="8px"
            bg="rgba(255,255,255,0.9)"
            w="100%"
            borderRadius="md"
            zIndex="1300"
            shadow="lg"
          >
            {suggestions.map((suggestion) => (
              <Stack
                key={suggestion.id}
                direction="row"
                align="center"
                p={3}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name === "Current Location" && (
                  <Icon as={MdMyLocation} color="orange.500" />
                )}
                <Text>{suggestion.name}</Text>
              </Stack>
            ))}
          </Box>
        )}
      </Stack>

      <Box padding="20px 0px">
        <Button colorScheme="red" size="lg" onClick={handleSearch}>
          <Search2Icon />
        </Button>
      </Box>
    </Stack>
  );
}