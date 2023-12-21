import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { Item } from "./ABMCarrito";

function ProductosL() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numpage, setNumpage] = useState(1);
  const [cantItems, setCantItems] = useState(0);
  

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de productos desde el backend
    axios.get("http://localhost:3001/producto/lista")
      .then((response) => {
        // Actualizar el estado con los datos obtenidos
        setProducts(response.data);
      })
      .catch((error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error("Error al obtener la lista de productos:", error);
      });
  }, []); // La dependencia vacía asegura que esto solo se ejecute una vez al cargar el componente


  useEffect(() => {
    loadProducts();
  }, [numpage, searchQuery]);


  const nextPage = () => {
    if (numpage < Math.ceil(cantItems / 4)) setNumpage(numpage + 1);
  };

  const prevPage = () => {
    if (numpage > 1) setNumpage(numpage - 1);
  };

 const loadProducts = () => {
  const url = searchQuery
    ? `http://localhost:3001/producto/lista/${numpage}/${searchQuery}`
    : `http://localhost:3001/producto/lista/${numpage}`;

  axios
    .get(url)
    .then((response) => {
      setCantItems(response.data.count);

      // Verificar si response.data.rows es un array antes de actualizar el estado
      if (Array.isArray(response.data.rows)) {
        setProducts(response.data.rows);
        setFilteredProducts(response.data.rows);
      } else {
        console.error("La respuesta no contiene un array de productos:", response.data.rows);
      }
    })
    .catch((error) => {
      console.error("Error al obtener la lista de productos:", error);
    });
  };


  return (
    <div style={{ marginTop: '25px' }}>
      <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Lista de productos</h2>

      {/*<div>
        <button>
          <Link to="./Carrito">Carrito</Link>
        </button>
      </div>
      */}
      
      <div className="size_letra grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => {
          return <Item key={product.id} {...product} />;
        })}
      </div>
      <div className="flex justify-center m-10">
        <button
          hidden={numpage === 1}
          disabled={numpage === 1}
          className={`${
            numpage === 1 ? "bg-gray-600" : "bg-primary"
          }  hover:text-primary cursor-pointer p-3 m-2 rounded-md max-w-xs`}
          onClick={() => prevPage()}
        >
          ANTERIOR
        </button>
        <button
          hidden={numpage === Math.ceil(cantItems / 4)}
          disabled={numpage === Math.ceil(cantItems / 4)}
          className={`${
            numpage === Math.ceil(cantItems / 3)
              ? "bg-gray-600"
              : "bg-primary"
          }  hover:text-primary cursor-pointer p-3 m-2 rounded-md max-w-xs`}
          onClick={() => nextPage()}
        >
          SIGUIENTE
        </button>
      </div>

    </div>
  );
}

export default ProductosL;