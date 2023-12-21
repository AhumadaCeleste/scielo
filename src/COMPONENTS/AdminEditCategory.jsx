import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminEditCategory(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = (isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/categoria/lista")
        .then((response) => {
          setCategories(response.data);
          setFilteredCategories(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de categorías:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = categories.filter((category) =>
        category.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const editCategory = (categoryId) => {
    const categoryToEdit = categories.find((category) => category.id === categoryId);
    if (categoryToEdit) {
      setSelectedCategory(categoryToEdit);
      setNewCategoryName(categoryToEdit.nombre);
    }
  };

  const cancelEdit = () => {
    setSelectedCategory(null);
    setNewCategoryName("");
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/categoria/actualizar/${selectedCategory.id}`, {
        nombre: newCategoryName,
      })
      .then((response) => {
        setSelectedCategory(null);
        setNewCategoryName("");
        loadCategories();
      })
      .catch((error) => {
        console.error("Error al actualizar la categoría:", error);
      });
    console.log("Categoría editada", "La categoría ha sido editada correctamente", "success");
  }

  const deleteCategory = (categoryId) => {
    axios
      .delete(`http://localhost:3001/categoria/eliminar/${categoryId}`)
      .then((response) => {
        loadCategories();
        setSelectedCategory(null);
        setNewCategoryName("");
        console.log("Categoría eliminada", "La categoría ha sido eliminada correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
      });
  };

  return (
    <div className="bg-sky-100 rounded-md">
      <h2
        className="w-full text-left text-xl font-bold text-primary mb-4 mt-4"
      >Edición de categorías
      </h2>


      
      <input
        id="searchQuery"
        className="block mb-2  rounded-md p-2 w-full "
        type="text"
        placeholder="Buscar categoría"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          loadCategories(true);
        }}
      />
      {selectedCategory ? (
        <div>
          <h3 className="text-xl text-primary font-bold cursor-pointer">
            Editar Categoría: {selectedCategory.nombre}
          </h3>
          <input
            id="inputRef"
            ref={inputRef}
            autoFocus={true}
           className="block mb-2  rounded-md p-2 w-full"
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            className="bg-primary text-primary cursor-pointer p-3 m-2 rounded-md"
            onClick={confirmEdit}
          >
            Confirmar
          </button>
          <button
            className="text-primary cursor-pointer p-3 m-2 rounded-md"
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        </div>
      ) : null}
      <ul>
        {filteredCategories.map((category) => (
          <div className="flex" key={category.id}>
            <input
              key={category.id}
              className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
              readOnly={true}
              type="text"
              value={category.nombre}
            />
            <button
              className="bg-primary text-primary cursor-pointer p-3 m-2 rounded-md max-w-xs"
              onClick={() => editCategory(category.id)}
            >
              Editar
            </button>
            <button
              className="text-primary cursor-pointer p-3 m-2 rounded-md max-w-xs"
              onClick={() => deleteCategory(category.id)}
            >
              Eliminar
            </button>
            <button className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4">
              <Link to="/ModCategoria">GESTIONAR CATEGORIA</Link>
            </button>
            <button className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4">
              <Link to="/logout">CERRAR SESION</Link>
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AdminEditCategory;