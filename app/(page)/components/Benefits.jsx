"use client";

import Image from "next/image"
import { useScreenSize } from '@/hooks';

function Benefits() {

  const {screenType} = useScreenSize();

  return (
    <section className="flex justify-center items-start my-12">

        <Image
            src='https://d1yei2z3i6k35z.cloudfront.net/4358935/649dab9b2544d_Fondodepantallacieloazul3.png'
            width={(screenType == 'Tab') ? 300 : 420}
            height={390}
            alt='Imagenes de salud en dispositivos'
            className={`${(screenType == 'SmartPhone') ? 'hidden' : null}`}
            style={{marginTop: (screenType == 'Tab') ? '5rem' : null}}
            />
        
        <div className={`${(screenType == 'SmartPhone') ? "w-full mt-4 mx-4" : "w-5/12 mt-8 ms-16"}`}>
            <h3 
                className={`${(screenType == 'SmartPhone') ? "text-4xl font-bold text-center" : "text-4xl font-bold text-start"}`}
                style={{color: 'rgba(5, 11, 115, 1)'}}>Asistencia Médica Online y muchos beneficios más...</h3>
            <ul className="list-image-[url('https://res.cloudinary.com/dpjk1eyh0/image/upload/w_15,h_15/v1694193582/tilde_qmwhgz.png')] text-xl ps-12 mt-8">
                <li className="mt-12">Médicos Especialistas</li>
                <li className="mt-4">Servicio Dental y Oftalmológico</li>
                <li className="mt-4">Proveedores de Servicios de Salud</li>
                <li className="mt-4">Seguros de Salud y Vida</li>
                <li className="mt-4">Seguros Funerarios</li>
                
            </ul>
        </div>

    </section>
  )
}

export default Benefits