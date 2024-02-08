import React, { useEffect, useState } from 'react';
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
          <p>Início da sesh: {sessao.hora_inicial}</p>
          <p>Fico até as: {sessao.hora_final}</p>
          <p>Fotografo: {sessao.nome}</p>
          <p>Insta: {sessao.instagram}</p>
          <p>ZAP: {sessao.whatsapp}</p>
          <p>E-mail: {sessao.email}</p>
          <p>Link: {sessao.email}</p>
          <p>Praia: {sessao.nome_praia}</p>
          <p>Latitude: {sessao.latitude}</p>
          <p>Longitude: {sessao.longitude}</p>
          <p>Direção ideal do swell: {sessao.direcao_ideal_swell}</p>
          <p>Direção ideal do vento: {sessao.direcao_ideal_vento}</p>
        </div>
      ))}
    </div>
  );
}
export default Sessao;