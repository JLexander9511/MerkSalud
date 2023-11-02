import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '@/helpers/formatDate';
import { addRegularUser, getRefererData, goIdle } from '@/store/app';

function AddUsers() {

  const {status, message} = useSelector( state => state.app )
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const [type, setType] = useState('green')
  const [userType, setUserType] = useState('regular')

  const isProcessing = useMemo( () => status === 'processing', [status])

  const reset = () => {
    setValue('displayName', '');
    setValue('cedula', '');
    setValue('email', '');
    setValue('phone', '');
    setValue('description', '');
    setValue('refUid', '');
    setType('green')
    setUserType('regular')
    setValue('bank', '');
    setValue('refTransaction', '');
  }

  const onSubmit = async (data) => {

    data.refData = (data.refUid) ? await getRefererData(data.refUid) : null;
    data.refData.refUid = getValues("refUid");
    data.date = formatDate(new Date());
    data.type = type;
    data.userType = userType;
    const fechaExpiracion = new Date(); 
    fechaExpiracion.setFullYear(fechaExpiracion.getFullYear()+1)
    const expirationDate= formatDate(fechaExpiracion)
    dispatch(addRegularUser({...data, expirationDate}))

    setTimeout(() => {
      dispatch(goIdle())
    }, 3000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='flex h-full w-full mt-8'>
        
        <div className='w-9/12 p-2'>
            
            <div className='grid grid-cols-3 gap-4 pb-4' style={{borderBottom: '1px solid rgb(161 161 170)'}}>

            <div>
                <label className='font-semibold text-lg'>Nombre y Apellido{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                <input 
                    type="text" placeholder="Nombre y Apellido" {...register("displayName", {required: true, maxLength: 80})} 
                    className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
            </div>

            <div>
                <label name='cedula' className='font-semibold text-lg'>Cedula{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                <input 
                    type="text" placeholder="Cedula" {...register("cedula", {required: true, maxLength: 12})} 
                    className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
            </div>

            <div>
                <label name='email' className='font-semibold text-lg'>Email{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                <input 
                    type="email" placeholder="Correo Electronico" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} 
                    className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
            </div>

            <div>
                <label name='telefono' className='font-semibold text-lg'>Telefono{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                <input 
                    type="tel" placeholder="Numero de Telefono" {...register("phone", {required: true, maxLength: 16})} 
                    className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
            </div>

            <div>
                <label name='refUid' className='font-semibold text-lg'>Id de Referente{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                <input 
                    type="tel" placeholder="Id de Referente" {...register("refUid", {required: false, maxLength: 50})} 
                    className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
            </div>

            <div>
                <label name='description' className='font-semibold text-lg'>Descripcion{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                <input 
                    type="tel" placeholder="Descripcion" {...register("description", {required: true, maxLength: 255})} 
                    className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
            </div>

            </div>

            <div className='grid grid-cols-2 gap-4 pb-4 mt-2' style={{borderBottom: '1px solid rgb(161 161 170)'}}>

                <div>
                    <label name='userType' className='font-semibold text-lg'>Tipo de usuario</label>
                    <div className='rounded-xl overflow-hidden flex items-stretch border-slate-400' style={{borderWidth:1}}>
                        <button className='p-2 bg-green-600 w-1/3 hover:bg-green-700 ease-in-out duration-300' onClick={() => setUserType('regular')}>Regular {(userType == 'regular') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                        <button className='p-2 bg-blue-500 w-1/3 hover:bg-blue-600 ease-in-out duration-300' onClick={() => setUserType('subsidized')}>Subsidiado {(userType == 'subsidized') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                        <button className='p-2 bg-amber-500 text-black w-1/3 hover:bg-amber-600 ease-in-out duration-300' onClick={() => setUserType('premium')}>Premium {(userType == 'premium') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                    </div>    
                </div>

                <div className='flex flex-col items-start'>
                    <h2 className='font-semibold text-xl'>Tipo de suscripcion</h2>
                    <div className='rounded-xl overflow-hidden flex items-stretch border-slate-400 w-full' style={{borderWidth:1}}>
                        <button className='p-2 bg-green-600 w-1/4 hover:bg-green-700 ease-in-out duration-300' onClick={() => setType('green')}>Green {(type == 'green') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                        <button className='p-2 bg-blue-500 w-1/4 hover:bg-blue-600 ease-in-out duration-300' onClick={() => setType('blue')}>Blue {(type == 'blue') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                        <button className='p-2 bg-black text-white w-1/4 hover:bg-slate-700 ease-in-out duration-300' onClick={() => setType('black')}>Black {(type == 'black') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                        <button className='p-2 bg-amber-500 w-2/6 hover:bg-amber-600 ease-in-out duration-300' onClick={() => setType('premium')}>Premium {(type == 'premium') && <CheckCircleIcon sx={{width: 20, color: 'white'}}/>}</button>
                    </div>    
                </div>
                
            </div>

            <div className='mt-2 flex'>

                <div className='me-4'>
                    <label name='bank' className='font-semibold text-lg'>Nombre de Banco{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                    <input 
                        type="tel" placeholder="Nombre de banco" {...register("bank", {required: true, maxLength: 255})} 
                        className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
                </div>

                <div>
                    <label name='refTransaction' className='font-semibold text-lg'>Numero de Transaccion{errors.nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2 text-center inline'>*</p>}</label>
                    <input 
                        type="tel" placeholder="N° Referencia" {...register("refTransaction", {required: true, maxLength: 255})} 
                        className='rounded p-2 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
                </div>

            </div>

        </div>

        <div className='w-3/12 p-2 flex flex-col'>
            <input disabled={ isProcessing } type="submit" value="Registrar usuario" className='p-2 font-bold text-white bg-green-500 rounded-md disabled:bg-slate-400 text-black cursor-pointer'/>
            <button disabled={ isProcessing } onClick={reset} className='p-2 font-bold text-white rounded-md bg-slate-400 text-black mt-2'>Reset</button>
        </div>
        
    </div>
    </form>
  )
}

export default AddUsers