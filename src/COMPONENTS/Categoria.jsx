import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";



function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [numpage, setNumpage] = useState(1);
  const [cantItems, setCantItems] = useState(0);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadCategories();
  }, [numpage]);

  const nextPage = () => {
    if (numpage < Math.ceil(cantItems/3))
    setNumpage(numpage + 1);
  }

  const prevPage = () => {
    if (numpage > 1)
    setNumpage(numpage - 1);
  }
  
  const loadCategories = (isSearch = false) => {
    if (!isSearch){
    // Realizar una solicitud GET para obtener la lista de productos desde el backend
    axios.get("http://localhost:3001/categoria/lista/" +  numpage)
        .then((response) => {
          setCantItems(response.data.count);
          setCategories(response.data.rows);
          setFilteredCategories(response.data.rows);
        })
        .catch((error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
          console.error("Error al obtener la lista de categorias:", error);
        });
    }else{
      axios.get("http://localhost:3001/categoria/lista/" +  numpage + "/" + searchQuery)
      .then((response) => {
        setCantItems(response.data.count);
        setCategories(response.data.rows);
        setFilteredCategories(response.data.rows);
      })
      .catch((error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error("Error al obtener la lista de categorias:", error);
      });
    }
  }

  return (
    <div className="productos container mx-auto mt-[-2px] mb-47" style={{ marginTop: '12px' }}>
      <h2 
      className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg"
      >Lista de categorías
      </h2>
      
      <input
        id="searchQuery"
        className="bg-primary p-4 rounded-lg shadow-lg"
        type="text"
        placeholder="Buscar categoría"
        value={searchQuery}
        onKeyDown={(e) => {
          if (e.key === "Enter") {loadCategories(true)}
        }}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />

<ul className="nomProdOfertas grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18 p-22 m-12 mt-2 text-center">
  {filteredCategories.map((categoria) => (
    <Link key={categoria.id} to={`${categoria.id}`}>
      <li className="bg-primary hover:text-primary cursor-pointer p-3 m-2 rounded-md h-20 w-64">
        <Link to={`info/${categoria.id}`}>
          <div className="text-center flex items-center justify-center h-full">
            <span className="">
              {categoria.nombre}
            </span>
          </div>
        </Link>
      </li>
    </Link>
  ))}
</ul>
      <div className="flex justify-center">
        <button
          hidden={numpage === 1}
          disabled={numpage === 1}
          className={numpage === 1 ? "bg-gray-600":"bg-primary hover:bg-secondary hover:text-primary cursor-pointer p-3 m-2 rounded-md max-w-xs"}
          
          onClick={() => prevPage()}
        >
          Anterior
        </button>
        <button
          hidden={numpage === Math.ceil(cantItems/3)}
          disabled={numpage === Math.ceil(cantItems/3)}
          className={numpage === Math.ceil(cantItems/3) ? "bg-gray-600":"bg-primary hover:text-primary cursor-pointer p-3 m-2 rounded-md max-w-xs"}
          onClick={() => nextPage()}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
}

export default CategoryList;