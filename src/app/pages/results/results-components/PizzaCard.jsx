"use client";
import React, { useState } from "react";
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

const PriceIndicator = ({ price }) => {
  const bgColor = useColorModeValue("green.100", "green.900");
  const textColor = useColorModeValue("green.800", "green.100");

  const getColor = (level) => {
    const colors = ["green.300", "green.500", "green.700"];
    return colors[level - 1] || colors[0];
  };

  return (
    <Badge
      position="absolute"
      top={2}
      right={2}
      px={2}
      py={1}
      borderRadius="full"
      bg={bgColor}
      textTransform="uppercase"
      fontSize="xs"
      fontWeight="bold"
    >
      {Array.from({ length: price }).map((_, i) => (
        <Text as="span" key={i} color={getColor(i + 1)}>
          $
        </Text>
      ))}
    </Badge>
  );
};

const PizzaCard = ({
  name,
  phone,
  hours,
  address,
  price,
  reviewsLink,
  websiteLink,
}) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  // State for the modal and the selected price
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("0.99");

  // Functions to handle modal opening and closing
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleVote = () => {
    console.log(`User voted for $${selectedPrice} for ${name}`);
    closeModal();
    // Add API call or state update here to record the vote
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
      <PriceIndicator price={price} />

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
            <Text mb={4}>What do you think the price of a regular slice should be?</Text>
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