import Image from "next/image";
import styles from "./page.module.css";
import MapCaller from '@/components/Map/MapCaller';

//mock data
const pizzerias = [
  {
      id: 25,
      name: "Bob's Pizza",
      location: {
          latitude: 40,
          longitude: -73,
      }
  }
];

export default function Home() {
  return (
    <MapCaller pizzerias={pizzerias} />
  );
}
