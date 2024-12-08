"use client";

import React from "react";
import {
    Box,
    SimpleGrid
} from "@chakra-ui/react";
import PizzaCard from "./PizzaCard"

export default function PizzaCardArea(){

    const testCard = () => {
        return (
          <PizzaCard
            name="Johnny's Pizzeria"
            phone="(718) 492-9735"
            hours="11pm EST"
            address="5806 5th Ave, Brooklyn, NY 11220"
            latitude={40.6411441}
            longitude={-74.0155299}
            price={2}
            reviewsLink="https://www.yelp.com/biz/johnnys-pizzeria-brooklyn-2"
            websiteLink="http://www.johnnyspizzeria.com/"
            images={[
              // Uncomment these once you have actual images to display
              // "/images/johnnys_1.jpg",
              "/pizza1.jpg",
              "/pizza2.jpg",
              "/pizza3.jpg"
            ]}
            priceHistory={[
              { date: "2024-01-01", price: 2.00 },
              { date: "2024-02-01", price: 2.25 },
              { date: "2024-03-01", price: 2.50 },
              { date: "2024-04-01", price: 2.75 },
              { date: "2024-05-01", price: 3.00 },
            ]}
          />
        )
    }

    return (
        <Box 
            flex="1"
            width="100%"
            minWidth="400px"
            height={{base:"600px"}}
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