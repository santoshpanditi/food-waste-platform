import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { FoodListing } from '../contexts/FoodDataContext';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  listings: FoodListing[];
  onSelectListing?: (id: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ listings, onSelectListing }) => {
  const center: [number, number] = [28.6139, 77.2090]; // New Delhi, India

  // Filter listings with coordinates
  const listingsWithCoords = listings.filter(l => l.latitude && l.longitude);

  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={6} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {listingsWithCoords.map(listing => (
          <React.Fragment key={listing.id}>
            <Circle center={[listing.latitude!, listing.longitude!]} radius={500} />
            <Marker position={[listing.latitude!, listing.longitude!]} eventHandlers={{ click: () => onSelectListing?.(listing.id) }}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>{listing.title}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px' }}>
                    {listing.quantity} {listing.unit}
                  </p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#667eea' }}>
                    {listing.location}
                  </p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};
