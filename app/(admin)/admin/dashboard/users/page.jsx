"use client";

import { useState } from "react";
import Cards from "./components/Cards"
import Requests from "./components/Requests"
import Users from "./components/Users"

function Usuarios() {

  const [component, setComponent] = useState(<Requests />);

  const selectComponent = (nombre) => {
    switch (nombre) {
      case 'Requests':
      setComponent(<Requests />);
      break;

      case 'Users':
      setComponent(<Users />);
      break;

      case 'Cards':
      setComponent(<Cards />);
      break;

      default:
      setComponent(null);
    }
  };
  
  return (
    <section className="bg-white rounded-md p-8 h-full">
      <div className="pb-4 border-b border-slate-300">
        <button 
          className="solidBtnA p-4 text-white font-medium rounded-md" 
          style={{backgroundColor:'rgb(28,174,95)'}}
          onClick={() => selectComponent('Requests')}>
          Nuevas solicitudes
        </button>

        <button 
          className="solidBtnA p-4 text-white font-medium rounded-md ms-4" 
          style={{backgroundColor:'rgb(28,174,95)'}}
          onClick={() => selectComponent('Users')}>
          Gestion de usuarios
        </button>

        <button 
          className="solidBtnB p-4 text-white font-medium rounded-md ms-4" 
          style={{backgroundColor:'rgb(65,93,153)'}}
          onClick={() => selectComponent('Cards')}>
          Gestionar tarjetas Merksalud
        </button>
      </div>
      <div>
        {component}
      </div>
    </section>
  )
}

export default Usuarios