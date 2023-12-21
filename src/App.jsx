import { useState } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";

import './App.css';
import Home from './COMPONENTS/Home';
import Menu from "./COMPONENTS/Menu";
import Footer from "./COMPONENTS/Footer";
import ProductosL from "./COMPONENTS/ProductosL";
import ProductoDetalle from './COMPONENTS/ProductosDetalle';
import Categoria from "./COMPONENTS/Categoria";
import CategoriaDetalle from "./COMPONENTS/CategoriaDetalle";
import Rutinas from "./COMPONENTS/Rutina";
import RutinaDetalle from "./COMPONENTS/RutinaDetalle";
import Oferta from "./COMPONENTS/Oferta";
import Cliente from "./COMPONENTS/Cliente";
import AltaCategoria from "./COMPONENTS/AltaCategoria";
import MainCategoria from "./COMPONENTS/MainCategoria";
import UsuarioLogin from "./COMPONENTS/Usuariologin";
import ClienteLogin from "./COMPONENTS/Clientelogin";
import { loginUser } from "./SERVICE/Usuariologin.service";
import { loginClient } from "./SERVICE/ClienteLogin.service";
import { Carrito } from "./COMPONENTS/Carrito";
import { CarritoProvider } from "./CONTEXT/CarritoContext";
import AdminEditCategory from "./COMPONENTS/AdminEditCategory";
import ReactSwitch from "react-switch";  
import { useThemeContext } from  "./CONTEXT/TehemeContext";
import AltaProducto from "./COMPONENTS/AltaProducto";
import AdminEditProduct from "./COMPONENTS/AdminEditProduct";
import Cupones from "./COMPONENTS/Cupones";
import CuponesABM from "./COMPONENTS/CuponesABM";

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(false);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === 'Light' ? 'Dark' : 'Light'));
    setChecked(nextChecked);
  };

  const [isAutenticado, setIsAutenticado] = useState(false);
  const [isAutenticadoCli, setIsAutenticadoCli] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [SiglaRol, setSiglaRol] = useState(0);
  
  

  const login = async () => {
    const res = await loginUser(email, password);
    console.log(`resultado: `, res);
    if (res.resultado) {
      navigate("/usuario");
      setIsAutenticado(true);
      setSiglaRol(res.sigla);
      console.log(res.data);
    } else {
      alert("mail o contraseña de usuario incorrecta");
    }
  };

  const loginCli = async () => {
    const res = await loginClient (email, password)
    console.log(`resultado: `, res);
    if (res.resultado) {
      navigate("/cli"); 
      setIsAutenticadoCli(true);
    } else {
      alert("mail o contraseña de cliente incorrecta");
    }
  };

  const logout = () => {
    //localStorage.removeItem("nombre");
    localStorage.clear();
    navigate("/"); 
    setIsAutenticado(false);
  };

  const logoutCli = () => {
  localStorage.clear();
  setIsAutenticadoCli(false);
  console.log("Cliente logout successful");
  navigate("/");
};

  

   return (
    <CarritoProvider>
     <div> 
      <div className="App-header" id={contextTheme}>
      <ReactSwitch 
      onChange={handleSwitch}
      checked={checked}
      onColor="#86d3ff"
      onHandleColor="#2693e6"
      handleDiameter={30}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={10}
      width={48}
      className="react-switch"
      id="material-switch"/>
     
       <Routes>
      
{/*-------------------ADMIN LOGIN------------------------ */}
           <Route path="/"element=
           {
             <div className="p-12 m-3">
                <Menu authOK={isAutenticado} authOKCli={isAutenticadoCli} UsuSiglaRol={SiglaRol} />
                <div>
                  <Outlet />
                </div>
          

                <div>
                  <Footer/>
                </div>
             </div>
            }>

{/*-------------------FIN FIJO----------------------- */}  

{/*-------------------Login usuario----------------------- */}  
        <Route path="login" element=
            {<div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
                  <div className="contactar-container flex flex-col items-center">
                    <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">
                      Iniciar sesión Usuario
                    </h2>
                    <label htmlFor="email" className="block font-medium text-lg mb-2">
                      Ingrese su e-mail:
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Ingresa tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 px-4 mt-2 mb-4 border rounded-lg shadow-md focus:outline-none"
                    />
                    <label htmlFor="password" className="block font-medium text-lg mt-2 mb-2">
                      Ingrese su contraseña:
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 px-4 mt-2 border rounded-lg shadow-md focus:outline-none focus:border-primary"
                      onKeyDown={(e) => {
                        e.key === "Enter" && login();
                      }}
                    />
                    <button
                      className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-8"
                      onClick={login}>
                      Login
                    </button>
                            </div>
                            </div>
            }/>
        
        <Route path="logout" element=
           {
               <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
                 <button className="border-2 bg- rounded-lg border-gray-300 py-3 titulo_tarjetas m-4 hover:bg-sky-700 text-sm md:text-base" onClick={logout}> Confirmas el cierre de sesion?</button>
               </div>
            }/>



          
          <Route path="usuario/" element=
            {isAutenticado ? <UsuarioLogin/> : <Navigate to="/usuario/login" />
            } />
{/*-------------------Fin Login usuario----------------------- */}  
                    

{/*-------------------Inicio Login cliente----------------------- */}  
<Route path="loginCli" element=
            {<div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
                  <div className="contactar-container flex flex-col items-center">
                    <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">
                      Iniciar sesión Cliente
                    </h2>
                    <label htmlFor="email" className="block font-medium text-lg mb-2">
                      Ingrese su e-mail:
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Ingresa tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 px-4 mt-2 mb-4 border rounded-lg shadow-md focus:outline-none"
                    />
                    <label htmlFor="password" className="block font-medium text-lg mt-2 mb-2">
                      Ingrese su contraseña:
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 px-4 mt-2 border rounded-lg shadow-md focus:outline-none focus:border-primary"
                      onKeyDown={(e) => {
                        e.key === "Enter" && loginCli();
                      }}
                    />
                    <button
                      className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-8"
                      onClick={loginCli}>
                      Login
                    </button>
                            </div>
                            </div>
            }/>
        
        <Route path="logoutCli" element=
           {
            <div className="bg-primary py-11 px-16 rounded-md w-auto m-8">
            <button className="border-2 bg- rounded-lg border-gray-300 py-3 titulo_tarjetas m-4 hover:bg-sky-700 text-sm md:text-base" onClick={logoutCli}>
              Confirmas el cierre de sesión?
            </button>
          </div>
            }/>

          <Route path="cli/" element=
            {isAutenticadoCli ? <ClienteLogin/> : <Navigate to="/cliente/login" />
            } />

{/*-------------------Fin Login cliente----------------------- */}  


{/*-------------------HOME------------------------ */}
           <Route path="/" element={<Home/>}/>
             <Route path="home"  element={
               <div> 
                 <Home />
                 <Outlet />
               </div>
                   }>   
            </Route>

 {/*-------------------ADMIN------------------------ */}

           <Route path="/admin"element={
               <div>
                 <Outlet />
               </div>
            }>
           </Route> 
       

{/*-------------------ADMIN------------------------ */}

           <Route path="login" element={
               <div>
                 <button onClick={login}>Login</button>    
               </div>} />

           <Route path="logout" element={       
                <div>
                 <button onClick={logout}>Logout</button>
                </div> }>
           </Route>        

           <Route path="cliente" element={<Cliente />} />

 {/*-------------------RUTINA------------------------ */}
           <Route path="rutinas" element={
               <div> 
                <Outlet />
              </div>
            }> 

            <Route index element={<Rutinas/>} />
            <Route path="info/:id" element={<RutinaDetalle/>} />
          </Route>

    
          <Route path="/rutina/1" element={RutinaDetalle} />

 {/*-------------------CATEGORIA------------------------ */}
           <Route path="categoria" element={<Categoria />} />
           
           <Route path="categoria" element={       
               <div> 
                 <Outlet />
               </div>}>

           <Route index element={<Categoria/>} />
            <Route path="info/:id" element={<CategoriaDetalle/>} /> 
           </Route>

 {/*-------------------PRODUCTO CATEGORIA- (En desarrollo)----------------------- */}
           <Route path="producto" element={       
             <div> 
               <Outlet />
             </div>
            }>
         
           <Route path="producto" element={<ProductoDetalle/>
           }/>
      
     {/*-------------------OFERTA------------------------ */}

           <Route index element={<Oferta/>} /></Route>
           <Route path="oferta" element={<Oferta />} />
        
            <Route path="oferta" element={       
             <div> 
              <Outlet />
             </div>
             }>
         <Route index element={<Oferta/>} /></Route>
        
        {/*-------------------Productos a comprar------------------------ */}
            <Route path="compra" element={<ProductosL />} />
            <Route
              path="compra" element={       
                 <div> 
                   <Outlet />
                 </div>
                  }>

              <Route index element={<ProductosL />} />
              <Route path="info/:id" element={<ProductoDetalle/>} />
            </Route>

            <Route path="/altaproducto" element={<AltaProducto/>} />    

            <Route path="/EditProdu" element={<AdminEditProduct/>} />  

        {/*-------------------Carrito------------------------ */}
         <Route path="carrito" element={<Carrito/>} />
                  
        {/*-------------------Alta categoria------------------------ */}
        <Route path="ACategoria" element={<AltaCategoria/>} />

        {/*-------------------modifica elimina categoria------------------------ */}
        <Route path="ModCategoria" element={<MainCategoria/>} />

        <Route path="categorias" element={<AdminEditCategory/>} />

 {/*-------------------cupones------------------------ */}
          <Route path="/cupones" element={<Cupones/>} />
          <Route path="/cuponesABM" element={<CuponesABM/>} />
    
         {/*-------------------ERROR------------------------ */}
        <Route path="*" element={<div>404 - Pagina no encontrada</div>} />
         </Route>

     {/*-------------------ERROR------------------------ */}
          

      </Routes>
  </div>

  </div>
  </CarritoProvider>    
  ); 

}

export default App;