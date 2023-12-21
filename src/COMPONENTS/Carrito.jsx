import React, { useContext, useState} from "react";
import { CarritoContext } from "../CONTEXT/CarritoContext";
import axios from "axios";

export const Carrito = () => {
  const [carro] = useContext(CarritoContext);
  const [searchQuery, setSearchQuery] = useState([]);
  const [cantItemsDto, setCantItemsDto] = useState(0);
  const [cupones, setCupones] = useState([]);
  const [filteredCupones, setFilteredCupones] = useState([]);

  

  const V_cantidad = carro.reduce((acc, curr) => {
    return acc + curr.cantidad;
  }, 0);

  const V_PrecioTotal = carro.reduce(
    (acc, curr) => acc + curr.cantidad * curr.precio,
    0
  );


  const loadDescuento = (isSearch = false) => {
    if (!isSearch){
    // Realizar una solicitud GET para obtener la lista de productos desde el backend
    axios.get("http://localhost:3001/cupones/lista/")
        .then((response) => {
          setCantItemsDto(response.data);
          setCupones(response.data);
          setFilteredCupones(response.data);
        })
        .catch((error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
          console.error("Error al obtener la lista de cupones:", error);
        });
    }else{
      axios.get("http://localhost:3001/cupones/lista/" + searchQuery)
      .then((response) => {
        setCantItemsDto(response.data);
        setCupones(response.data);
        setFilteredCupones(response.data);
      })
      .catch((error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error("Error al obtener la lista de cupones:", error);
      });
    }
  }



  return (
    <div className="container mx-auto">
      <div>
        <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Detalle de Compra</h2>
        <div className="bg-primary p-4 rounded-lg shadow-lg text-center">
          <div>
            <h3 className="mb-2">Detalle de Productos:</h3>
            <ul className="list-group">
              {carro.map((producto, index) => (
                <li key={index} className="list-group-item">
                  <strong>Nombre:</strong> {producto.nombre}
                  <br />
                  <strong>Precio:</strong> ${producto.precio}
                  <br />
                  <strong>Cantidad:</strong> {producto.cantidad}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-3">
            <strong>Cantidad de productos:</strong> {V_cantidad}
          </div>
          <div className="mb-3">
            <strong>Total:</strong> ${V_PrecioTotal}
          </div>
                <div>
                <input
        id="searchQuery"
        className="bg-primary p-4 rounded-lg shadow-lg"
        type="text"
        placeholder="Buscar descuento"
        value={searchQuery}
        onKeyDown={(e) => {
          if (e.key === "Enter") {loadDescuento(true)}
        }}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      
         </div>

        </div>
      </div>
    </div>
  );
};