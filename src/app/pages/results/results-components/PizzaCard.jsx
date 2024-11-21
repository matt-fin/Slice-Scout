"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { PhoneIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons";

const PizzaCard = ({
  name,
  phone,
  hours,
  address,
  reviewsLink,
  websiteLink,
  initialPrice = "Unknown", // Placeholder for the initial price
}) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  // States for the modal and selected price
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("0.99");
  const [lastVotedPrice, setLastVotedPrice] = useState(initialPrice);

  // Functions to handle modal opening and closing
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleVote = async () => {
    try {
      // Simulate API call or state update
      setLastVotedPrice(selectedPrice);
      console.log(`Voted for ${selectedPrice} for ${name}`);
      // Example of making an API call:
      // await fetch('/api/vote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, price: selectedPrice }),
      // });
    } catch (error) {
      console.error("Error submitting vote:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      color={textColor}
      position="relative"
      p={4}
    >
      {/* Display the last voted price */}
      <Badge
        position="absolute"
        top={2}
        right={2}
        px={2}
        py={1}
        borderRadius="full"
        bg="orange.100"
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="bold"
      >
        {lastVotedPrice !== "Unknown"
          ? `$${lastVotedPrice}`
          : "No votes yet"}
      </Badge>

      <VStack align="start" spacing={3}>
        <Text fontSize="xl" fontWeight="semibold">
          {name}
        </Text>

        <HStack>
          <PhoneIcon />
          <Text>{phone}</Text>
        </HStack>

        <HStack>
          <TimeIcon />
          <Text>Closes at: {hours}</Text>
        </HStack>

        <HStack>
          <InfoIcon />
          <Text>{address}</Text>
        </HStack>

        <HStack spacing={4} mt={4}>
          <Button as="a" href={reviewsLink} target="_blank" colorScheme="blue" size="sm">
            Reviews
          </Button>
          {websiteLink && (
            <Button as="a" href={websiteLink} target="_blank" colorScheme="green" size="sm">
              Website
            </Button>
          )}
        </HStack>

        {/* Add the Vote button */}
        <Button onClick={openModal} colorScheme="orange" mt={4}>
          Vote on Slice Price
        </Button>
      </VStack>

      {/* Modal for Voting */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vote for Slice Price</ModalHeader>
          <ModalBody>
            <Text mb={4}>What is the price of the cheapest regular slice at this location?</Text>
            <RadioGroup onChange={setSelectedPrice} value={selectedPrice}>
              <Stack direction="column">
                <Radio value="0.99">$0.99</Radio>
                <Radio value="1.50">$1.50</Radio>
                <Radio value="2.00">$2.00</Radio>
                <Radio value="3.00">$3.00</Radio>
                <Radio value="4.00">$4.00</Radio>
                <Radio value="5.00">$5.00</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={handleVote}>
              Submit Vote
            </Button>
            <Button onClick={closeModal} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PizzaCard;