"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Divider,
  Button,
  Stack,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function RestaurantDetails() {
  const router = useRouter();
  const { id } = router.query; // Dynamic ID from the route

  return (
    <Box padding="8" maxW="1200px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb="8">
        <Heading as="h1" fontSize="4xl" color="orange.500">
          Restaurant Name (e.g., Joe's Pizza)
        </Heading>
        <Button onClick={() => router.back()} colorScheme="orange" variant="outline">
          Back
        </Button>
      </Flex>

      {/* Main Content */}
      <Flex direction={{ base: "column", md: "row" }} gap="8" mb="12">
        {/* Left Image */}
        <Image
          src="/images/pizza-shop.jpg"
          alt="Pizza Shop"
          borderRadius="lg"
          objectFit="cover"
          boxSize="100%"
          shadow="lg"
        />

        {/* Right Content */}
        <Stack spacing="6" flex="1">
          <Heading as="h2" fontSize="3xl" color="orange.500">
            Expanded Pizza Card
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Price Indicator: $1.00
          </Text>
          <Text fontSize="md" color="gray.600">
            This section can show more details about the restaurant, including its
            history, unique features, and current deals.
          </Text>
        </Stack>
      </Flex>

      <Divider mb="12" />

      {/* Additional Content */}
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap="8">
        {/* Parallax User-Added Content */}
        <Box flex="1">
          <Heading as="h3" fontSize="xl" mb="4" color="orange.600">
            Parallax User-Added Content
          </Heading>
          <Text color="gray.600">- Add any reviews or custom content here.</Text>
        </Box>

        {/* Price History Graph */}
        <Box flex="1">
          <Heading as="h3" fontSize="xl" mb="4" color="orange.600">
            Price History Graph
          </Heading>
          <Text color="gray.600">(e.g., line graph showing changes over time)</Text>
        </Box>
      </Flex>

      <Divider my="12" />

      {/* Menu Section */}
      <Heading as="h2" fontSize="2xl" mb="6" color="orange.500">
        Menu Items
      </Heading>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap="6">
        <Box textAlign="center" p="4" bg="gray.50" borderRadius="lg" shadow="md">
          <Text fontSize="lg" color="gray.800">
            Menu Item #1
          </Text>
        </Box>
        <Box textAlign="center" p="4" bg="gray.50" borderRadius="lg" shadow="md">
          <Text fontSize="lg" color="gray.800">
            Menu Item #2
          </Text>
        </Box>
        <Box textAlign="center" p="4" bg="gray.50" borderRadius="lg" shadow="md">
          <Text fontSize="lg" color="gray.800">
            Menu Item #3
          </Text>
        </Box>
        <Box textAlign="center" p="4" bg="gray.50" borderRadius="lg" shadow="md">
          <Text fontSize="lg" color="gray.800">
            Menu Item #4
          </Text>
        </Box>
      </Grid>

      {/* Interactive Map Section */}
      <Box textAlign="center" mt="12">
        <Heading as="h2" fontSize="3xl" mb="6" color="orange.500">
          Location
        </Heading>
        <Text fontSize="md" color="gray.600" mb="4">
          Click the map to open directions in Google Maps.
        </Text>
        <Box as="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.913616414947!2d-73.989416!3d40.730610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18fa0c1f%3A0xc70f33fdac4e6645!2sJoe's%20Pizza!5e0!3m2!1sen!2sus!4v1614875545333!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          title="Pizza Location Map"
        />
      </Box>
    </Box>
  );
}