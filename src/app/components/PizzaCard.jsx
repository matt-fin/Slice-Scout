import React from 'react';
import { Box, VStack, HStack, Text, Badge, Button, useColorModeValue } from '@chakra-ui/react';
import { PhoneIcon, TimeIcon, InfoIcon } from '@chakra-ui/icons';

const PriceIndicator = ({ price }) => {
  const bgColor = useColorModeValue('green.100', 'green.900');
  const textColor = useColorModeValue('green.800', 'green.100');
  
  const getColor = (level) => {
    const colors = ['green.300', 'green.500', 'green.700'];
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
  websiteLink
}) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

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
      </VStack>
    </Box>
  );
};

export default PizzaCard;