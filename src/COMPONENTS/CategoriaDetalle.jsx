import { useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoriaDetalle() {
  const { id } = useParams();
  const [categoriaP, setCategoriaP] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/producto/filtrar/categoriumId/${id}`)
      .then((response) => {
        setCategoriaP(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Productos x Categoria:", error);
      });
  }, []);

  if (!categoriaP.length) {
    return <div>Producto x Categoria no encontrada.</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Lista de productos por categoría</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriaP.map((producto) => (
          <div key={producto.id} className="max-w-xs">
            <ul to={`/info/${producto.id}`}>
              <div className="bg-primary p-4 rounded-lg shadow-lg text-center">
                <h3 className="text-lg">{producto.nombre}</h3>
                <p className="font-semibold ">${producto.precio}</p>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriaDetalle;
