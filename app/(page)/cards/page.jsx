"use client";

import { useScreenSize } from "@/hooks";
import Image from "next/image";
import CardOptions from "./components/CardOptions";

export default function Page() {

  const { screenType } = useScreenSize();

    return (
      <section className="flex flex-col justify-center items-center">

        <div className="mt-8 border-b-2 border-slate-400 w-full">
          <h1 className="text-5xl font-bold text-center mb-12" style={{color: 'rgba(63, 93, 153, 1)'}}>Tarjetas de Descuento  <br/>porque tu salud es primero...</h1>
        </div>

        <div className="mt-12 border-b-2 border-slate-400 w-full flex flex-col items-center">
          <p className="text-center mx-2 text-2xl mt-4 leading-relaxed w-3/4 mb-16" style={{color: 'rgba(74, 74, 74, 1)'}}>Contamos con una variedad de tarjetas de descuento para servicios médicos y afines accediendo a nuestro directorio de aliados donde podras encontrar diferentes especialidades.</p>
        </div>

          <div className="flex justify-center items-center pb-12 mt-8 border-b-2 border-slate-400 w-full">
            <Image
              src="https://d1yei2z3i6k35z.cloudfront.net/4358935/649dd6e2d58ca_adultos-mayores-salud-en-camino.jpg"
              width={(screenType == 'Tab' ? 350 : 350)}
              height={26}
              alt="Doctor atendiendo"
              className={`${(screenType == 'SmartPhone' ? "hidden" : '')}`}
            />
            <div className={`${(screenType == 'SmartPhone') ? "w-full mt-4 mx-4" : "w-5/12 ms-16 flex flex-col items-center"}`}>
              <h3 
                  className={`${(screenType == 'SmartPhone') ? "text-3xl font-bold text-center" : "text-3xl font-bold text-center"}`}
                  style={{color: 'rgba(63, 93, 153, 1)'}}>Beneficios que puedes obtener con tu tarjeta...</h3>
              <h2 className="font-bold text-center mt-4" style={{color: 'rgba(74, 74, 74, 1)'}}>Estos beneficios aplican solo para la tarjeta Green y Black</h2>
              <ul className="list-image-[url('https://res.cloudinary.com/dpjk1eyh0/image/upload/w_18,h_18/v1694395145/tilde2_cb0a7r.png')] text-xl ps-8 self-start	" style={{color:'rgb(95, 102, 126)'}}>
                  <li className="mt-4">Consulta médica en linea 24/7</li>
                  <li className="mt-1">Atención médica domiciliaria</li>
                  <li className="mt-1">Cobertura para gastos médicos</li>
                  <li className="mt-1">Cobertura para servicios funerarios</li>
                  <li className="mt-1">Ambulancias para emergencias</li>
                  <li className="mt-1">Descuentos en consultas y proveedores</li>
              </ul>
          </div>
        </div>

        <div className="w-full pt-12 flex flex-col items-center">

          <h2 className="text-5xl font-bold mb-8 text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Elige tu tarjeta de descuento</h2>
          <p className="text-xl text-center mb-8" style={{color: 'rgba(74, 74, 74, 1)'}}>¡ <strong>Próximamente</strong> podrás adquirirla a partir del <strong>18 de marzo del 2023!</strong></p>

          <div className = {`${(screenType == 'SmartPhone') ? 'flex flex-col items-center mx-4' : 'flex items-center justify-around flex-wrap px-8'}`}>

            <CardOptions
              image = 'https://d1yei2z3i6k35z.cloudfront.net/4358935/649dcfed1d379_TarjetadeDescuentoMerkSalud.png'
              cardName = 'Tarjeta Green'
              benefits = { ['Descuentos en servicios médicos, estudios de laboratorio, clínicas, farmacias y más.'] }
              precio = { 10 }
              href='/payments/green'/>

            <CardOptions
              image = 'https://d1yei2z3i6k35z.cloudfront.net/4358935/649dd00f3d3d5_TarjetadeDescuentoMerkSalud1.png'
              cardName = 'Tarjeta Blue'
              benefits = { ['Descuentos en servicios médicos, estudios de laboratorio, clínicas, farmacias y más.', 'Telemedicina.', 'Gastos por muerte accidental por $3.000.', 'Gastos médicos por accidente por $900.', 'Gastos funerarios por accidente o muerte natural hasta los 75 años por $1500.'] }
              precio = { 60 }
              href='/payments/blue'/>

            <CardOptions
              image = 'https://d1yei2z3i6k35z.cloudfront.net/4358935/649dd03c2f161_TarjetadeDescuentoMerkSalud2.png'
              cardName = 'Tarjeta Black'
              benefits = { ['Descuentos en servicios médicos, estudios de laboratorio, clínicas, farmacias y más.', 'Telemedicina.', 'Gastos por muerte accidental por $4.000.', 'Gastos médicos por accidente por $1200.', 'Gastos funerarios por accidente o muerte natural hasta los 75 años por $2000.' ] }
              precio = { 70 }
              href='/payments/black'/>

          </div>

        </div>

        <div 
          className="flex flex-col items-center px-8 py-16"
          style={{backgroundColor: 'rgba(155, 155, 155, 0.29)'}}>
          <h2 className="text-3xl font-bold" style={{color: 'rgb(63, 93, 153, 1)'}}>¡Merksalud es tu mejor opción!</h2>
          <p className="text-center mt-4" style={{color: 'rgba(63, 93, 153, 1)'}}>Adquiere la tarjeta de descuento que le ofrece a sus afiliados beneficios como descuentos en los gastos médicos en todas las especialidades, sin importar el lugar ni la hora. Esto significa que todos podemos tener el mejor cuidado de salud desde nuestra propia casa.</p>
        </div>
      </section>
    )
  }