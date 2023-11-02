import formatDate from '@/helpers/formatDate';
import { addRegularUser, deleteDocument, goIdle, updateDocument } from '@/store/app';
import Tooltip from '@mui/material/Tooltip';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function DataShowcase({data}) {

  const {status, message, requests} = useSelector( state => state.app )
  const dispatch = useDispatch()

  const isProcessing = useMemo( () => status === 'processing', [status])

  const updateState = () => {

    const secure = confirm('Esta seguro que desea poner en revision?');
    
    if(secure) {
      dispatch(updateDocument(data.id, {
        status: 'reviewing'
      }))
  
      setTimeout(() => {
        dispatch(goIdle())
      }, 3000);
    }

  }

  const deleteRequests = () => {

    const secure = confirm('Esta seguro que desea eliminar esta solicitud?');

    if(secure){
      dispatch(deleteDocument(data.id))

      setTimeout(() => {
        dispatch(goIdle())
      }, 3000);
    }

  }

  const registerRegularUser = () => {

    const fechaExpiracion = new Date();
    fechaExpiracion.setFullYear(fechaExpiracion.getFullYear()+1)
    const expirationDate= formatDate(fechaExpiracion)

    const secure = confirm('Esta seguro que desea aprobar esta solicitud?');

    if (secure){

      dispatch(addRegularUser({...data, expirationDate}))
      setTimeout(() => {
        dispatch(goIdle())
      }, 3000);
      
    }
    
  }

  return (
    <>
        <h2 className='text-xl font-semibold mb-2'>Informacion de solicitante</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col w-full mx-2'>
            <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Id</span>
            <span className='text-ellipsis overflow-hidden'>{data.id}</span>
          </div>

          <div className='flex flex-col w-full mx-2'>
            <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Fecha</span>
            <span>{data.date }</span>
          </div>

          <div className='flex flex-col w-full mx-2'>
            <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Nombre</span>
            <span>{data.displayName}</span>
          </div>

          <div className='flex flex-col w-full mx-2'>
            <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Cedula</span>
            <span>{data.cedula}</span>
          </div>
          
          <div className='flex flex-col w-full mx-2'>
            <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Email</span>
            <span className='text-ellipsis overflow-hidden'>{data.email}</span>
          </div>

          <div className='flex flex-col w-full mx-2'>
            <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Referente</span>
            <span>{(data.refData) ? <span className='cursor-pointer'><Tooltip title={<div>
                                                            <span>Id: {data.refData.refUid}</span>
                                                            <br/>
                                                            <span>Name: {data.refData.refName}</span>
                                                          </div>}>
                                              Si
                                          </Tooltip></span> : 'No'}</span>
          </div>

        </div>

        <div className='mt-4'>
            <h2 className='text-xl font-semibold'>Informacion de pago</h2>
            <div className='grid grid-cols-2 gap-4 mt-2'>
              <div className='flex flex-col w-full mx-2'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Banco</span>
                <span>{data.bank}</span>
              </div>

              <div className='flex flex-col w-full mx-2'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>N° Referencia</span>
                <span>{data.refTransaction}</span>
              </div>
            </div>
        </div>

        <div className='flex items-center justify-between h-full'>
          <button disabled={ isProcessing } onClick={ registerRegularUser } className='p-2 font-bold text-white bg-green-500 rounded-md disabled:bg-slate-400 text-black'>Aprobar solicitud</button>
          <button disabled={ isProcessing } onClick={ updateState } className='p-2 font-bold text-white bg-blue-700 rounded-md mx-2 disabled:bg-slate-400 text-black'>Poner en revision</button>
          <button disabled={ isProcessing } onClick={ deleteRequests } className='p-2 font-bold text-white bg-red-600 rounded-md disabled:bg-slate-400 text-black'>Eliminar solicitud</button>
        </div>
    </>
  )
}

export default DataShowcase