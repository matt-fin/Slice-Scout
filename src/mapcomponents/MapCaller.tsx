import Map from "./Map";
import * as T from "../libs/types";

interface MapCallerProps {
  pizzerias: T.Pizzeria[];
  handlePizzeriaSelection: (id: bigint) => void;
  centerCoordinates: [number, number]; // Center coordinates for the map
}

export default function MapCaller({
  pizzerias,
  handlePizzeriaSelection,
  centerCoordinates,
}: MapCallerProps) {
  return (
    <Map
      pizzerias={pizzerias}
      handlePizzeriaSelection={handlePizzeriaSelection}
      centerCoordinates={centerCoordinates} // Pass center coordinates to `Map`
    />
  );
}