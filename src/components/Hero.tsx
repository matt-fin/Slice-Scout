"use client";
import React from "react";
import { Box, Flex, Heading, Container, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Pizza_Icon from "../../public/pizza_icon.png";

// Pizza Icon Component with floating animation
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
        y: [0, -20, 0],
        rotate: [rotate, rotate + 10, rotate],
      }}
      transition={{
        duration: 3,
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

export default function Hero() {
  return (
    <Container
      maxW={"full"}
      paddingTop={"90px"}
      paddingBottom={"40px"}
      position="relative"
    >
      <Box position="relative" w="full" h="80vh" overflow="hidden">
        {/* Gradient Background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          background="linear-gradient(to bottom, #F4E2D8, #F9D57A, #FF6347)"
          zIndex={1}
          borderRadius={"50px"}
        />

        {/* Floating Pizza Icons */}
        {[
          { top: 5, left: 5, delay: 0, size: 60, rotate: 15, scale: 1 },
          { top: 15, left: 85, delay: 0.5, size: 50, rotate: -10, scale: 1.5 },
          { top: 25, left: 15, delay: 1, size: 70, rotate: 20, scale: 2 },
          { top: 35, left: 75, delay: 1.5, size: 55, rotate: -15, scale: 1.8 },
          { top: 45, left: 30, delay: 2, size: 65, rotate: 10, scale: 3 },
          { top: 55, left: 60, delay: 2.5, size: 45, rotate: -5, scale: 1.2 },
          { top: 65, left: 10, delay: 0.3, size: 55, rotate: 25, scale: 1.7 },
          { top: 75, left: 90, delay: 1.8, size: 50, rotate: -20, scale: 1.6 },
          { top: 80, left: 40, delay: 2.2, size: 60, rotate: 5, scale: 1 },
          { top: 90, left: 70, delay: 2.7, size: 40, rotate: -30, scale: 2.5 },
          { top: 10, left: 50, delay: 1.1, size: 70, rotate: 15, scale: 1.2 },
          { top: 30, left: 10, delay: 0.6, size: 60, rotate: -10, scale: 1.8 },
          { top: 50, left: 80, delay: 1.4, size: 65, rotate: 30, scale: 2 },
          { top: 70, left: 25, delay: 0.8, size: 55, rotate: -25, scale: 2.3 },
          { top: 85, left: 55, delay: 2.3, size: 50, rotate: 20, scale: 1.5 },
        ].map((props, index) => (
          <FloatingPizzaIcon key={index} {...props} />
        ))}

        {/* Centered Content Container */}
        <Flex
          position="relative"
          zIndex={2}
          w="full"
          h="full"
          align="center"
          justify="center"
        >
          <Stack
            as={Box}
            textAlign={"center"}
            py={{ base: 15, md: 25 }} // Halved from 20 and 36
            px={{ base: 3, md: 5 }} // Halved from 6 and 10
            bgColor={"rgba(255, 255, 255, 0.6)"}
            backdropFilter="blur(10px)"
            borderRadius={"30px"}
            width={{ base: "65%", md: "45%", lg: "40%" }} // Halved from 90%, 70%, and 60%
            height={{ base: "auto", md: "60%" }} // Halved from auto and 80%
            maxHeight="60vh" // Halved from 80vh
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="0 4px 6px rgba(0,0,0,0.1)"
          >
            <Heading
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              position="relative"
              mb={{ base: 4, md: 6 }}
            >
              Find the authentic <br />
              <Text
                as={"span"}
                bgGradient="linear(to-r, #FFA500, orange.600, red.600, darkred)"
                bgClip="text"
                fontWeight="bold"
              >
                99¢ Pizza
              </Text>
              &nbsp; near You.
            </Heading>
            <Text
              color={"gray.800"}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              mb={{ base: 4, md: 6 }}
            >
              Saving New Yorker's wallets,{" "}
              <Text as="span" color="green.600" fontWeight="bold">
                $1
              </Text>{" "}
              at a time.
            </Text>

            <Box width="100%" maxWidth="500px" px={{ base: 2, md: 4 }}>
              <SearchBar />
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Container>
  );
}
