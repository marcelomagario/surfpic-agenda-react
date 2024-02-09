"use client";

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Sessao() {
  const [sessoes, setSessoes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/sessao')
      .then(response => {
        setSessoes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar sessões:', error);
      });
  }, []);
  return (
    <div>
      <h1>Sessões</h1>
      {sessoes.map(sessao => (
        <div key={sessao.id}>
          <h2>{sessao.data}</h2>
          <p>Praia: {sessao.nome_praia}</p>
          <p>Início da sesh: {sessao.hora_inicial}</p>
          <p>Fico até as: {sessao.hora_final}</p>
          <p>Fotografo: {sessao.nome}</p>
          <p>Insta: {sessao.instagram}</p>
          <p>ZAP: {sessao.whatsapp}</p>
          <p>E-mail: {sessao.email}</p>
          <p>Link: {sessao.email}</p>

        </div>
      ))}
    </div>
  );
}

export default function Mapa() {
  const [sessoes, setSessoes] = useState([]);
  const [selectedSessao, setSelectedSessao] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:3001/sessao')
      .then(response => {
        setSessoes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar sessões:', error);
      });
  }, []);

  useEffect(() => {
    if (mapRef.current && sessoes.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      sessoes.forEach(sessao => {
        bounds.extend(new window.google.maps.LatLng(sessao.latitude, sessao.longitude));
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [mapRef, sessoes]);

  const containerStyle = {
    width: '50%',
    height: '50vh'
  };

  return (
    <div>
      <Sessao />
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={16}
          onLoad={map => mapRef.current = map}
        >
          {sessoes.map(sessao => (
            <Marker 
              key={sessao.sessao_id}
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
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}