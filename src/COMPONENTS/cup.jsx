import React, { useState} from "react";
//import { Link } from "react-router-dom";
import axios from "axios";

// Alta de Cupones
function Cupones() {
  // Define estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del mensaje
    const nuevoCupones = {
      nombre,
      codigo,
      descuento,
    };
    try {
      // Realiza una petición POST al backend para guardar el mensaje
      const res = await axios.post("http://localhost:3001/cupones/nuevo", nuevoCupones);
      console.log(res);             
      alert("Cupones Agregado");

    } catch (error) {
      alert(`Error tipo: ${error.response.data.msg}`);
      // Maneja cualquier error que ocurra durante la solicitud
      console.log("Error al enviar el mensaje al back:", error);
    }
  };

  return (
    <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
      <div className="contactar-container">
        <h2 className="titulo_pricipal_paginas mb-4 mt-0 shadow-lg text-center">Crear Cupones</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
            <label htmlFor="nombre" className="block mb-2">Codigo:</label>
             <input
              type="int"
              id="codigo"
              name="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
            <label htmlFor="nombre" className="block mb-2">Descuento:</label>
             <input
              type="int"
              id="descuento"
              name="descuento"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
        </form>

        <button type="submit" className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
            AGREGAR
          </button>  
        

       




      </div>
    </div>
  );
}

export default Cupones;