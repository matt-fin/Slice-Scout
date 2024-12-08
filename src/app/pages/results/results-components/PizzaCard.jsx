"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  Stack as ChakraStack,
  Input,
  Image,
  Divider
} from "@chakra-ui/react";
import { PhoneIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PizzaCard({
  name,
  phone,
  hours,
  address,
  price,
  reviewsLink,
  websiteLink,
  latitude,
  longitude,
  images = [],
  priceHistory = []
}) {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  // Keep price history in a local state so we can update it.
  const [history, setHistory] = useState(priceHistory);

  // State for the detail modal
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // State for the separate vote modal
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("0.99");
  const [customPrice, setCustomPrice] = useState("");

  const openDetailModal = () => setIsDetailOpen(true);
  const closeDetailModal = () => {
    setIsDetailOpen(false);
  };

  const openVoteModal = () => {
    setSelectedPrice("0.99");
    setCustomPrice("");
    setIsVoteModalOpen(true);
  };
  
  const closeVoteModal = () => {
    setIsVoteModalOpen(false);
  };

  const handleVote = () => {
    const votedPrice = parseFloat(customPrice || selectedPrice);
    if (isNaN(votedPrice)) return;

    // Add the new entry to the price history
    const newEntry = {
      date: new Date().toISOString().slice(0,10), // e.g. "2024-06-01"
      price: votedPrice
    };

    setHistory(prev => [...prev, newEntry].sort((a,b) => new Date(a.date) - new Date(b.date))); 
    // Sorting ensures the chart remains chronological if needed

    console.log(`User voted for $${votedPrice} for ${name}`);
    // Here you could also make an API call to persist this data in your backend

    closeVoteModal();
  };

  const chartData = {
    labels: history.map((entry) => entry.date),
    datasets: [
      {
        label: 'Slice Price ($)',
        data: history.map((entry) => entry.price),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        tension: 0.1,
        pointRadius: 3,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Slice Price Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)'
        }
      }
    }
  };

  return (
    <>
      <Box
        maxW="sm"
        h="30vh"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={cardBg}
        color={textColor}
        position="relative"
        p={4}
        cursor="pointer"
        onClick={openDetailModal}
        _hover={{ boxShadow: "md" }}
      >
        <VStack align="start" spacing={3}>
          <Text fontSize="xl" fontWeight="semibold">
            {name}
          </Text>

          <HStack>
            <PhoneIcon />
            <Text textDecor={"underline"}><a href={`tel:${phone}`}>{phone}</a></Text>
          </HStack>

          <HStack>
            <TimeIcon />
            <Text>{hours}</Text>
          </HStack>

          <HStack>
            <InfoIcon />
              <a 
                href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
            <Text textDecor={"underline"}>{address}</Text>
              </a>
            </HStack>

            <HStack spacing={4} mt={4}>
              <Button as="a" href={reviewsLink} target="_blank" colorScheme="blue" size="sm">
                Reviews
              </Button>
              <Button as="a" href={websiteLink} target="_blank" colorScheme="green" size="sm">
                Website
              </Button>
            </HStack>
        </VStack>
      </Box>

      {/* Main Detail Modal */}
      <Modal 
        isOpen={isDetailOpen} 
        onClose={closeDetailModal} 
        size="6xl" 
        isCentered 
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} Details</ModalHeader>
          <ModalBody overflowY="auto" maxH="80vh">
            <VStack align="stretch" spacing={6}>
              {/* Info Section */}
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  {name}
                </Text>
                <HStack spacing={4}>
                  <HStack>
                    <PhoneIcon />
                    <Text>{phone}</Text>
                  </HStack>
                  <HStack>
                    <TimeIcon />
                    <Text>{hours}</Text>
                  </HStack>
                  <HStack>
                    <InfoIcon />
                    <a 
                      href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                    <Text textDecor={"underline"}>{address}</Text>
                    </a>
                  </HStack>

                  <HStack spacing={4} mt={4}>
                    <Button as="a" href={reviewsLink} target="_blank" colorScheme="blue" size="sm">
                      Reviews
                    </Button>
                    <Button as="a" href={websiteLink} target="_blank" colorScheme="green" size="sm">
                      Website
                    </Button>
                  </HStack>
                </HStack>
              </Box>

              <Divider />

              {/* Images Section */}
              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={2}>
                  Images
                </Text>
                <HStack spacing={4} overflowX="auto">
                  {images.length > 0 ? (
                    images.map((imgSrc, i) => (
                      <Image
                        key={i}
                        src={imgSrc}
                        alt={`${name} image ${i + 1}`}
                        boxSize="200px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    ))
                  ) : (
                    <Text>No images available</Text>
                  )}
                </HStack>
              </Box>

              <Divider />

              {/* Chart and Price History Section */}
              <Box height="300px">
                <Text fontSize="xl" fontWeight="semibold" mb={2}>
                  Slice Price History
                </Text>
                {history.length ? (
                  <Box width="100%" height="100%">
                    <Line data={chartData} options={chartOptions} />
                  </Box>
                ) : (
                  <Text>No price history available</Text>
                )}
              </Box>

              <Divider />

              {/* Vote on Slice Price Button */}
              <Box>
                <Button colorScheme="orange" onClick={openVoteModal}>
                  Vote on Slice Price
                </Button>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeDetailModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Separate Vote Modal */}
      <Modal
        isOpen={isVoteModalOpen}
        onClose={closeVoteModal}
        isCentered
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vote for Slice Price</ModalHeader>
          <ModalBody>
            <Text mb={4}>
              What is the price of the cheapest regular pizza slice at this location?
            </Text>
            <RadioGroup onChange={setSelectedPrice} value={selectedPrice}>
              <ChakraStack direction="column">
                <Radio value="0.99">$0.99</Radio>
                <Radio value="1.50">$1.50</Radio>
                <Radio value="2.00">$2.00</Radio>
                <Radio value="3.00">$3.00</Radio>
                <Radio value="4.00">$4.00</Radio>
                <Radio value="5.00">$5.00</Radio>
                <Radio value="other">Other</Radio>
              </ChakraStack>
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
            <Button onClick={closeVoteModal} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PizzaCard;