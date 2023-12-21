import { Link } from "react-router-dom";
import logo from "../IMAGES/logoOk.jpg"
import { radio } from "@material-tailwind/react";





const UsuarioLogin= () =>

{
  
    return (
      <div className="productos container mx-auto mt-[-2px] mb-47 size_letra" style={{ marginTop: '12px' }}>
        <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Bienvenido Usuario</h2>
         <div>
            <div className="bg-primary p-4 rounded-lg shadow-lg">
          <br/>
          <br/>
            
            <div className="logo logomenu">
             <img src={logo} alt="logo"style={{ width: '120px', height: '120px', borderRadius: '50%'}}  className='logo_home '/>
             <p className='text-center text-2xl'>Cosmetica Natural Artesanal © </p>
            
            </div>
              
              <div>
              <p className=' text-center texto_menu2 m-2 p-1 text-lg'>Hola Usuario!!!!!!</p>
              </div>

              <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg hover:bg-sky-700">
              <Link to="/ModCategoria">Categorias de Productos</Link>
            </button>

            <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg hover:bg-sky-700">
              <Link to="/EditProdu">Editar producto</Link>
            </button>


            <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg hover:bg-sky-700">
              <Link to="/altaproducto">Crear Producto</Link>
            </button>


            <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg hover:bg-sky-700">
              <Link to="/logout">Cerrar sesion</Link>
            </button>

           </div>
         </div>     
      </div>
  );

}
export default UsuarioLogin;