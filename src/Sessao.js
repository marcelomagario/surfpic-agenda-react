"use client";

import './Stylesheet.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Sessao() {
  const [sessoes, setSessoes] = useState([]);
  const [sessaoSelecionadaNaLista, setSessaoSelecionadaNaLista] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:3001/sessao')
      .then(response => {
        setSessoes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar sessões:', error);
      });
  }, []);

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

const dataAtual = new Date();

return (
  <div>
    <h1 class='h1'>Sessões</h1>
    {sessoes.map(sessao => {
      const dataSessao = new Date(sessao.data);
      if (dataSessao >= dataAtual) {
        return (
          <div class='sessao' key={sessao.sessao_id}>
             <h2 onClick={() => {
              if (sessaoSelecionadaNaLista === sessao.sessao_id) {
                setSessaoSelecionadaNaLista(null); // Esconde as informações se a sessão já está selecionada
              } else {
                setSessaoSelecionadaNaLista(sessao.sessao_id); // Mostra as informações se a sessão não está selecionada
              }
            }}>
              {formatDate(sessao.data)}
            </h2>
            {sessaoSelecionadaNaLista === sessao.sessao_id && (
              <>
                <p>Praia: {sessao.nome_praia}</p>
                <p>Início da sesh: {sessao.hora_inicial}</p>
                <p>Fico até as: {sessao.hora_final}</p>
                <p>Fotografo: {sessao.nome}</p>
                <p>Insta: {sessao.instagram}</p>
                <p>ZAP: {sessao.whatsapp}</p>
                <p>E-mail: {sessao.email}</p>
                <p>Link: {sessao.email}</p>
              </>
            )}
          </div>
        );
      }
      return null; // Não renderiza nada para sessões passadas
    })}
  </div>
);
}

export default function Mapa() {
  const [sessoes, setSessoes] = useState([]);
  const [sessaoSelecionadaNoMapa, setSessaoSelecionadaNoMapa] = useState(null);
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
    height: '50vh',
    margin: 'auto',
  };

  return (
    <div class='googlemap'>
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
                setSessaoSelecionadaNoMapa(sessao); // Corrigido aqui
              }}
            />
          ))}

          {sessaoSelecionadaNoMapa && (
            <InfoWindow
              position={{ lat: sessaoSelecionadaNoMapa.latitude, lng: sessaoSelecionadaNoMapa.longitude }}
              onCloseClick={() => {
                setSessaoSelecionadaNoMapa(null);
              }}
            >
              <div>
                <p>Início da sesh: {sessaoSelecionadaNoMapa.hora_inicial}</p>
                <p>Fico até as: {sessaoSelecionadaNoMapa.hora_final}</p>
                <p>Fotografo: {sessaoSelecionadaNoMapa.nome}</p>
                <p>Praia: {sessaoSelecionadaNoMapa.nome_praia}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}