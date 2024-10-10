'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./components/Hero";
import { SimpleGrid } from '@chakra-ui/react';
import PizzaCard from './components/PizzaCard'; // Adjust the import path as needed

const pizzaShops = [
  {
    name: "Joe's Pizza",
    phone: "(555) 123-4567",
    hours: "10:00 PM",
    address: "123 Main St, New York, NY",
    price: 2,
    reviewsLink: "https://g.page/joespizzanyc",
    websiteLink: "https://www.joespizzanyc.com/"
  },
  {
    name: "Pizza Hut",
    phone: "(555) 987-6543",
    hours: "11:00 PM",
    address: "456 Elm St, Chicago, IL",
    price: 1,
    reviewsLink: "https://www.google.com/maps/place/Pizza+Hut",
    websiteLink: "https://www.pizzahut.com/"
  },
  {
    name: "Domino's Pizza",
    phone: "(555) 246-8108",
    hours: "1:00 AM",
    address: "789 Oak St, Los Angeles, CA",
    price: 1,
    reviewsLink: "https://www.google.com/maps/place/Domino's+Pizza",
    websiteLink: "https://www.dominos.com/"
  },
  {
    name: "Artisanal Pizza Co.",
    phone: "(555) 369-2587",
    hours: "9:00 PM",
    address: "101 Pine St, San Francisco, CA",
    price: 3,
    reviewsLink: "https://g.page/artisanal-pizza-co",
    websiteLink: null
  }
];

const PizzaCardDemo = () => {
  return (
    <SimpleGrid columns={[1, null, 2]} spacing={6} p={4}>
      {pizzaShops.map((shop, index) => (
        <PizzaCard key={index} {...shop} />
      ))}
    </SimpleGrid>
  );
};

export default function Home() {
  return (
    <main>
      <Hero />
      <PizzaCardDemo />
    </main>
  );
}
