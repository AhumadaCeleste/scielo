import React, { useEffect, useState } from "react";
import axios from "axios";

function Oferta() {
  // Hook de estado de componente "useState"
  const [articulos, setArticulos] = useState([]);

  const leerArticulos = () => {
    axios
      .get("http://localhost:3001/producto/filtrar/esoferta/1")
      .then((res) => {
        setArticulos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Hooks
  useEffect(() => {
    leerArticulos();
  }, []);

  return (
    <div className="productos container mx-auto mt-[-2px] mb-47" style={{ marginTop: '12px' }}>
      <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Ofertas</h2>

      {/* Contenedor para los elementos en tres columnas */}
      <ul className="nomProdOfertas grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 m-12 mt-2 text-center">
        {articulos && articulos.length > 0 ? (
          articulos.map((articulo, index) => (
            <div key={index}>
              <br />
              <div className="bg-primary p-4 rounded-lg" style={{ height: 220 }}>
                <p className="lista_oferta font-bold">{articulo.nombre}</p>
                <p className="separacionDeTitulo mt-2">
                  <h3>Precio Regular</h3>
                </p>
                ${articulo.precio} <br />
                <h3>Precio de oferta</h3>
                <div className="precio_oferta font-bold">${articulo.preciooferta}</div>
              </div>
            </div>
          ))
        ) : (
          <h1>No hay artículos</h1>
        )}
      </ul>
    </div>
  );
}

export default Oferta;