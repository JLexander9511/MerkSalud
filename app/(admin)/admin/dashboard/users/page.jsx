"use client";

import { useState, useEffect } from "react";
import Cards from "./components/Cards"
import Requests from "./components/Requests"
import Users from "./components/Users"
import { useDispatch, useSelector } from "react-redux";
import { getAllCards, getAllUsers, getUserRequests } from "@/store/app";
import AddUsers from "./components/AddUsers";


function Usuarios() {

  const [component, setComponent] = useState(<Requests />);
  const dispatch = useDispatch();

  const {requests, users, cards} = useSelector( state => state.app )

useEffect(() => {
  (requests.length == 0 || !requests.length) && dispatch(getUserRequests());
  (users.length == 0 || !users.length) && dispatch(getAllUsers());
  (cards.length == 0 || !cards.length) && dispatch(getAllCards());
}, [])

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

      case 'AddUser':
      setComponent(<AddUsers />);
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

        <button 
          className="solidBtnB p-4 text-white font-medium rounded-md ms-4" 
          style={{backgroundColor:'rgb(65,93,153)'}}
          onClick={() => selectComponent('AddUser')}>
          Agregar usuario
        </button>

      </div>
      <div className="flex items-center" style={{height:'85%'}}>
            {component}
      </div>
    </section>
  )
}

export default Usuarios