"use client";

import { useScreenSize } from "@/hooks";
import Image from "next/image"
import Link from "next/link";

function CardOptions({ image, cardName, benefits, precio, href }) {

  const { screenType } = useScreenSize();

  return (
  <div 
      className = {`${(screenType == 'SmartPhone') ? 'flex flex-col items-center mb-12' : 'flex flex-col items-center mb-12 w-4/12'}`}
      style={{height: '550px'}}>
        <figure>
        <Image
            src={ image }
            width={250}
            height={26}
            alt="Discount Card MerkSalud"
            //className={`${(screenType == 'SmartPhone' ? "hidden" : '')}`}
        />
        </figure>
        <h2 className="text-xl text-center font-bold mt-4" style={{color: 'rgb(95, 102, 126)'}}>{ cardName }</h2>
        <div className="flex flex-col justify-between items-center h-full -mt-4">

          <ul className="list-image-[url('https://res.cloudinary.com/dpjk1eyh0/image/upload/w_15,h_15/v1694193582/tilde_qmwhgz.png')] ps-12 mt-8" style={{color:'rgba(74, 74, 74, 1)', fontSize: 16}}>
            { benefits.map( (el, index) => <li key={index}>{ el }</li>)}
          </ul>

          <div className="flex flex-col items-center">
            <span className="text-xl font-bold" style={{color: 'rgb(95, 102, 126)'}}>{`Precio $${precio}`}</span>
            <Link className="bg-sky-600 px-20 py-4 text-white rounded-lg border-b-4 border-sky-900 mt-4" href={href}>
            Comprar
            </Link>
          </div>

        </div>
        
        
  </div>
  )
}

export default CardOptions
