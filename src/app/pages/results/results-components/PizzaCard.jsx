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

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { createClient } from "@supabase/supabase-js";
// Import a default or custom icon if you want
// Example: const pizzaIcon = new Icon({ iconUrl: '/pizza_mapicon.png', iconSize: [25, 41] });

// Register chart components
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
  id,
  name,
  phone,
  hours,
  address,
  price,
  reviewsLink,
  websiteLink,
  images = [],
  priceHistory = [],
  latitude,
  longitude
}) {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const [history, setHistory] = useState(priceHistory);

  // Detail modal states
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Vote modal states
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("0.99");
  const [customPrice, setCustomPrice] = useState("");

  const openDetailModal = () => setIsDetailOpen(true);
  const closeDetailModal = () => setIsDetailOpen(false);

  const openVoteModal = () => {
    setSelectedPrice("0.99");
    setCustomPrice("");
    setIsVoteModalOpen(true);
  };
  
  const closeVoteModal = () => {
    setIsVoteModalOpen(false);
  };

  const handleVote = async () => {
    const votedPrice = parseFloat(customPrice || selectedPrice);
    if (isNaN(votedPrice)) return;

    const newEntry = {
      date: new Date().toISOString().slice(0,10),
      price: votedPrice
    };

    //checks if price with associated pizzeria exists
    const { data, error } = await supabase
    .from('prices')
    .select()
    .eq('pizzeria_id', id)
    .eq('price', votedPrice);
    
    //price exists for current pizzeria
    if (data !== null && data.length) {
      const {error} = await supabase.rpc('increment_price', { row_id: data[0]["id"] })
    }
    else {
      const { error } = await supabase
                          .from('prices')
                          .insert({ pizzeria_id: id, price: votedPrice, votes: 1 });
    }

    setHistory(prev => [...prev, newEntry].sort((a,b) => new Date(a.date) - new Date(b.date)));
    console.log(`User voted for $${votedPrice} for ${name}`);

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
      legend: { position: 'bottom' },
      title: { display: true, text: 'Slice Price Over Time' },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price ($)' } }
    }
  };

  const latestPrice = history.length > 0 ? history[history.length - 1].price : null;

  return (
    <>
      <Box
        maxW="sm"
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
        {latestPrice !== null && (
          <Box
            position="absolute"
            top="4px"
            right="4px"
            bg="orange.200"
            px={2}
            py={1}
            borderRadius="md"
            fontWeight="bold"
          >
            ${latestPrice.toFixed(2)}
          </Box>
        )}

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
            <Text>{hours}</Text>
          </HStack>

          <HStack>
            <InfoIcon />
            <Text>{address}</Text>
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
            {/* Use a horizontal layout (HStack) to display info + chart on the left and map on the right */}
            <HStack align="start" spacing={6}>
              <VStack align="stretch" spacing={6} flex="2">
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
                      <Text>{address}</Text>
                    </HStack>
                  </HStack>
                </Box>



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

              {/* Map Section - Right Side */}
              <Box flex="1" minWidth="300px" height="600px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                {latitude && longitude ? (
                  <MapContainer
                    center={[latitude, longitude]}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[latitude, longitude]}>
                    </Marker>
                  </MapContainer>
                ) : (
                  <Text>No coordinates available for mapping</Text>
                )}
              </Box>
            </HStack>
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