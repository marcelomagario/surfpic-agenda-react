"use client";

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Mapa() {
  const [sessoes, setSessoes] = useState([]);
  const [selectedSessao, setSelectedSessao] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/sessao')
      .then(response => {
        setSessoes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar sessões:', error);
      });
  }, []);

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: -24.013071122797122, 
    lng: -46.27300779405361
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {sessoes.map(sessao => (
          <Marker 
            key={sessao.}
            position={{ lat: sessao.latitude, lng: sessao.longitude }}
            onClick={() => {
              setSelectedSessao(sessao);
            }}
          />
        ))}

        {selectedSessao && (
          <InfoWindow
            position={{ lat: selectedSessao.latitude, lng: selectedSessao.longitude }}
            onCloseClick={() => {
              setSelectedSessao(null);
            }}
          >
            <div>
              <p>Início da sesh: {selectedSessao.hora_inicial}</p>
              <p>Fico até as: {selectedSessao.hora_final}</p>
              <p>Fotografo: {selectedSessao.nome}</p>
              <p>Praia: {selectedSessao.nome_praia}</p>
              <p>Latitude: {selectedSessao.latitude}</p>
              <p>Longitude: {selectedSessao.longitude}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}