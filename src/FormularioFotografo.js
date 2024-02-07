import React, { useState } from 'react';
import axios from 'axios';

function FormularioFotografo() {
  const [fotografo, setFotografo] = useState({
    nome: '',
    instagram: '',
    whatsapp: '',
    email: '',
    link: ''
  });

  const handleChange = event => {
    setFotografo({
      ...fotografo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:3001/fotografo/cadastro', fotografo)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" name="nome" onChange={handleChange} />
      </label>
      <label>
        Instagram:
        <input type="text" name="instagram" onChange={handleChange} />
      </label>
      <label>
        WhatsApp:
        <input type="text" name="whatsapp" onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <label>
        Link:
        <input type="text" name="link" onChange={handleChange} />
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormularioFotografo;