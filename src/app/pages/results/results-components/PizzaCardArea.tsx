"use client";

import React from "react";
import {
    Box,
    SimpleGrid,
} from "@chakra-ui/react";
import PizzaCard from "./PizzaCard"

    // const testCard = () => {
    //     return (
    //       <PizzaCard
    //         id={3}
    //         name="Johnny's Pizzeria"
    //         phone="(718) 492-9735"
    //         hours="11pm EST"
    //         address="5806 5th Ave, Brooklyn, NY 11220"
    //         latitude={40.6411441}
    //         longitude={-74.0155299}
    //         price={2}
    //         reviewsLink="https://www.yelp.com/biz/johnnys-pizzeria-brooklyn-2"
    //         websiteLink="http://www.johnnyspizzeria.com/"
    //         images={[
    //           // Uncomment these once you have actual images to display
    //           // "/images/johnnys_1.jpg",
    //           "/pizza1.jpg",
    //           "/pizza2.jpg",
    //           "/pizza3.jpg"
    //         ]}
    //         priceHistory={[
    //           { date: "2024-01-01", price: 2.00 },
    //           { date: "2024-02-01", price: 2.25 },
    //           { date: "2024-03-01", price: 2.50 },
    //           { date: "2024-04-01", price: 2.75 },
    //           { date: "2024-05-01", price: 3.00 },
    //         ]}
    //       />
    //     )
    // }
export default function PizzaCardArea({ pizzerias }){

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
                {pizzerias.map((pizzeria) => (
                    <PizzaCard
                    key={pizzeria.pizzeria_id.toString()}
                    name={pizzeria.pizzeria_name}
                    phone={pizzeria.phone_num}
                    hours={`${pizzeria.open_time ? pizzeria.open_time : ''} - ${pizzeria.closing_time ? pizzeria.closing_time : ''}`}
                    address={`${pizzeria.building_number} ${pizzeria.street_address}, ${pizzeria.borough}, New York, ${pizzeria.zip_code}`}
                    price={pizzeria.slice_price}
                    reviewsLink={pizzeria.reviews_url}
                    websiteLink={pizzeria.shop_url}
                    latitude={pizzeria.latitude}
                    longitude={pizzeria.longitude}
                    />
                ))}
            </SimpleGrid>
        </Box>
        
    )
};