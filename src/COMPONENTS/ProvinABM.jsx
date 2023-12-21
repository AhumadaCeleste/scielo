import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

//Terminar: prueba para mostrar nombrePais de la tabla Pais, llamando a
//provin con fineAll desde backend

function ProvinABM(props) {
  const [provin, setProvin] = useState([]);
  const [selectedProvin, setSelectedProvin] = useState(null);
  const [newProvinName, setNewProvinName] = useState("");
  const [newProvinCodigo, setNewProvinCodigo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProvin, setFilteredProvin] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadProvin();
  }, []);

  const loadPais = (isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/provin/lista")
        .then((response) => {
          setProvin(response.data);
          setFilteredProvin(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de provin:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = provin.filter((provin) =>
        provin.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProvin(filtered);
    }
  };

  const editPais = (paisId) => {
    const provinToEdit = provin.find((provin) => provin.paiId === paisId);
    if (paisToEdit) {
      setSelectedProvin(paisToEdit);
      setNewPaisName(paisToEdit.nombre);
      setNewPaisCodigo(paisToEdit.codigo);
    }
  };
//seguir..
  const cancelEdit = () => {
    setSelectedPais(null);
    setNewPaisName("");
    setNewPaisCodigo("");
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/pais/actualizar/${selectedPais.id}`, {
        nombre: newPaisName,
        codigo: newPaisCodigo,
      })
      .then((response) => {
        setSelectedPais(null);
        setNewPaisName("");
        setNewPaisCodigo("");
        loadPais();
        console.log("Pais editado", "El país ha sido editado correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al actualizar el país:", error);
      });
  };

  const deletePais = (paisId) => {
    axios
      .delete(`http://localhost:3001/pais/eliminar/${paisId}`)
      .then((response) => {
        loadPais();
        setSelectedPais(null);
        setNewPaisName("");
        setNewPaisCodigo("");
        console.log("Pais eliminado", "La país ha sido eliminado correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar el país:", error);
      });
  };

  return (
    <div  className="bg-sky-100 rounded-md">
      <h2 className="w-full text-left text-xl font-bold text-primary mb-4 mt-4">
        Edición de país
      </h2>

      <input
        id="searchQuery"
        className="block mb-2 rounded-md p-2 w-full"
        type="text"
        placeholder="Buscar país"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          loadPais(true);
        }}
      />
      {selectedPais ? (
        <div>
          <h3 className="text-xl text-primary font-bold cursor-pointer">
            Editar País: {selectedPais.nombre}
          </h3>
          <input
            id="inputRef"
            ref={inputRef}
            autoFocus={true}
            className="block mb-2 rounded-md p-2 w-full"
            type="text"
            placeholder="Nuevo nombre"
            value={newPaisName}
            onChange={(e) => setNewPaisName(e.target.value)}
          />
           <h3 className="text-xl text-primary font-bold cursor-pointer">
            Editar Codigo: {selectedPais.nombre}
          </h3>
          <input
            className="block mb-2 rounded-md p-2 w-full"
            type="text"
            placeholder="Nuevo código"
            value={newPaisCodigo}
            onChange={(e) => setNewPaisCodigo(e.target.value)}
          />
          <button
            className="bg-primary cursor-pointer p-3 m-2 rounded-md"
            onClick={confirmEdit}
          >
            Confirmar
          </button>
          <button
            className=" text-red-300 cursor-pointer p-3 m-2 rounded-md"
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        </div>
      ) : null}
      <ul>
        {filteredPais.map((pais) => (
          <div className="flex" key={pais.id}>
            <input
              key={pais.id}
              className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
              readOnly={true}
              type="text"
              value={pais.nombre}
            />
            <input
              className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
              readOnly={true}
              type="text"
              value={pais.codigo}
            />
            <button
              className="bg-primary cursor-pointer p-3 m-2 rounded-md max-w-xs"
              onClick={() => editPais(pais.id)}
            >
              Editar
            </button>
            <button
              className="text-primary bg-red-200 cursor-pointer p-3 m-2 rounded-md max-w-xs"
              onClick={() => deletePais(pais.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProvinABM;