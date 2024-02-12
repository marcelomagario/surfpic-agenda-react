import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sessao from './Sessao'; // Importe o componente Sessao
import Fotografo from './Fotografo';
import FormularioFotografo from './FormularioFotografo';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/fotografo">Fotografos</Link>
            </li>
            <li>
              <Link to="/formulario-fotografo"> Olá Fotografo! Cadastre-se e comece a usar o app!</Link>
            </li>
            <li>
              <Link to="/sessao">Próximas sessões</Link> 
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/fotografo" element={<Fotografo />} />
          <Route path="/formulario-fotografo" element={<FormularioFotografo />} />
          <Route path="/sessao" element={<Sessao />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;