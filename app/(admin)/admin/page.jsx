"use client";

import Image from 'next/image'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AdminLForm from './components/AdminLForm';
import { BallBeat } from 'react-pure-loaders';
import WithState from '@/app/validators/WithState';

function Page() {

  return (
      <section className='h-screen grid place-content-center '>

          <div className='bg-white rounded-xl'>
              
              <div className='py-8 px-16 flex flex-col items-center'>
                  <Image
                      src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694824934/ms-logo_torgzu.png'
                      height={100}
                      width={200}
                      alt='Merksalud Logo'/>
                  
                  <h1 className='mt-4 font-bold text-2xl'>Acceso de administrador</h1>

                  <WithState loader={<BallBeat color={'#123abc'} loading={true}/>}>
                    <AdminLForm/>
                  </WithState>

              </div>

          </div>

          <ToastContainer/>

          </section>
    
  )
}

export default Page