// About Page
"use client";

import ContactUsButton from "@/components/ContactUsButton";
import { Box, Flex, Heading, Text, Image, Stack, Divider } from "@chakra-ui/react";

export default function About() {
  return (
    <Box padding="100px" maxW="1200px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      {/* Header Section */}
      <Box textAlign="center" mb="12">
        <Heading as="h1" fontSize="5xl" fontWeight="bold" mb="4" color="orange.500">
          About Slice Scout
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Bringing back NYC’s iconic 99¢ pizza tradition, one slice at a time.
        </Text>
      </Box>

      <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" mb="12" gap="8">
        {/* Left Image */}
        <Image
          src="/slicescoutlogo.png"
          alt="NYC Pizza"
          borderRadius="lg"
          objectFit="cover"
          boxSize={{ base: "100%", md: "50%" }}
          shadow="lg"
        />
        {/* Right Text */}
        <Stack spacing="6" maxW="600px">
          <Heading as="h2" fontSize="3xl" color="orange.500">
            Our Mission
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Slice Scout was created by a group of NYC-based college students who
            share a deep love for 99¢ pizza—a true New York City staple. Our
            mission is simple: to help New Yorkers find affordable, authentic
            slices amidst rising prices while preserving this cherished tradition
            for generations to come.
          </Text>
        </Stack>
      </Flex>

      <Divider mb="12" />

      {/* Features Section */}
      <Box mb="12">
        <Heading as="h2" fontSize="3xl" textAlign="center" mb="8" color="orange.500">
          What We Offer
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-around"
          gap="8"
          wrap="wrap"
        >
          <Box textAlign="center" maxW="300px" p="4" bg="gray.50" borderRadius="lg" shadow="md">
            <Heading as="h3" fontSize="xl" mb="4" color="orange.600">
              Real-Time Map
            </Heading>
            <Text fontSize="md" color="gray.600">
              Explore NYC pizza shops on a live map, categorized by the actual price
              of a regular slice.
            </Text>
          </Box>
          <Box textAlign="center" maxW="300px" p="4" bg="gray.50" borderRadius="lg" shadow="md">
            <Heading as="h3" fontSize="xl" mb="4" color="orange.600">
              User Reports
            </Heading>
            <Text fontSize="md" color="gray.600">
              Submit and update slice prices at your favorite pizza spots to keep our
              database accurate and up-to-date.
            </Text>
          </Box>
          <Box textAlign="center" maxW="300px" p="4" bg="gray.50" borderRadius="lg" shadow="md">
            <Heading as="h3" fontSize="xl" mb="4" color="orange.600">
              Notifications
            </Heading>
            <Text fontSize="md" color="gray.600">
              Receive alerts when prices change at nearby pizza shops, so you’re
              always in the know.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Divider mb="12" />

      {/* Story Section */}
      <Box textAlign="center" mb="12">
        <Heading as="h2" fontSize="3xl" mb="6" color="orange.500">
          Our Story
        </Heading>
        <Text fontSize="lg" color="gray.700" maxW="800px" mx="auto">
          Slice Scout was inspired by the cheap pizza purge NYC experienced after
          COVID-19 and inflation. As students at CUNY, we’ve relied on 99¢ pizza
          to get through tight budgets and late-night study sessions. We saw the
          need to create a resource for finding traditional 99¢ slices amidst
          rising prices and the confusion caused by misleading shop names.
        </Text>
      </Box>

      {/* Team Section */}
      <Box>
        <Heading as="h2" fontSize="3xl" textAlign="center" mb="8" color="orange.500">
          Meet the Team
        </Heading>
        <Flex wrap="wrap" justify="center" gap="8">
          <Box textAlign="center">
            <Image
              src="/Matthew.png"
              alt="Matthew Finamore"
              boxSize="150px"
              borderRadius="full"
              mb="4"
              shadow="md"
            />
            <Heading as="h3" fontSize="lg" color="gray.800">
              Matthew Finamore
            </Heading>
            <Text color="gray.600">Founder & Full Stack Developer</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="/Jack.png"
              alt="Jack Hachicho"
              boxSize="150px"
              borderRadius="full"
              mb="4"
              shadow="md"
            />
            <Heading as="h3" fontSize="lg" color="gray.800">
              Jack Hachicho
            </Heading>
            <Text color="gray.600">Full Stack Developer</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="/Tor.png"
              alt="Tor Sdayur"
              boxSize="150px"
              borderRadius="full"
              mb="4"
              shadow="md"
            />
            <Heading as="h3" fontSize="lg" color="gray.800">
              Tor Sdayur
            </Heading>
            <Text color="gray.600">Lead Backend Developer</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="/Rei.png"
              alt="Rei Zheng"
              boxSize="150px"
              borderRadius="full"
              mb="4"
              shadow="md"
            />
            <Heading as="h3" fontSize="lg" color="gray.800">
              Rei Zheng
            </Heading>
            <Text color="gray.600">Head of Design and Development</Text>
          </Box>
        </Flex>
      </Box>

      <Box textAlign="center" mt="12">
        <ContactUsButton />
      </Box>
    </Box>
  );
}
