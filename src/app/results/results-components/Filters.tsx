'use client';
import React, { useState } from "react";
import Image from "next/image";
import {
    Text,
    Box,
    Stack,
    Checkbox,
    HStack,
    Slider,
    SliderFilledTrack,
    IconButton,
    SliderThumb,
    SliderTrack
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';

export default function Filters() {

    const [isOpened, setIsOpened] = useState(false);
    const [rating, setRating] = useState(null);
    const [price, setPrice] = useState(1);

    const handlePriceChange = (value) => {
        setPrice(value);
    };

return (
    <Box 
        width="200px" 
        height="400px" 
        border="2px" 
        borderColor="gray.200" 
        borderRadius={"20px"} 
        padding="15px" 
        bg={"orange.100"}>
    <Text 
        fontSize={"lg"} 
        fontWeight={"bold"}
    >
        Filters Menu
    </Text>
    <br/>
    <Stack>
        <Checkbox
            isChecked={isOpened}
            onChange={() => setIsOpened(!isOpened)}
        >
            Open Now
        </Checkbox>
    </Stack>
    <br/>
    <Text>Rating</Text>
    <HStack spacing={0.5}>
        {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
                key={star}
                aria-label={`${star} star`}
                icon={<StarIcon color={star <= rating ? 'yellow.400' : 'blue.300'} />}
                onClick={() => setRating(star)}
                variant="outline"
                size="sm"
            />
      ))}
    </HStack>
    <br/>
    <Text>Price</Text>
    
    <Slider
        min={1}
        max={5}
        value={price}
        onChange={handlePriceChange}

    >
        <SliderTrack>
            <SliderFilledTrack/>
        </SliderTrack>
        <SliderThumb/>
    </Slider>
        <HStack justify="space-between">
            <Text>Price: ${price}</Text>
        </HStack>
        <br/>
        reset button
    </Box>
    )
}