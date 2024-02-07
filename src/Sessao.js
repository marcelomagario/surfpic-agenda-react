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
          <p>Praia: {sessao.praiaid}</p>
          <p>Fotografo: {sessao.fotografoid}</p>
        </div>
      ))}
    </div>
  );
}
export default Sessao;