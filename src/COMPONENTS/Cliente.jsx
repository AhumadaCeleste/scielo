import React, { useState } from "react";
import axios from "axios";

// REGISTRO DE CLIENTE:

function Register() {
  // Define estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Crea un objeto con los datos del mensaje
    const nuevoCliente = {
      nombre,
      dni,
      direccion,
      email,
      password,
    };
    try {
      // Realiza una petición POST al backend para guardar el mensaje
      const res = await axios.post("http://localhost:3001/cliente/nuevo", nuevoCliente);
      console.log(res);
      alert("Cliente registrado");
    } catch (error) {
      alert(`Error tipo: ${error.response.data.msg}`);
      // Maneja cualquier error que ocurra durante la solicitud
      console.log("Error al enviar el mensaje al back:", error);
    }
  };

  return (
    <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
      <div className="contactar-container">
        <h2 className="titulo_pricipal_paginas mb-4 mt-0 shadow-lg">Registro de Clientes</h2>
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
          </div>
          <div className="mb-4">
            <label htmlFor="dni" className="block mb-2">Número de documento (DNI):</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="direccion" className="block mb-2">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmarPassword" className="block mb-2">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <button type="submit" className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-8">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;


