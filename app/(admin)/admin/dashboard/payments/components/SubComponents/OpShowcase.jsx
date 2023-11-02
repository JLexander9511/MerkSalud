function OpShowcase({data}) {
  return (
    <>
        <h2 className='text-xl font-semibold mb-2 mt-2'>Informacion de operacion</h2>  

        <div className='grid grid-cols-2 gap-4'>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Id</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.id}</span>
            </div>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Nombre cliente</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.clientName}</span>
            </div>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>N°. Referencia</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.transactionReference}</span>
            </div>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Banco</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.bank}</span>
            </div>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Tipo de compra</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.type.toUpperCase()}</span>
            </div>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Monto</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.ammount}$</span>
            </div>

            <div className='flex flex-col w-full'>
                <span style={{borderBottom: '1px solid rgb(161 161 170)'}}>Fecha</span>
                <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.date}</span>
            </div>

        </div>
    </>
  )
}

export default OpShowcase