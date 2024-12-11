"use client"
import React from "react";
import { motion } from "framer-motion";
import ContactUsButton from "@/components/ContactUsButton";
import Pizza_Icon from "../../../../public/pizza_icon.png";
import Jack_Headshot from "../../../../public/Jack.jpeg";
import Rei_Headshot from "../../../../public/Rei.png";
import Tor_Headshot from "../../../../public/Tor.jpeg";
import Matthew_Headshot from "../../../../public/Matthew.jpeg";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image as ChakraImage,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";

// Pizza Icon Component with random floating animation
const FloatingPizzaIcon = ({
  size = 50,
  top,
  left,
  delay = 0,
  rotate = 0,
  scale = 1,
}) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        zIndex: 1,
        transform: `rotate(${rotate}deg) scale(${scale})`,
      }}
      animate={{
        x: [0, 20, -20, 0],
        y: [0, -20, 20, 0],
        rotate: [rotate, rotate + 10, rotate - 10, rotate],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <Image
        src={Pizza_Icon}
        alt="Pizza Icon"
        width={size}
        height={size}
        style={{
          transform: `rotate(${rotate}deg)`,
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
};

export default function About() {
  return (
    <Box position="relative" overflow="hidden" bg="gray.50">
      {/* Centered Gradient Background */}
      <Box position="relative" width="90%" mx="auto" overflow="hidden">
        <Box
          position="absolute"
          top="165px"
          left="0"
          right="0"
          height="500px"
          background="linear-gradient(to bottom, #F4E2D8, #F9D57A, #FF6347)"
          zIndex={1}
          borderRadius="50px"
        />

        <Box
          padding={{ base: "50px", md: "100px" }}
          maxW="1200px"
          mx="auto"
          position="relative"
          zIndex={2}
        >
          {/* Header Section */}
          <Box textAlign="center" mb="16">
            <Heading
              as="h1"
              fontSize="5xl"
              fontWeight="bold"
              mb="4"
              bgGradient="linear(to-r, #FFA500, orange.600, red.600, darkred)"
              bgClip="text"
            >
              About Slice Scout
            </Heading>
            <Text fontSize="lg" color="#8B0000">
              Bringing back NYC's iconic 99¢ pizza tradition, one slice at a
              time.
            </Text>
          </Box>

          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            mb="24"
            gap="8"
            position="relative"
            zIndex={3}
          >
            {/* Logo Image */}
            <Box
              position="relative"
              width={{ base: "100%", md: "50%" }}
              maxW="500px"
            >
              <ChakraImage
                src="/slicescoutlogo.png"
                alt="NYC Pizza"
                borderRadius="lg"
                objectFit="cover"
                width="100%"
                shadow="lg"
              />

              {/* Pizza Icons Container */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                zIndex={4}
                overflow="hidden"
              >
                {[
                  {
                    top: 10,
                    left: 10,
                    delay: 0,
                    size: 40,
                    rotate: 15,
                    scale: 1,
                  },
                  {
                    top: 20,
                    left: 70,
                    delay: 0.5,
                    size: 50,
                    rotate: -10,
                    scale: 1.2,
                  },
                  {
                    top: 50,
                    left: 30,
                    delay: 1,
                    size: 60,
                    rotate: 20,
                    scale: 1.5,
                  },
                  {
                    top: 80,
                    left: 60,
                    delay: 1.5,
                    size: 45,
                    rotate: -15,
                    scale: 0.9,
                  },
                ].map((props, index) => (
                  <FloatingPizzaIcon key={index} {...props} />
                ))}
              </Box>
            </Box>

            {/* Mission Section */}
            <Stack
              spacing="6"
              maxW="600px"
              bg="rgba(255,165,0,0.2)"
              p="6"
              borderRadius="lg"
              backdropFilter="blur(15px)"
              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              textAlign="left"
            >
              <Heading
                as="h2"
                fontSize="3xl"
                color="#8B0000"
              >
                Our Mission
              </Heading>
              <Text fontSize="lg" color="#8B0000" fontWeight="bold">
                Slice Scout was created by a group of NYC-based college students
                who share a deep love for 99¢ pizza—a true New York City staple.
                Our mission is simple: to help New Yorkers find affordable,
                authentic slices amidst rising prices while preserving this
                cherished tradition for generations to come.
              </Text>
            </Stack>
          </Flex>

          {/* What We Offer Section */}
          <Box mb="24" position="relative" zIndex={3}>
            <Heading
              as="h2"
              fontSize="3xl"
              textAlign="center"
              mb="8"
              bgGradient="linear(to-r, #FFA500, orange.600, red.600, darkred)"
              bgClip="text"
            >
              What We Offer
            </Heading>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-around"
              gap="8"
              wrap="wrap"
            >
              {[
                {
                  title: "Real-Time Map",
                  description:
                    "Explore NYC pizza shops on a live map, categorized by the actual price of a regular slice.",
                },
                {
                  title: "User Reports",
                  description:
                    "Submit and update slice prices at your favorite pizza spots to keep our database accurate and up-to-date.",
                },
                {
                  title: "Notifications",
                  description:
                    "Receive alerts when prices change at nearby pizza shops, so you're always in the know.",
                },
              ].map((feature, index) => (
                <Box
                  key={index}
                  textAlign="center"
                  maxW="300px"
                  p="4"
                  bg="#FF4500"
                  borderRadius="lg"
                  shadow="xl"
                  color="white"
                >
                  <Heading as="h3" fontSize="xl" mb="4" color="white">
                    {feature.title}
                  </Heading>
                  <Text fontSize="md">{feature.description}</Text>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Our Story Section */}
          <Box textAlign="center" mb="24" position="relative" zIndex={3}>
            <Box
              position="absolute"
              top="-30px"
              left="50%"
              transform="translateX(-50%) rotate(5deg)"
              width="80%"
              height="120%"
              bg="red.500"
              zIndex={1}
              borderRadius="lg"
            />
            <Box
              position="absolute"
              top="-30px"
              left="50%"
              transform="translateX(-50%)"
              width="90%"
              height="130%"
              bg="#FF4500"
              zIndex={2}
              borderRadius="lg"
            />
            <Heading
              as="h2"
              fontSize="3xl"
              mb="6"
              position="relative"
              zIndex={3}
              backgroundColor={"white"}
              bgClip="text"
            >
              Our Story
            </Heading>
            <Text
              fontSize="lg"
              color="white"
              maxW="800px"
              mx="auto"
              position="relative"
              zIndex={3}
            >
              Slice Scout was inspired by the cheap pizza purge NYC experienced
              after COVID-19 and inflation. As students at CUNY, we've relied on
              99¢ pizza to get through tight budgets and late-night study
              sessions. We saw the need to create a resource for finding
              traditional 99¢ slices amidst rising prices and the confusion caused by
              misleading shop names.
            </Text>
          </Box>

          {/* Team Section */}
          <Box position="relative" zIndex={3} mt={16}>
            <Heading
              as="h2"
              fontSize="3xl"
              textAlign="center"
              mb="8"
              bgGradient="linear(to-r, #FFA500, orange.600, red.600, darkred)"
              bgClip="text"
            >
              Meet the Development Team
            </Heading>
            <Flex
              wrap={{ base: "wrap", md: "nowrap" }}
              justify="center"
              gap="8"
              flexDirection={{ base: "column", md: "row" }}
            >
              {[
                { name: "Matthew Finamore", image: Matthew_Headshot },
                { name: "Jack Hachicho", image: Jack_Headshot },
                { name: "Tor Sdayur", image: Tor_Headshot },
                { name: "Rei Zheng", image: Rei_Headshot },
              ].map((member, index) => (
                <Flex
                  key={index}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  width="100%"
                  maxWidth="250px"
                >
                  <ChakraImage
                    src={member.image.src}
                    alt={member.name}
                    boxSize="150px"
                    borderRadius="full"
                    mb="4"
                    shadow="2xl"
                  />
                  <Heading as="h3" fontSize="lg" color="black" mb="2">
                    {member.name}
                  </Heading>
                </Flex>
              ))}
            </Flex>
          </Box>

          <Box textAlign="center" mt="12" position="relative" zIndex={3}>
            <ContactUsButton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}