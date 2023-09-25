"use client";

import { useScreenSize } from '@/hooks';

function FirstSection() {
  
  const sectionSP = "flex flex-col justify-items-center items-center py-6"
  const sectionTabDskp = "flex flex-col justify-items-start items-center py-6"
  
  const {screenType} = useScreenSize();

  return (
    <section
      className={(screenType == 'SmartPhone') ? `${sectionSP}` : `${sectionTabDskp}`}
      style={{
        backgroundImage: 'url(https://d1yei2z3i6k35z.cloudfront.net/4358935/649da4e3c61de_Inicio1.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className={(screenType == 'SmartPhone') ? `` : `w-2/6 self-start my-6 ms-24`}>
          <h1 
            className={(screenType == 'Tab') ? 'text-4xl font-bold text-center' : 'text-4xl font-bold text-center leading-normal'}
            style={{color: 'rgba(5, 11, 115, 1)'}}
          >¡LOS MEJORES DESCUENTOS EN SERVICIOS MÉDICOS PARA AFILIADOS!</h1>

          <h2 
            className='text-3xl font-bold text-center my-3'
            style={{color: 'rgba(74, 74, 74, 1)'}}>Fácil y sencillo!</h2>
        </div>
    </section>
  )
}

export default FirstSection