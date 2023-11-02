import { useMemo, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

import { MaterialReactTable } from 'material-react-table'; 
import Image from 'next/image';
import { BallGridPulse } from 'react-pure-loaders';
import { getDailyOp, goIdle, makeWeeklyAccountReport } from "@/store/app";
import OpShowcase from "./SubComponents/OpShowcase";

function DailyOp() {

    const {status, message, ops} = useSelector( state => state.app )
    const dispatch = useDispatch()
    const [reqSelectedData, setreqSelectedData] = useState({})
    const isProcessing = useMemo( () => status === 'processing', [status])

    const columns = useMemo(
        () => [
          {
            accessorKey: 'date', //simple recommended way to define a column
            header: 'Fecha',
            muiTableHeadCellProps: { sx: { color: 'black' } },
          },
          {
            accessorKey: 'id', //simple recommended way to define a column
            header: 'Id',
            muiTableHeadCellProps: { sx: { color: 'black' } },
          },
          {
            accessorKey: 'clientName', //alternate way
            header: 'Nombre del Cliente',
            muiTableHeadCellProps: { sx: { color: 'black' } },
          },
          {
            accessorKey: 'transactionReference', //alternate way
            header: 'Numero Transaccion',
            muiTableHeadCellProps: { sx: { color: 'black' } },
          },
        ],
        [],
      );

    const refreshData = () => {
        dispatch(getDailyOp())

        setTimeout(() => {
          dispatch(goIdle())
        }, 3000);
    }

    const makeWeeklyCut = () => {

      const secure = confirm('Realizar el corte semanal?')

      if(secure){
        dispatch(makeWeeklyAccountReport(ops))

        setTimeout(() => {
          dispatch(goIdle())
        }, 3000);
      }
    }

  return (
    <div className='flex h-full w-full mt-8'>

        <div className='w-9/12 pe-2'>
            {(status == 'querying') 
            ? <BallGridPulse color={'#123abc'} loading={true}/> 
            : <MaterialReactTable 
            columns={columns} 
            data={ops} 
            enableGlobalFilter
            enableStickyHeader
            muiTableContainerProps={
                {
                sx:{
                    height: '74%',
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

                <button disabled={ isProcessing } onClick={ makeWeeklyCut } className='p-2 font-bold text-white bg-sky-500 rounded-md disabled:bg-slate-400 text-black'>Realizar corte semanal</button>
                { (JSON.stringify(reqSelectedData) === '{}') 
                ? <strong>Seleccione una operacion para ver sus datos</strong> 
                : <OpShowcase data={ reqSelectedData }/> }

        </div>

    </div>
  )
}
//<DataShowcase data={reqSelectedData}/>
export default DailyOp