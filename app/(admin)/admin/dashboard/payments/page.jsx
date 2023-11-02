"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DailyOp from "./components/DailyOp";
import { getDailyOp, getPendingPayments } from "@/store/app";
import PendingPayments from "./components/PendingPayments";

function Pagos() {

  const [component, setComponent] = useState(<DailyOp/>);
  const dispatch = useDispatch()
  const {ops, pPayments} = useSelector( state => state.app )

  const selectComponent = (nombre) => {
    switch (nombre) {
      case 'DailyOperations':
      setComponent(<DailyOp />);
      break;

      case 'PendingPayments':
      setComponent(<PendingPayments />);
      break;

      // case 'Cards':
      // setComponent(<Cards />);
      // break;

      default:
      setComponent(null);
    }
  };

  useEffect(() => {
    (ops.length == 0 || !ops.length) && dispatch(getDailyOp());
    (pPayments.length == 0 || !pPayments.length) && dispatch(getPendingPayments());
  }, [])

  return (
    <section className="bg-white rounded-md p-8 h-full">
      <div className="pb-4 border-b border-slate-300">
        <button 
          className="solidBtnA p-4 text-white font-medium rounded-md" 
          style={{backgroundColor:'rgb(28,174,95)'}}
          onClick={() => selectComponent('DailyOperations')}>
          Operaciones diarias
        </button>

        <button 
          className="solidBtnA p-4 text-white font-medium rounded-md ms-4" 
          style={{backgroundColor:'rgb(28,174,95)'}}
          onClick={() => selectComponent('PendingPayments')}>
          Pagos pendientes
        </button>

         {/*<button 
          className="solidBtnB p-4 text-white font-medium rounded-md ms-4" 
          style={{backgroundColor:'rgb(65,93,153)'}}
          onClick={() => selectComponent('Cards')}>
          Gestionar tarjetas Merksalud
        </button> */}
      </div>
      <div className="flex items-center" style={{height:'85%'}}>
            {component}
      </div>

    </section>
  )
}

export default Pagos