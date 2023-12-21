import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function BMCategoria() {
  const [categorias, setCategories] = useState([]);
  const [Cate_Selecionada, SetCate_Selecionada] = useState(null);
  const [Nueva_Cate_Nombre, SetNueva_Cate_Nombre] = useState("");

  // Función para cargar categorías
  const CargarCategorias = () => {
    axios
      .get("http://localhost:3001/categoria/lista")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de categorías:", error);
      });
  };

  // Función para eliminar categoría
  const EliminarCategoria = (Cate_Id) => {
    axios
      .delete(`http://localhost:3001/categoria/eliminar/${Cate_Id}`)
      .then((response) => {
        CargarCategorias();
        console.log("Categoría eliminada", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
      });
  };

  // Función para modificar categoría
  const ModificarCategoria = (Cate_Id) => {
    const Cate_Modif = categorias.find((Categoria) => Categoria.id === Cate_Id);
    if (Cate_Modif) {
      SetCate_Selecionada(Cate_Modif);
      SetNueva_Cate_Nombre(Cate_Modif.nombre);
    }
  };

  // Función para cancelar la modificación de categoría
  const Cancelar_M = () => {
    SetCate_Selecionada(null);
    SetNueva_Cate_Nombre("");
  };

  // Función para confirmar la modificación de categoría
  const Confirmar_M = () => {
    axios
      .put(`http://localhost:3001/categoria/actualizar/${Cate_Selecionada.id}`, {
        nombre: Nueva_Cate_Nombre,
      })
      .then((response) => {
        SetCate_Selecionada(null);
        SetNueva_Cate_Nombre("");
        CargarCategorias();
      })
      .catch((error) => {
        console.error("Error al actualizar la categoría:", error);
      });
    console.log("Categoría editada", "La categoría ha sido editada correctamente", "success");
  };

  useEffect(() => {
    CargarCategorias();
  }, []);

  return (
    <div className="min-h-screen" style={{ marginTop: '12px' }}>
      <div className="productos container mx-auto mt-[-2px] mb-47">
        <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">
          Categorías de Productos
        </h2>

        {/* Edición de categoría */}
        {Cate_Selecionada ? (
          <div>
            <h3 className="text-xl text-primary font-bold cursor-pointer">
              Modificar Categoría: {Cate_Selecionada.nombre}
            </h3>
            <input
              className="border-2 border-primary rounded-md w-[380px] h-[50px]"
              type="text"
              value={Nueva_Cate_Nombre}
              onChange={(e) => SetNueva_Cate_Nombre(e.target.value)}
            />
            <button
              className="bg-primary rgb(100, 193, 218) cursor-pointer p-3 m-2 rounded-md"
              onClick={Confirmar_M}
            >
              Aceptar
            </button>
            <button
              className="bg-primary rgb(100, 193, 218) cursor-pointer p-3 m-2 rounded-md"
              onClick={Cancelar_M}
            >
              Cancelar
            </button>
          </div>
        ) : null}

        {/* Botón para agregar categoría */}
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/ACategoria">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
              Agregar Categoria
            </button>
          </Link>
        </div>

        {/* Lista de categorías */}
        <div className="size_letra">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="shadow-lg rounded-lg p-6 bg-primary mb-4 flex justify-between items-center h-16"
              style={{ maxWidth: '100%' }}
            >
              <div>
                <span className="text-lg font-semibold mb-2">
                  {categoria.nombre}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Botones de edición y eliminación */}
                <button className="border-2 rounded-lg border-blue-300 h-10 w-20 text-sm bg-blue-300 text-white"
                  onClick={() => ModificarCategoria(categoria.id)}>
                  Editar
                </button>
                
                <button className="border-2 rounded-lg border-red-300 h-10 w-20 text-sm bg-red-300 text-white" 
                  onClick={() => EliminarCategoria(categoria.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botones "ABM" y "Cerrar sesión" */}
        <div className="flex justify-center mt-4">
          <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
            <Link to="/Usuario"> MENU</Link>
          </button>
          <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
            <Link to="/logout">CERRAR SESION</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BMCategoria;