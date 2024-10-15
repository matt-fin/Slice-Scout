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
}

function MapCaller({ pizzerias }: MapProps) {
    return <LazyMap pizzerias={pizzerias}/>;
}

export default MapCaller;