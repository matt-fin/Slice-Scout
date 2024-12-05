import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Text,
  Input,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { PhoneIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons";

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

  // State for the modal, selected price, and custom price
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("0.99");
  const [customPrice, setCustomPrice] = useState(""); // Fix: Define customPrice and setCustomPrice

  // Functions to handle modal opening and closing
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleVote = () => {
    console.log(`User voted for $${customPrice || selectedPrice} for ${name}`);
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

        <Button onClick={openModal} colorScheme="orange" mt={4}>
          Vote on Slice Price
        </Button>
      </VStack>


      {/* Modal for Voting */}
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Vote for Slice Price</ModalHeader>
    <ModalBody>
      <Text mb={4}>
        What is the price of the cheapest regular pizza slice at this location?
      </Text>
      <RadioGroup onChange={setSelectedPrice} value={selectedPrice}>
        <Stack direction="column">
          <Radio value="0.99">$0.99</Radio>
          <Radio value="1.50">$1.50</Radio>
          <Radio value="2.00">$2.00</Radio>
          <Radio value="3.00">$3.00</Radio>
          <Radio value="4.00">$4.00</Radio>
          <Radio value="5.00">$5.00</Radio>
          <Radio value="other">Other</Radio>
        </Stack>
      </RadioGroup>
      {selectedPrice === "other" && (
        <Box mt={4}>
          <Text mb={2}>Enter the price you observed:</Text>
          <Input
            placeholder="Enter price (e.g., 1.25)"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
          />
        </Box>
      )}
    </ModalBody>
    <ModalFooter>
      <Button
        colorScheme="orange"
        onClick={handleVote}
        isDisabled={selectedPrice === "other" && !customPrice}
      >
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