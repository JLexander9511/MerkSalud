"use client";

import Link from "next/link";
import Accordion from "./components/Accordion";
import { useScreenSize } from '@/hooks';

function Page() {

  const {screenType} = useScreenSize();

    return (
      <>
      <div>
        <div className="mt-8 border-b-2 border-slate-700 mx-14">
          <h2 className="text-5xl font-bold text-center mb-4" style={{color: 'rgba(63, 93, 153, 1)'}}>Preguntas Frecuentes</h2>
        </div>
      </div>
      <div className={(screenType != 'Desktop') ? 'mt-8 mx-4' : "mx-20 mt-8"}>
        <Accordion 
          title='¿Las tarjetas de descuento son una póliza de seguro?'
          text='No, las tarjetas de descuento no son una póliza de seguro. Son un beneficio adicional que ofrecemos a nuestros clientes para obtener descuentos y beneficios en una variedad de servicios y productos relacionados con la salud y el bienestar. Las tarjetas de descuento pueden complementar una póliza de seguro existente, pero no proporcionan cobertura de seguro por sí mismas.'/>

        <Accordion 
          title='¿Las tarjetas de descuento se vencen?'
          text='Si, nuestras tarjetas de descuento tienen una validez de un (1) año. Para seguir disfrutando de los beneficios debe renovar anualmente su tarjeta.'/>

        <Accordion 
          title='¿Las tarjetas son transferibles?'
          text='No, las tarjetas de descuento no son transferibles. No puede compartir los beneficios de su tarjeta con familiares o amigos Debe adquirir una tarjeta de descuento para cada miembro de su familia si desea brindarles a sus seres queridos acceso a los beneficios exclusivos.'/>

        <Accordion 
          title='¿Cuáles son los servicios cubiertos por las tarjetas?'
          text='Nuestras tarjetas de descuento ofrecen una amplia gama de servicios cubiertos. Esto puede incluir descuentos en consultas médicas, exámenes de laboratorio, medicamentos, servicios dentales, ópticos, terapias alternativas y más.'/>

        <Accordion 
          title='¿Hay alguna restricción en el uso de las tarjetas?'
          text='La única restricción es que el servicio que requiera no este disponible en nuestro directorio de aliados.'/>

        <Accordion 
          title='¿Cuánto puedo ahorrar con las tarjetas?'
          text='El ahorro exacto dependerá del servicio o producto en particular y del proveedor participante. Sin embargo, nuestros clientes suelen experimentar ahorros significativos en una amplia gama de servicios relacionados con la salud y el bienestar.'/>
          
      </div>

      <div className={(screenType == 'Tab') ? 'text-center my-40' : "text-center my-16"}>
        <h2 className="text-2xl mb-8" style={{color: 'rgba(74, 74, 74, 1)'}}>¡Si tienes otra pregunta ponte en <strong>contacto</strong> con nosotros!</h2>
        
        <Link href='/contact' className="bg-sky-600 text-xl px-20 py-4 text-white rounded-lg border-b-4 border-sky-900">
          Contáctanos
        </Link>
      </div>
      </>

    )
  }

export default Page;