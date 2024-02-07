import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Fotografo() {
  const [fotografos, setFotografos] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/fotografo')
      .then(response => {
        setFotografos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar fotografos:', error);
      });
  }, []);
  return (
    <div>
      <h1>Fotógrafos</h1>
      {fotografos.map(fotografo => (
        <div key={fotografo.id}>
          <h2>{fotografo.nome}</h2>
          <p>Instagram: {fotografo.instagram}</p>
          <p>WhatsApp: {fotografo.whatsapp}</p>
          <p>Email: {fotografo.email}</p>
          <p>Link: {fotografo.link}</p>
        </div>
      ))}
    </div>
  );
}
export default Fotografo;