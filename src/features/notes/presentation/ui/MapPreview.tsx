import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {type LatLngExpression} from 'leaflet';
import { useEffect } from 'react';

export const PrefetchTiles = () => {
    const map = useMap();

    useEffect(() => {
        // Need to trigger this to cache the tiles on initial render
        navigator.serviceWorker.ready.then(() => {
            map.whenReady(() => {
                const currentZoom = map.getZoom();
                map.setZoom(currentZoom - 1);
                map.setZoom(currentZoom);
            });
        });
    }, [map]);

    return null;
};

type Props = {
    lat: number;
    lng: number;
};

export const MapPreview = ({ lat, lng }: Props) => {
    const center: LatLngExpression = [lat, lng];

    return (
        <MapContainer
            center={center}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '200px', width: '100%', borderRadius: '0.5rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
                <Popup>Installation site</Popup>
            </Marker>
            <PrefetchTiles />
        </MapContainer>
    );
};
