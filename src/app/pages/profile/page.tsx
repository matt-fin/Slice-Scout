//sample page
"use client"

import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Input,
  Button,
  VStack,
  Avatar,
  InputGroup,
  InputLeftElement,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import ContactUsButton from "@/components/ContactUsButton";
import { clientConnection } from "@/utils/supabase/server";


// Mock data
const favoritedShops = [
  { id: 1, name: "Joe's Pizza", location: "New York, NY", rating: 4.5 },
  { id: 2, name: "Best Slice", location: "Brooklyn, NY", rating: 4.8 },
  // Add more shops as needed
];

export default function ProfilePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndUserData = async () => {
      const supabase = await clientConnection();
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        router.push("/pages/login");
        return;
      }

      // Fetch user data after session is confirmed
      const { data: userData, error: dataError } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (dataError) {
        console.error("Error fetching user data:", dataError.message);
      } else {
        setUserData(userData);
      }

      setLoading(false);
    };

    fetchSessionAndUserData();
  }, [router]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!userData) {
    return <Text>Error fetching user data.</Text>;
  }
  const filteredShops = favoritedShops.filter(shop => {
    return (
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterRating || shop.rating >= parseFloat(filterRating))
    );
  });


  return (
    <Flex direction="row" minH="100vh" bg="gray.50" pt={"75px"}>
      {/* Sidebar */}
      <Box
        width="250px"
        p={5}
        bg="gray.800"
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Heading as="h2" size="xl" mb={4}>
          Menu
        </Heading>
        <Button variant="link" color="white" my={2}>
          Profile
        </Button>
        <Button variant="link" color="white" my={2}>
          Favorites
        </Button>
        <Button variant="link" color="white" my={2}>
          Reviews
        </Button>
        <Button variant="link" color="white" my={2}>
          Settings
        </Button>
      </Box>

      {/* Main Content */}
      <Flex flex="1" p={8} direction="column" alignItems="center">
        {/* Profile Section */}
        <Box
          bg="white"
          borderRadius="lg"
          p={6}
          width="100%"
          maxWidth="600px"
          boxShadow="md"
          textAlign="center"
        >
          <Avatar
            size="xl"
            name={userData.username}
            mb={4}
          />
          <Heading as="h2" size="lg">
            {userData.username}
          </Heading>
          <Text color="gray.500" mt={2}>
            {userData.id}
          </Text>
          <Text mt={4} fontSize="md">
            Bio: Passionate about finding the best pizza around the world and
            sharing my favorites with the community!
          </Text>
        </Box>

        {/* Favorites Section */}
        <Box
          bg="white"
          borderRadius="lg"
          p={6}
          width="100%"
          maxWidth="800px"
          mt={8}
          boxShadow="md"
        >
          <Heading as="h3" size="md" mb={4}>
            Favorite Shops
          </Heading>

          {/* Search and Filter */}
          <Flex mb={4}>
            <InputGroup mr={2}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Search favorite shops"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Select
              placeholder="Filter by rating"
              width="150px"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="4">4 Stars & Up</option>
              <option value="4.5">4.5 Stars & Up</option>
              <option value="5">5 Stars Only</option>
            </Select>
          </Flex>

          {/* Favorite Shops List */}
          <VStack spacing={4} align="stretch">
            {filteredShops.map(shop => (
              <Box
                key={shop.id}
                p={4}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                width="100%"
              >
                <Flex justify="space-between">
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {shop.name}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Location: {shop.location}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Rating: {shop.rating} <StarIcon color="yellow.400" />
                    </Text>
                  </Box>
                  <Button colorScheme="orange" size="sm">
                    View
                  </Button>
                </Flex>
              </Box>
            ))}
            {filteredShops.length === 0 && (
              <Text>No favorite shops match your search or filter.</Text>
            )}
          </VStack>
        </Box>
      </Flex>
      <ContactUsButton/>
    </Flex>
  );
}
