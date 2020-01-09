import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './components/Productos';
import Producto from './components/Producto';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Header from './components/Header';
import axios from 'axios';

function App() {

  const [ productos, guardarProductos ] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const resultado = await axios.get('http://localhost:4000/restaurant');

      guardarProductos(resultado.data);
    }
    consultarApi();
  }, []);

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos" render={() => (<Productos productos={productos} />)} />
          <Route exact path="/producto/nuevo" component={AgregarProducto} />
          <Route exact path="/producto/editar/:id" component={EditarProducto} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
    </Router>
  );
}

export default App;
