"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useScreenSize } from '@/hooks';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import ContactForm from './components/ContactForm';

function Page() {

  const [emailActivo, setEmailActivo] = useState(false)
  const [telefonoActivo, setTelefonoActivo] = useState(false)

  const {screenType} = useScreenSize();

  return (
    <section className={(screenType != 'Desktop') ? 'flex flex-col items-center px-4 pb-8' : 'flex items-center justify-evenly'}>

      <div>

        <div>
          <div className="mt-8">
            <h2 className="text-6xl font-bold text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Contáctanos</h2>
          </div>
          <p className="text-center mx-2 text-xl mt-4" style={{color: 'rgba(74, 74, 74, 1)'}}>¿Tienes una solicitud o feedback para nosotros? <br/> Completa el siguiente formulario para contactar a nuestro equipo</p>
        </div>
        <ContactForm/>

      </div>
      <div className='flex flex-col items-center' style={{color: 'rgba(74, 74, 74, 1)'}}>
        <h3 className='text-2xl text-center font-medium'>Siempre atentos a sus requerimientos</h3>

        <div className='flex items-center mt-4 flex flex-col'>
          <Link href='https://wa.link/sa3udz' className='py-2 px-4 rounded-lg bg-green-400 flex items-center'>
            <Image
              src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694562356/ws_cqn9ku.png'
              width={25}
              height={25}
              alt='Icon'
            />
            <span className='text-white font-medium ms-2'>Whatsapp</span>
          </Link>
        
          <div className='flex flex-col items-center'>

            <button className='py-2 px-4 rounded-lg bg-slate-200 flex items-center my-4' onClick={() => setEmailActivo(!emailActivo)}>
              <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694563240/email_z38qqm.png'
                width={25}
                height={25}
                alt='Icon'
              />
              <span className='font-medium ms-2'>{`${(emailActivo) ? 'Ocultar' : 'Mostrar'} email`}</span>
            </button>

            {
              emailActivo && <p className='font-medium text-lg mb-2' style={{color: 'rgba(74, 74, 74, 1)'}} >infomerksalud@gmail.com</p>
            }

          </div>
          
          <div className='flex flex-col items-center'>
            <button className='py-2 px-4 rounded-lg flex items-center' style={{backgroundColor: 'rgb(28, 69, 164)'}} onClick={() => setTelefonoActivo(!telefonoActivo)}>
              <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694563240/phone_jmk8lw.png'
                width={18}
                height={25}
                alt='Icon'
              />
              <span className='font-medium ms-2 text-white'>{`${(telefonoActivo) ? 'Ocultar' : 'Mostrar'} telefono`}</span>
            </button>

            {
              telefonoActivo && <p className='font-medium text-lg my-2' style={{color: 'rgba(74, 74, 74, 1)'}} >+58 412-7241338</p>
            }
          </div>
          
        </div>
      </div>

      <ToastContainer/>
    </section>
    
  );
  }

export default Page
