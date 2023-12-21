import React from "react";
import { Link } from "react-router-dom";
import antiacneica from "../IMAGES/RutinaAcneica.jpg";
import corporal from "../IMAGES/corporalchica.png";
import antimanchas from "../IMAGES/AntiManchas.jpg";
import ShampooIbiscu from "../IMAGES/ShampooIbiscu.jpg";
import acondicionadorSolido from "../IMAGES/acondicionadorSolido.jpg";
import Detergente from "../IMAGES/Detergente.jpg";

function Rutinas() {
  const rutina = [
    { id: 1, name: "Limpieza e Hidratación rostro graso-mixto", tipo: "LIMPIEZA E HIDRATACION PARA ROSTRO GRASO - ACNEICA", img: antiacneica },
    { id: 2, name: "Nutricion coorporal post-ducha", tipo: "HUMECTACION POST DUCHA", img: corporal },
    { id: 3, name: "Efectivo tratamiento antimachas ya sea por causada por el sol o edad", tipo: "TRATAMIENTO ANTI-MANCHAS", img: antimanchas },
    { id: 4, name: "Imaginate pasar los activos que tu cabello necesita en estado solido sin diluir", tipo: "CABELLO SECO", img: ShampooIbiscu },
    { id: 5, name: "Este acondicionador a base de aceite de argan y manteca de carite tiene la virtud de reparar cualquier daño.", tipo: "CABELLO DAÑADO Y SECO", img: acondicionadorSolido },
    { id: 6, name: "Es sabido que todo lo a lo que nos exponemos constantemente puede generar daño o alergias. ¿Sabes lo que contiene tu detergente de cocina?", tipo: "DETERGENTE SOLIDO", img: Detergente },
  ];

  return (
    <div className="productos container mx-auto mt-[-2px] mb-47 size_letra" style={{ marginTop: '12px' }}>
      <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Rutinas</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 m-12 mt-2">
        {rutina.map((rutina) => (
          <li key={rutina.id} className="bg-primary p-4 rounded-lg shadow-lg">
            <Link to={`info/${rutina.id}`}>
              <div className="text-center">
                <span className="text-lg font-bold">{rutina.tipo}</span>
                <div className="flex justify-center items-center flex-col mt-4">
                  <img 
                    alt={`Imagen de ${rutina.name}`}
                    style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                    src={rutina.img}
                  />
                  <span className="text-lg text-center">{rutina.name}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutinas;