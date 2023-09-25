import { useForm } from 'react-hook-form';


function PaymentForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="text" placeholder="Nombre" {...register("nombre", {required: true, maxLength: 80})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      <input 
        type="text" placeholder="Apellido" {...register("apellido", {required: true, maxLength: 80})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      <input 
        type="text" placeholder="Cedula" {...register("cedula", {required: true, maxLength: 12})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      <input 
        type="email" placeholder="Correo Electronico" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      <input 
        type="tel" placeholder="Numero de Telefono" {...register("telefono", {required: true, maxLength: 16})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      <input 
        type="text" placeholder="Banco emisor" {...register("banco", {required: true, maxLength: 255})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>
      <input 
        type="text" placeholder="Nro. de Referencia" {...register("refNumber", {required: true, maxLength: 50})} 
        className='mt-8 rounded-lg p-4 w-full outline-none border-slate-400 text-lg' style={{borderWidth: 1}}/>

    <div className='flex flex-col items-center mt-8'>

        <input 
            className='border-b-4 py-4 px-16 rounded-lg text-xl text-white' 
            type="submit" 
            style={{background: 'rgb(1, 116, 199)', borderColor: 'rgb(1, 77, 130)'}}/>
            
    </div>
      
    </form>
  );
}
export default PaymentForm