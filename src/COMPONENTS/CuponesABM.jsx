import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


function CuponesABM(props) {
  const [cupones, setCupones] = useState([]);
  const [selectedCupones, setSelectedCupones] = useState(null);
  const [newCuponesName, setNewCuponesName] = useState("");
  const [newCuponesCodigo, setNewCuponesCodigo] = useState("");
  const [newCuponesDescuento, setNewCuponesDescuento] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCupones, setFilteredCupones] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadCupones();
  }, []);

  const loadCupones = (isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/cupones/lista")
        .then((response) => {
          setCupones(response.data);
          setFilteredCupones(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de cupones:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = cupones.filter((cupones) =>
        cupones.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCupones(filtered);
    }
  };

  const editCupones = (cuponesId) => {
    const cuponesToEdit = cupones.find((cupones) => cupones.id === cuponesId);
    if (cuponesToEdit) {
      setSelectedCupones(cuponesToEdit);
      setNewCuponesName(cuponesToEdit.nombre);
      setNewCuponesCodigo(cuponesToEdit.codigo);
      setNewCuponesDescuento(cuponesToEdit.descuento);
    }
  };

  const cancelEdit = () => {
    setSelectedCupones(null);
    setNewCuponesName("");
    setNewCuponesCodigo("");
    setNewCuponesDescuento("");
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/cupones/actualizar/${selectedCupones.id}`, {
        nombre: newCuponesName,
        codigo: newCuponesCodigo,
        codigo: newCuponesDescuento,
      })
      .then((response) => {
        setSelectedCupones(null);
        setNewCuponesName("");
        setNewCuponesCodigo("");
        setNewCuponesDescuento("");
        loadCupones();
        console.log("Cupon editado", "El cupon ha sido editado correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al actualizar el cupon:", error);
      });
  };

  const deleteCupones = (cuponesId) => {
    axios
      .delete(`http://localhost:3001/cupones/eliminar/${cuponesId}`)
      .then((response) => {
        loadCupones();
        setSelectedCupones(null);
        setNewCuponesName("");
        setNewCuponesCodigo("");
        setNewCuponesDescuento("");
        console.log("Cupones eliminado", "La país ha sido eliminado correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar el país:", error);
      });
  };

  return (
    <div  className="bg-sky-100 rounded-md">
      <h2 className="w-full text-left text-xl font-bold text-primary mb-4 mt-4">
        Edición de cupon
      </h2>

      <input
        id="searchQuery"
        className="block mb-2 rounded-md p-2 w-full"
        type="text"
        placeholder="Buscar cupon"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          loadCupones(true);
        }}
      />
      {selectedCupones ? (
        <div>
          <h3 className="text-xl text-primary font-bold cursor-pointer">
            Editar Cupon: {selectedCupones.nombre}
          </h3>
          <input
            id="inputRef"
            ref={inputRef}
            autoFocus={true}
            className="block mb-2 rounded-md p-2 w-full"
            type="text"
            placeholder="Nuevo nombre"
            value={newCuponesName}
            onChange={(e) => setNewCuponesName(e.target.value)}
          />
           <h3 className="text-xl text-primary font-bold cursor-pointer">
            Editar nombre: {selectedCupones.nombre}
          </h3>
          <input
            className="block mb-2 rounded-md p-2 w-full"
            type="text"
            placeholder="Nuevo código"
            value={newCuponesCodigo}
            onChange={(e) => setNewCuponesCodigo(e.target.value)}
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
        {filteredCupones.map((cupones) => (
          <div className="flex" key={cupones.id}>
            <input
              key={cupones.id}
              className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
              readOnly={true}
              type="text"
              value={cupones.nombre}
            />
            <input
              className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
              readOnly={true}
              type="text"
              value={cupones.codigo}
            />
            <button
              className="bg-primary cursor-pointer p-3 m-2 rounded-md max-w-xs"
              onClick={() => editCupones(cupones.id)}
            >
              Editar
            </button>
            <button
              className="text-primary bg-red-200 cursor-pointer p-3 m-2 rounded-md max-w-xs"
              onClick={() => deleteCupones(cupones.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CuponesABM;