import React from 'react';
import { Link } from 'react-router-dom';
import facebock from "../IMAGES/faceboock.jpg";
import instagram from "../IMAGES/instagram.png";
import twitter from "../IMAGES/twitter.png";
import youtube from "../IMAGES/youtube.png";


//traer imagen whatsapp
  

const Footer = ()=>{

return (
  <div className='fixed bottom-0 left-0 w-full bg-primary p-2'>
  <hr />
  <ul className='flex space-x-3'>
    <div className='facebook hover:hover:bg-sky-700 boton_footermd-3 p-2'>
      <Link to='https://es-la.facebook.com/login/device-based/regular/login/'>
        <img src={facebock} width="30" alt="Facebook" />
      </Link>
    </div>
    <div className='instagram hover:hover:bg-sky-700 boton_footermd-3 p-2'>
      <Link to='https://www.instagram.com/?hl=es-la'>
        <img src={instagram} width="30" alt="Instagram" />
      </Link>
    </div>
    <div className='facebook hover:hover:bg-sky-700 boton_footermd-3 p-2'>
      <Link to='https://es-la.facebook.com/login/device-based/regular/login/'>
        <img src={youtube} width="30" alt="Youtube" />
      </Link>
    </div>
    <div className='facebook hover:hover:bg-sky-700 boton_footermd-3 p-2'>
      <Link to='https://es-la.facebook.com/login/device-based/regular/login/'>
        <img src={twitter} width="30" alt="Twitter" />
      </Link>
    </div>
  </ul>
</div>
  )
}

export default Footer

