'use client';
import React, { useState } from "react";
import Image from "next/image";
import {
    Container,
    Box,
    Text,
    Grid,
    GridItem,
    SimpleGrid
} from "@chakra-ui/react";
import PizzaCard from "./PizzaCard"


export default function PizzaCardArea(){

    const testCard = () => {
        return(
            <PizzaCard
                name="Johnny's Pizzeria"
                phone="(718) 492-9735"
                hours="11pm EST"
                address="5806 5th Ave, Brooklyn, NY 11220"
                price={2}
                reviewsLink="https://www.yelp.com/biz/johnnys-pizzeria-brooklyn-2"
                websiteLink="http://www.johnnyspizzeria.com/"/>
        )
    }
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
                {testCard()}
                {testCard()}
                {testCard()}
                {testCard()}
                {testCard()}
                {testCard()}
                {testCard()}
                {testCard()}
            </SimpleGrid>
        </Box>
    )
}