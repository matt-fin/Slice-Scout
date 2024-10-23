//Need to lazy load map component

'use client';

import dynamic from 'next/dynamic';
import * as T from '@/libs/types'

const LazyMap = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});



interface MapProps {
    pizzerias: T.Pizzeria[];
    location: T.Location;
    handlePizzeriaSelection: (id: number) => void;
}

function MapCaller(props: MapProps) {
    return <LazyMap {...props}/>;
}

export default MapCaller;