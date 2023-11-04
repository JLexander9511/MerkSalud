import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processRequest, goIdle } from '@/store/app';

import { toast } from 'react-toastify';
import formatDate from '@/helpers/formatDate';

function PaymentForm({type}) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const {status, message} = useSelector((state) => state.app);
  const ref = useSearchParams().get('ref') || '';
  const isAuthenticating = useMemo( () => status === 'processing', [status])

  const dispatch = useDispatch();

  useEffect(() => {
    setValue('refNumber', ref)
    dispatch( goIdle() )
  }, [])

  useEffect(() => {
    
    (status == 'success') && 
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });

    (status == 'error') && 
      toast.error('Ha ocurrido un error, intente luego.', {
        position: toast.POSITION.TOP_LEFT
  });
    
  }, [status])
  
  
  const onSubmit = (data) => {
    if(!type) {
      alert('Seleccione una Tarjeta')
    } else {
      data.type = type || 'green';
      data.fecha = formatDate(new Date());
      dispatch( processRequest(data) );
      reset();
      setTimeout(() => {
        dispatch( goIdle() )
      }, 3000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="text" placeholder="Nombre" {...register("nombre", {required: true, maxLength: 80})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese el nombre</p>}

      <input 
        type="text" placeholder="Apellido" {...register("apellido", {required: true, maxLength: 80})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.apellido?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese el apellido</p>}

      <input 
        type="text" placeholder="Cedula" {...register("cedula", {required: true, maxLength: 12})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.cedula?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese la cedula</p>}

      <input 
        type="email" placeholder="Correo Electronico" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.email?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese el correo electronico</p>}

      <input 
        type="tel" placeholder="Numero de Telefono" {...register("telefono", {required: true, maxLength: 16})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.telefono?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese el telefono</p>}

      <input 
        type="text" placeholder="Banco emisor" {...register("banco", {required: true, maxLength: 255})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.banco?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese el banco desde donde se transfiere</p>}

      <input 
        type="text" placeholder="Nro. transaccion" {...register("refTransaction", {required: true, maxLength: 50})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      {errors.refTransaction?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center'>Ingrese el numero de referencia de la transaccion</p>}

      <input 
        type="text" placeholder="Id. referente" {...register("refNumber", {required: false, maxLength: 50})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}
        />

    <div className='flex flex-col items-center mt-8'>

        <input 
            className='border-b-4 py-4 px-16 rounded-lg text-xl text-white paymentSentButton' 
            type="submit" 
            style={{background: 'rgb(1, 116, 199)', borderColor: 'rgb(1, 77, 130)'}}
            disabled = { isAuthenticating }/>
                 
    </div>
    </form>
  );
}
export default PaymentForm