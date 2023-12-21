import React, { useContext } from "react";
import { CarritoContext } from "../CONTEXT/CarritoContext";
import { Link } from "react-router-dom";

export const Item = ({ nombre, precio, id, imgUrl, infoproducto }) => {
  const [carro, setCarro] = useContext(CarritoContext);

  const addToCart = () => {
    setCarro((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, cantidad: item.cantidad + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, nombre, cantidad: 1, precio }];
      }
    });
  };

  const removeItem = (id) => {
    setCarro((currItems) => {
      if (currItems.find((item) => item.id === id)?.cantidad === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const CantidadxId = (id) => {
    return carro.find((item) => item.id === id)?.cantidad || 0;
  };

  const CantidadxArt = CantidadxId(id) || 0;



  

  
  return (
    <div className="bg-primary p-4 rounded-lg shadow-lg text-center h-92">
      {CantidadxArt > 0 && <div className="item-quantity">{CantidadxArt}</div>}
      <h3 className="text-lg">{nombre}</h3>
      <p className="text-sm font-semibold">{infoproducto}</p>
      <p className="text-base font-semibold mt-2">Precio: ${precio}</p>

      {CantidadxArt === 0 ? (
        <button
          className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4 text-sm bg-green-100"
          onClick={() => addToCart()}
        >
          Comprar
        </button>
      ) : (
        <button
          className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4 text-sm bg-green-100"
          onClick={() => addToCart()}
        >
          Agregar otro
        </button>
      )}

      {CantidadxArt > 0 && (
        <button
          className="border-2 rounded-lg border-gray-300 h-10 w-20 m-4 text-sm bg-red-300 text-white"
          onClick={() => removeItem(id)}
        >
          Eliminar del carro
        </button>


      )}

      {/* Agrega el botón para ver el detalle del producto */}
      <Link to={`info/${id}`}>
        <button className="border-2 rounded-lg border-gray-300 h-10 w-20 text-sm bg-blue-300 text-white m-12">
          Ver Detalle
        </button>
      </Link>
    </div>
  );
};