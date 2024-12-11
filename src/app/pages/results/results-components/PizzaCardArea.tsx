"use client";

import React from "react";
import {
    Box,
    SimpleGrid
} from "@chakra-ui/react";
import PizzaCard from "./PizzaCard"


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
                {pizzerias.map((pizzeria) => {
                    let meanPrices = [];
                    if (pizzeria.mean_prices && pizzeria.mean_prices.length)
                    {
                        meanPrices = pizzeria.mean_prices.map(priceHist => ({price: priceHist.mean_price, date: priceHist.timestamp.substring(0, 10)}));
                    }
                    return (                        
                        <PizzaCard
                            key={pizzeria.pizzeria_id}
                            id={pizzeria.pizzeria_id}
                            name={pizzeria.pizzeria_name}
                            phone={pizzeria.phone_num}
                            hours={`${pizzeria.open_time} - ${pizzeria.closing_time}`}
                            address={`${pizzeria.building_number} ${pizzeria.street_address}, ${pizzeria.borough}, New York, ${pizzeria.zip_code}`}
                            price={pizzeria.slice_price}
                            reviewsLink={pizzeria.reviews_url}
                            websiteLink={pizzeria.shop_url}
                            latitude={pizzeria.latitude}
                            longitude={pizzeria.longitude}
                            priceHistory={meanPrices}
                        />
                    );
                })}
            </SimpleGrid>
        </Box>
    )
}