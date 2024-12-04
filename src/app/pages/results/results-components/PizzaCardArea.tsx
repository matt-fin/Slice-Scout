'use client';
import React, { useState } from "react";
import Image from "next/image";
import {
    Box,
    SimpleGrid
} from "@chakra-ui/react";
import PizzaCard from "./PizzaCard"

interface Location {
    street_address: string;
    zip_code: string;
    latitude: number;
    longitude: number;
    borough: string;
}

interface Pizzeria {
    pizzeria_id: bigint;
    pizzeria_name: string;
    phone_num: string;
    open_time: string;
    closing_time: string;
    slice_price: number;
    rating: number;
    shop_url: string;
    reviews_url: string;
    location: Location;
}

interface PizzaCardAreaProps {
    pizzerias: Pizzeria[];
}

export default function PizzaCardArea({ pizzerias }: PizzaCardAreaProps){
    return (
        <Box 
            flex="1"
            width="100%"
            minWidth="400px"
            height={{base:"600px"}}
            border="2px"
            borderColor={"orange"}
            overflowY={"auto"}
            display="flex"              
            justifyContent="center"    
            alignItems="flex-start"
        >   
            <SimpleGrid 
                columns={2}
                spacing={8}
                alignItems="start"
                margin="22px 15px"
                >
                {pizzerias.map((pizzeria) => (
                    <PizzaCard
                    key={pizzeria.pizzeria_id.toString()}
                    name={pizzeria.pizzeria_name}
                    phone={pizzeria.phone_num}
                    hours={`${pizzeria.open_time} - ${pizzeria.closing_time}`}
                    address={`${pizzeria.location.street_address}, ${pizzeria.location.zip_code}, ${pizzeria.location.borough}`}
                    price={pizzeria.slice_price}
                    reviewsLink={pizzeria.reviews_url}
                    websiteLink={pizzeria.shop_url}
                    />
                ))}
            </SimpleGrid>
        </Box>
    )
}