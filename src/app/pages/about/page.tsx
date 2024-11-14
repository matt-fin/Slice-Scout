//sample page
"use client"

import ContactUsButton from "@/components/ContactUsButton";
import { Box, Flex, Heading, Text, Image, Stack } from "@chakra-ui/react";

export default function About() {
  return (
    <Box padding="4" maxW="1200px" mx="auto">
      <Heading as="h1" fontSize="4xl" mb="4" textAlign="center">
        About Us
      </Heading>
      <Text fontSize="lg" textAlign="center" mb="8" color="gray.600">
        We are a passionate team dedicated to delivering high-quality products
        and services that make a difference.
      </Text>

      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap="8"
        mb="12"
      >
        <Image
          src="/images/team-photo.jpg"
          alt="Our Team"
          boxSize={{ base: "300px", md: "400px" }}
          borderRadius="md"
          objectFit="cover"
        />
        <Stack spacing="4" maxW="600px">
          <Heading as="h2" fontSize="2xl">
            Our Mission
          </Heading>
          <Text color="gray.700">
            Our mission is to innovate and create solutions that improve the
            everyday lives of our customers. We believe in quality, integrity,
            and commitment to excellence in everything we do.
          </Text>
        </Stack>
      </Flex>

      <Box bg="gray.100" borderRadius="md" p="8" mb="12">
        <Heading as="h2" fontSize="2xl" mb="4" textAlign="center">
          Our Values
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-around"
          wrap="wrap"
          gap="6"
        >
          <Box maxW="300px" textAlign="center">
            <Heading as="h3" fontSize="xl" mb="2">
              Innovation
            </Heading>
            <Text color="gray.600">
              We constantly push ourselves to think outside the box and deliver
              unique solutions.
            </Text>
          </Box>
          <Box maxW="300px" textAlign="center">
            <Heading as="h3" fontSize="xl" mb="2">
              Integrity
            </Heading>
            <Text color="gray.600">
              We value honesty and transparency in all our interactions.
            </Text>
          </Box>
          <Box maxW="300px" textAlign="center">
            <Heading as="h3" fontSize="xl" mb="2">
              Customer Focus
            </Heading>
            <Text color="gray.600">
              Our customers are at the center of everything we do.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box textAlign="center">
        <Heading as="h2" fontSize="2xl" mb="4">
          Meet the Team
        </Heading>
        <Text color="gray.700" mb="8">
          We are a group of dedicated professionals who love what we do.
        </Text>
        <Flex wrap="wrap" justify="center" gap="6">
          <Box textAlign="center">
            <Image
              src="/images/team-member1.jpg"
              alt="Team Member 1"
              boxSize="150px"
              borderRadius="full"
              mb="4"
            />
            <Heading as="h3" fontSize="lg">
              Alex Johnson
            </Heading>
            <Text color="gray.600">CEO & Founder</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="/images/team-member2.jpg"
              alt="Team Member 2"
              boxSize="150px"
              borderRadius="full"
              mb="4"
            />
            <Heading as="h3" fontSize="lg">
              Maria Chen
            </Heading>
            <Text color="gray.600">Head of Engineering</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="/images/team-member3.jpg"
              alt="Team Member 3"
              boxSize="150px"
              borderRadius="full"
              mb="4"
            />
            <Heading as="h3" fontSize="lg">
              Chris Evans
            </Heading>
            <Text color="gray.600">Product Manager</Text>
          </Box>
          {/* Add more team members as needed */}
        </Flex>
      </Box>
      <ContactUsButton/>
    </Box>
  );
}
