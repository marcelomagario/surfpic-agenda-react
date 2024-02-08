"use client";

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

export default function Intro() {
  const position = { lat: -24.013071122797122, lng: -46.27300779405361 };
  const [isOpen, setIsOpen] = useState(false);
  const [iconSize, setIconSize] = useState(null);

  useEffect(() => {
    if (window.google) {
      setIconSize(new window.google.maps.Size(50, 50));
    }
  }, []);

  const mapStyles = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    }
  ];

  const containerStyle = {
    width: '50%',
    height: '50vh'
  };

  return (
    <LoadScript googleMapsApiKey=''>
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={16}
          options={{ 
            styles: mapStyles,
            mapTypeId: 'satellite'
          }}
        >
          <Marker 
            position={position} 
            onClick={() => setIsOpen(true)}
            icon={{
              url: '/path/to/icon.svg', // substitua por seu próprio ícone
              scaledSize: iconSize
            }}
          >
            {isOpen && (
              <InfoWindow onCloseClick={() => setIsOpen(false)}>
                <div>
                  <h4>Informações do local</h4>
                  <p>Algumas informações sobre este local.</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </div>
    </LoadScript>
  );
}