import { MaterialReactTable } from 'material-react-table'; 
import { useMemo, useState } from "react";

import { BallGridPulse } from 'react-pure-loaders';
import DataShowcase from './subComponents/DataShowcase';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequests, goIdle } from '@/store/app';
import Image from 'next/image';


function Requests() {

  const {status, message, requests} = useSelector( state => state.app )
  const dispatch = useDispatch()
  const [reqSelectedData, setreqSelectedData] = useState({})

  const refreshData = () => {
    dispatch(getUserRequests())

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
          (cell.row.original.status == 'pending') 
            ? <span className='bg-yellow-500 font-semibold rounded-md text-white' style={{padding: 5, cursor: 'pointer'}}>Pendiente</span> 
            : <span className='bg-slate-400 text-white font-semibold rounded-md' style={{padding: 4, cursor: 'pointer'}}>En revisión</span>
        ),
      },
      {
        accessorKey: 'date', //simple recommended way to define a column
        header: 'Fecha',
        muiTableHeadCellProps: { sx: { color: 'black' } },
      },
      {
        accessorKey: 'displayName', //alternate way
        header: 'Nombre',
        muiTableHeadCellProps: { sx: { color: 'black' } },
      },
      {
        accessorKey: 'refTransaction', //alternate way
        header: 'Numero Transaccion',
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
          data={requests} 
          enableGlobalFilter
          enableStickyHeader
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
      
      <div className='w-3/12 ps-2 flex flex-col'>
            
          { (JSON.stringify(reqSelectedData) === '{}') ? <strong>Seleccione una solicitud para ver sus datos</strong> :  <DataShowcase data={reqSelectedData}/>}

      </div>
    </div>

  )
}

export default Requests