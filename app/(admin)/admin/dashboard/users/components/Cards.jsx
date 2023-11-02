import { destroyCard, getAllCards, goIdle, renewCard, updateCard } from "@/store/app";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MaterialReactTable } from 'material-react-table'; 
import { BallGridPulse } from "react-pure-loaders";
import Image from "next/image";
import cardExpTime from "@/helpers/cardExpTime";
import { useForm } from 'react-hook-form';

function Cards() {

  const {status, cards} = useSelector( state => state.app )
  const dispatch = useDispatch()
  const [cardSelectedData, setCardSelectedData] = useState({})
  const [updateSelected, setUpdateSelected] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();

  const isProcessing = useMemo( () => status === 'processing', [status])

  const refreshData = () => {
    dispatch(getAllCards())
    setTimeout(() => {
      dispatch(goIdle())
    }, 3000);
  }

  const deleteCard = (id, serial) => {

    const secure = confirm('Esta seguro que desea eliminar esta tarjeta?')

    if(secure){
      dispatch( destroyCard(id, serial) )

      setTimeout(() => {
        dispatch( goIdle() )
      }, 3000);
    }
  
  }

  const cardUpdate = (id, serial) => {
    

    const secure = confirm('Esta seguro que desea actualizar esta tarjeta?')

    if(secure){
      dispatch( updateCard(id, serial, getValues('newType')) )

      setTimeout(() => {
        dispatch( goIdle() )
      }, 3000);
    }
    
  }

  const cardRenew = (id, serial) => {

    const secure = confirm('Esta seguro que desea renovar esta tarjeta?')

    if(secure){
      dispatch( renewCard(id, serial) )

      setTimeout(() => {
        dispatch( goIdle() )
      }, 3000);
    }
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: 'expireDate',
        header: 'Estatus',
        Cell: ({ cell }) => {
          return (
            <div>
              {(cell.row.original.status == 'inactive') 
              ? <span className='bg-slate-400 text-white font-semibold rounded-md' style={{padding: 4, cursor: 'pointer'}}>Inactiva</span>
              : (cardExpTime(cell.row.original.createDate, cell.getValue()) == 'Activa') 
              ? <span className='bg-green-500 font-semibold rounded-md text-white' style={{padding: 5, cursor: 'pointer'}}>Activo</span>
              : (cardExpTime(cell.row.original.createDate, cell.getValue()) == 'Expira pronto') 
                ? <span className='bg-yellow-500 font-semibold rounded-md text-white' style={{padding: 5, cursor: 'pointer'}}>Expira Pronto</span> 
                : <span className='bg-red-500 font-semibold rounded-md text-white' style={{padding: 5, cursor: 'pointer'}}>Vencida</span> }
            </div>
          )
        },
      },
      {
        accessorKey: 'serial', //simple recommended way to define a column
        header: 'Serial',
        muiTableHeadCellProps: { sx: { color: 'black' } },
        Cell: ({ cell, column }) => (
          <div style={{width: '130px'}} className="text-ellipsis overflow-hidden truncate ...">
            <span>{cell.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: 'type', //alternate way
        header: 'Tipo',
        muiTableHeadCellProps: { sx: { color: 'black' } },
        muiTableBodyCellProps: { sx: { textTransform: 'capitalize' } },
      },
      {
        accessorKey: 'cardOwner', //alternate way
        header: 'Nombre Afiliado',
        muiTableHeadCellProps: { sx: { color: 'black' } },
      },
    ],
    [],
  );

  return (
    <div className='flex h-full w-full mt-8'>
      <div className='w-9/12 pe-2'>
      {(status == 'querying') 
            ? <BallGridPulse color={'#123abc'} loading={true}/> 
            : <MaterialReactTable 
            columns={columns} 
            data={cards} 
            enableGlobalFilter
            enableStickyHeader
            muiTableBodyCellProps = {
              {
                sx: {width: '50px'}
              }
            }
            muiTableContainerProps={
              {
                sx:{
                  height: '75%',
                }
              }
            }
            muiTableBodyRowProps={({ row }) => ({
              onClick: (event) => {
                setCardSelectedData(() => row.original)
              },
              sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
              },
            })
          }
          renderTopToolbarCustomActions={() => (
            <button className='m-2' onClick={refreshData}>
              <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1696258387/refresh_lr66jl.png'
                width={25}
                height={25}
                alt='refresh icon'/>
            </button>
          )}
          />}
      </div>

      <div className='w-3/12 ps-2 flex flex-col'>
        {
          (JSON.stringify(cardSelectedData) === '{}')
          ? <strong>Seleccione una tarjeta para ver sus datos</strong> 
          : <>
              <h2 className='text-xl font-semibold mb-2'>Info. de tarjeta MerkSalud</h2>

              <div className='grid grid-cols-2 gap-4'>

                <div className='flex flex-col w-full'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Serial</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{cardSelectedData.serial}</span>
                </div>

                <div className='flex flex-col w-full'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Portador</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{cardSelectedData.cardOwner}</span>
                </div>

                <div className='flex flex-col w-full'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Fecha expedicion</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{cardSelectedData.createDate}</span>
                </div>

                <div className='flex flex-col w-full'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Fecha venc.</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{cardSelectedData.expireDate}</span>
                </div>

                <div className='flex flex-col w-full'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Tipo</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{cardSelectedData.type.toUpperCase()}</span>
                </div>

                <div className='flex flex-col w-full'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Id Portador</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{cardSelectedData.relatedUid}</span>
                </div>

                <div className='flex justify-between h-full w-full relative'>
                  <button disabled={ isProcessing } onClick={ () => deleteCard(cardSelectedData.relatedUid, cardSelectedData.serial) } className='p-2 font-bold text-white bg-red-600 rounded-md disabled:bg-slate-400 text-black'>Eliminar tarjeta</button>
                  <button disabled={ isProcessing } onClick={ () => cardRenew(cardSelectedData.relatedUid, cardSelectedData.serial) } className='p-2 mx-2 font-bold text-white bg-sky-500 rounded-md disabled:bg-slate-400 text-black'>Renovar Tarjeta</button>
                  <button disabled={ isProcessing } onClick={ () => setUpdateSelected(true) } className='p-2 font-bold text-white bg-green-500 rounded-md disabled:bg-slate-400 text-black'>Actualizar Suscripcion</button>
                  {
                    updateSelected && 
                    <div className="absolute top-20 w-72">
                      <form>

                        <div className="flex flex-col">
                          
                          <label className="font-bold">Seleccione actualizacion</label>

                          <select {...register("newType")} className="w-40 border-2 border-slate-400 rounded-lg my-2">
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                            <option value="premium" >Premium</option>
                          </select>
                          
                        </div>
                      
                      </form>
                      <button disabled={ isProcessing } onClick={() => cardUpdate(cardSelectedData.relatedUid, cardSelectedData.serial)} className='me-2 cursor-pointer p-2 font-bold text-white bg-blue-500 rounded-md disabled:bg-slate-400 text-black'>Actualizar</button>
                      <button disabled={ isProcessing } className='p-2 font-bold text-white bg-red-600 rounded-md disabled:bg-slate-400 text-black' onClick={ () => setUpdateSelected(false) }>Cancelar</button>
                    </div>
                  }
                </div>
                
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Cards