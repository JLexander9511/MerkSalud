"use client";

import Image from "next/image";
import { useScreenSize } from '@/hooks';

export default function Page() {

  const {screenType} = useScreenSize();

    return (
      <section className={`${ (screenType == 'Tab' ? 'px-8' : (screenType == 'SmartPhone' ? '' : 'px-28')) }`}>
        <div>
          <div className="mt-8 border-b-2 border-slate-700">
            <h2 className="text-6xl font-bold text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Conócenos</h2>
          </div>
          <p className="text-center mx-2 text-xl mt-4 leading-relaxed" style={{color: 'rgba(74, 74, 74, 1)'}}>Ofrecemos tarjetas de descuentos médicos que brindan a nuestros clientes acceso a una amplia red de proveedores de servicios médicos y de bienestar, con descuentos exclusivos en consultas médicas, exámenes de laboratorio, medicamentos, servicios dentales, ópticos y más.</p>
        </div>

        <div className="flex justify-center items-center mt-16">
          <div>
            <div className="border-b-2 border-slate-700">
              <h2 className="text-5xl font-bold text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Misión</h2>
            </div>
            <p className="text-center mx-2 text-xl mt-4 leading-relaxed" style={{color: 'rgba(74, 74, 74, 1)'}}>Ser la plataforma líder en el acceso a servicios de salud de calidad para todos, promoviendo el bienestar y la accesibilidad a través de nuestras tarjetas de descuentos médicos.</p>
          </div>
          <Image
            src="https://d1yei2z3i6k35z.cloudfront.net/4358935/649ddd0d0790b_ca14fea4a7e3124eb55c78a7c6760f33_billionphotos1625427.jpg"
            width={(screenType == 'Tab' ? 350 : 500)}
            height={26}
            alt="Doctora con estetoscopio"
            className={`${(screenType == 'SmartPhone' ? "hidden" : null)}`}
          />
        </div>

        <div className="flex justify-center items-center mt-16">
          <Image
            src="https://d1yei2z3i6k35z.cloudfront.net/4358935/649ddd14e999f_GettyImages-1140150522-1.jpg"
            width={(screenType == 'Tab' ? 350 : 500)}
            height={26}
            alt="Doctor atendiendo"
            className={`${(screenType == 'SmartPhone' ? "hidden" : '')}`}
          />
          <div className={`${ (screenType == 'Tab' ? 'ms-4' : (screenType == 'SmartPhone' ? '' : 'ms-16')) }`}>
            <div className="border-b-2 border-slate-700">
              <h2 className="text-5xl font-bold text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Visión</h2>
            </div>
            <p className="text-center mx-2 text-xl mt-4 leading-relaxed" style={{color: 'rgba(74, 74, 74, 1)'}}>Brindar soluciones integrales y accesibles en el ámbito de la salud, facilitando el acceso a servicios médicos de calidad para mejorar la calidad de vida de nuestros clientes.</p>
          </div>
        </div>
        
        <div className="my-16">
          <div className="mt-8 border-b-2 border-slate-700">
            <h2 className="text-6xl font-bold text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Nuestro Ceo</h2>
          </div>
          <div className={`${ (screenType == 'Tab' ? "flex justify-center items-center mt-8" : (screenType == 'SmartPhone' ? 'flex flex-col mt-8 justify-center items-center' : "flex mt-8 justify-center items-center ms-16")) }`}>
            <Image
              src="https://d1yei2z3i6k35z.cloudfront.net/4358935/649cd6ef6f8f1_Fondodepantallacieloazul2.png"
              width={300}
              height={26}
              alt="Imagen CEO Juan Contreras"
              //style={{display: (screenType == 'SmartPhone' ? "none" : null)}}
              className={`${ (screenType == 'Tab' ? "mx-4" : (screenType == 'SmartPhone' ? '' : "me-16")) }`}
            />
            <div className={`${ (screenType == 'SmartPhone' ? "flex flex-col justify-center items-center " : "") }`}>
              <strong className="text-xl" style={{color: 'rgba(74, 74, 74, 1)'}}>Juan Carlos Contreras</strong>
              <p className={`${ (screenType == 'SmartPhone' ? "text-center text-base mt-4 leading-loose w-11/12 mx-4" : "text-start text-base mt-4 leading-loose w-11/12") }`} style={{color: 'rgb(95, 102, 126)'}}>Con más de 10 años de experiencia en el sector de seguros y servicios de salud, Juan Carlos Contreras es un emprendedor visionario y comprometido con la misión de Merksalud. Su pasión por brindar soluciones integrales y accesibles en el ámbito de la salud ha impulsado el crecimiento y éxito de la empresa. Bajo su liderazgo, Merksalud se convertirá en una plataforma cada vez más confiable y reconocida en el sector de servicios médicos.</p>
            </div>
          </div>
        </div>

      </section>
    )
  }