"use client";

import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { useRef } from 'react';
import { toast } from 'react-toastify';

function ContactForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const form = useRef() // REVISAR SI PUEDO QUITAR ESTO

    const onSubmit = async (data) => {

        try {
            const sendEmail = await emailjs.sendForm('service_40wgkur','template_c73823a','.contactForm','vWD9hlEWZffgbqTLo')
            if(sendEmail.status == 200) {
                toast.success("Mensaje enviado con exito!!", {
                    position: toast.POSITION.TOP_CENTER
                  });
                reset();
            }
        } catch (error) {
            toast.error("No se pudo enviar el mensaje.", {
                position: toast.POSITION.TOP_LEFT
              });
        }

    };

  return (
    <form ref={form} onSubmit={handleSubmit(onSubmit)} className='contactForm flex flex-col items-center mb-8'>

        <input className='mt-8 rounded-lg bg-slate-100 p-4 w-full outline-none border-b-2 border-green-600' type="text" placeholder="Nombre" {...register("Nombre", {required: true, maxLength: 80})} />
        {errors.Nombre?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el nombre</p>}

        <input className='mt-8 rounded-lg bg-slate-100 p-4 w-full outline-none border-b-2 border-green-600' type="text" placeholder="Asunto" {...register("Asunto", {required: true, maxLength: 80})} />
        {errors.Asunto?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el asunto</p>}

        <input className='mt-8 rounded-lg bg-slate-100 p-4 w-full outline-none border-b-2 border-green-600' type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.Email?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el Email</p>}

        <input className='mt-8 rounded-lg bg-slate-100 p-4 w-full outline-none border-b-2 border-green-600' type="tel" placeholder="Numero de Telefono" {...register("Telefono", {required: false, maxLength: 15})} />

        <textarea className='mt-8 rounded-lg p-4 bg-slate-100 w-full outline-none border-b-2 border-green-600' rows={5} placeholder='Ingrese su mensaje' style={{resize: 'none'}} {...register("Mensaje", {required: true, maxLength: 2000})} />
        {errors.Mensaje?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el Mensaje</p>}

        <input type="submit" className='mt-8 w-full p-4 bg-green-500 rounded-xl text-white font-bold text-xl' style={{cursor: 'pointer'}}/>

    </form>
  )
}

export default ContactForm
