import { getAllUsers, goIdle } from "@/store/app"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { MaterialReactTable } from 'material-react-table'; 
import { BallGridPulse } from "react-pure-loaders";
import Image from "next/image";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function Users() {
  
  const {status, message, users} = useSelector( state => state.app )
  const dispatch = useDispatch()

  const [reqSelectedData, setreqSelectedData] = useState({})
  const [cardAccordion, setCardAccordion] = useState(false)
  const [refAccordion, setRefAccordion] = useState(false)

  const refreshData = () => {
    dispatch(getAllUsers())

    setTimeout(() => {
      dispatch(goIdle())
    }, 3000);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'status',
        header: 'Estatus',
        Cell: ({ cell }) => (
          (cell.row.original.status == 'active') 
            ? <span className='bg-green-500 font-semibold rounded-md text-white' style={{padding: 5, cursor: 'pointer'}}>Activo</span> 
            : <span className='bg-slate-400 text-white font-semibold rounded-md' style={{padding: 4, cursor: 'pointer'}}>Inactivo</span>
        ),
      },
      {
        accessorKey: 'id', //simple recommended way to define a column
        header: 'Id',
        muiTableHeadCellProps: { sx: { color: 'black' } },
        Cell: ({ cell, column }) => (
          <div style={{width: '180px'}} className="text-ellipsis overflow-hidden truncate ...">
            <span>{cell.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: 'displayName', //alternate way
        header: 'Nombre y Apellido',
        muiTableHeadCellProps: { sx: { color: 'black' } },
      },
      {
        accessorKey: 'email', //alternate way
        header: 'Email',
        muiTableHeadCellProps: { sx: { color: 'black' } },
        
      },
      {
        accessorKey: 'card.type', //alternate way
        header: 'Tipo',
        muiTableBodyCellProps: { sx: { textTransform: 'capitalize' } },
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
            data={users} 
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
                setreqSelectedData(() => row.original)
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

      <div className='w-3/12 ps-2 flex flex-col overflow-y-scroll scrollbar overflow-x-hidden'>

      { (JSON.stringify(reqSelectedData) === '{}') 
            ? <strong>Seleccione un usuario para ver sus datos</strong> 
        :   <>
              <h2 className='text-xl font-semibold mb-2'>Informacion de usuario</h2>

              <div className='grid grid-cols-2 gap-4'>

                <div className='flex flex-col w-full mx-2'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Id</span>
                  <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{reqSelectedData.id}</span>
                </div>

                <div className='flex flex-col w-full mx-2'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>F. ingreso</span>
                  <span>{ reqSelectedData.regDate }</span>
                </div>

                <div className='flex flex-col w-full mx-2'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Nombre</span>
                  <span>{reqSelectedData.displayName}</span>
                </div>

                <div className='flex flex-col w-full mx-2'>
                  <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Cedula</span>
                  <span>{reqSelectedData.cedula}</span>
                </div>
              </div>

              <div className='flex flex-col w-full mx-2 mt-4'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Email</span>
                <span className='text-ellipsis overflow-hidden'>{reqSelectedData.email}</span>
              </div>

              <div className='flex flex-col w-full mx-2 mt-4'>
                <div className="flex justify-between items-center bg-slate-200 mb-2 rounded-lg" style={{borderBottom: '1px solid rgb(161 161 170)', padding: '0px 5px'}} onClick={() => setCardAccordion(!cardAccordion)}>
                  <span className="font-semibold">Tarjeta</span>
                  <span>{(!cardAccordion) 
                    ? <KeyboardArrowUpIcon/>
                    : <KeyboardArrowDownIcon/>}</span>
                </div>

                  {(cardAccordion) 
                  && <div className="grid grid-cols-2 gap-2">
                        <div className='flex flex-col w-full'>
                          <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Serial</span>
                          <span className='text-ellipsis overflow-hidden'>{ reqSelectedData.card.serial }</span>
                        </div>

                        <div className='flex flex-col w-full'>
                        <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Expiracion</span>
                        <span>{ reqSelectedData.card.expireDate }</span>
                      </div>

                    </div>}
              </div>

              <div className='flex flex-col w-full mx-2 mt-4'>
                <div className="flex justify-between items-center bg-slate-200 mb-2 rounded-lg" style={{borderBottom: '1px solid rgb(161 161 170)', padding: '0px 5px'}} onClick={() => setRefAccordion(!refAccordion)}>
                  <span className="font-semibold">Referidos</span>
                  <span>{(!refAccordion) 
                    ? <KeyboardArrowUpIcon/>
                    : <KeyboardArrowDownIcon/>}</span>
                </div>

                  {(refAccordion) 
                  && <div className="flex flex-col">

                    { (reqSelectedData.referrals.length > 0 ) 
                      ? reqSelectedData.referrals.map((ref, index) => (

                        <div key={ref.uid} className="flex" style={{borderBottom: '1px solid rgb(161 161 170)'}}>
                          <span className="me-2">{ index+1 }</span>
                          <span className='text-ellipsis overflow-hidden whitespace-nowrap w-2/4 me-2'>{ref.uid}</span>
                          <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{ref.refName}</span>
                        </div>
                        
                      )) 
                      : 'No tiene referidos'}

                    </div>}
              </div>
            </>}        

      </div>
    </div>
  )
}

export default Users