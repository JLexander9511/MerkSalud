"use client";

import Image from 'next/image'
import { Fjalla_One } from 'next/font/google'
import PaymentForm from './components/PaymentForm'
import { useScreenSize } from '@/hooks';
import Link from 'next/link';
import BackButton from './components/BackButton';

const fJalla = Fjalla_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export default function Page( { params } ) {

  const { screenType } = useScreenSize();

  return (
    <section className='flex flex-col items-center justify-center w-full pt-20'>
      
        <figure className='mb-12'>
          <Image
              src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694218487/logo2_xbakki.gif'
              width={190}
              height={75}
              alt="MerkSalud Logo"
          />
        </figure>

        <div className={`${ ( screenType != 'Desktop' ) ? 'bg-white py-8 px-8 flex flex-col items-center rounded-xl w-11/12' : 'bg-white py-8 px-12 flex flex-col items-center rounded-xl w-6/12'}`}>
          <h1 className={fJalla.className} style={{color: 'rgba(8, 47, 65, 1)', fontWeight: 'bold', fontSize: 48, width: 330, textAlign: 'center'}}>¡Has tomado una gran decisión!</h1>
          <p className='mt-2 text-2xl font-bold w-10/12 text-center' style={{color: 'rgba(8, 47, 65, 1)'}}>Ahora reporta tu pago en el siguiente formulario.</p>
          <div className='text-center flex flex-col items-center'>
            <span className='font-bold text-xl mt-8' style={{color: 'rgba(74, 74, 74, 1)'}}>Datos de Pago Móvil</span>
            <span className='text-xl' style={{color: 'rgba(74, 74, 74, 1)'}}>Bancamiga J-40512054-1 04145840686</span>
            <span className='text-xl font-bold' style={{ color: 'rgba(9, 26, 157, 1)'}}>Tasa de cambio del día del BCV</span>
          </div>
          <PaymentForm/>
          <div className='w-full border-slate-400 my-8' style={{borderBottomWidth:1}}></div>

          <div className={`${( screenType == 'SmartPhone' ) ? 'flex flex-col items-center' : 'flex items-center justify-center px-8' }`}>
            <Image
                src='https://d1yei2z3i6k35z.cloudfront.net/4358935/649cd6ef6f8f1_Fondodepantallacieloazul2.png'
                width={150}
                height={75}
                alt="Ceo Image"
                className='me-4'
            />
            <div>
              <p className='mb-4 text-xl' style={{color:'rgb(108, 109, 109)'}}>"Bienvenido(a) a nuestra familia Merksalud, este puede ser el comienzo de algo grande en tu vida".</p>
              <span style={{color:'rgb(108, 109, 109)'}}> <strong>Juan Carlos Contreras</strong>, Ceo.</span>
            </div>
          </div>

        </div>

        <span className='text-white text-xl mt-16'>¡Conéctate para más información!</span>

        <div className={`${(screenType == 'SmartPhone' ? "flex w-6/12 justify-evenly mt-8" : "flex w-2/12 justify-evenly mt-8")}`}>
            <Link href="https://www.instagram.com/merksalud/">
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1686964851/whiteIgIcon_tb6bly.png"
                  width={30}
                  height={30}
                  alt="Instagram Link"
                />
              </Link>
  
              <Link href="/">
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1686964938/whiteFbIcon_o2z0ry.png"
                  width={16}
                  height={16}
                  alt="Facebook Link"
                />
              </Link>
  
              <Link href="https://www.tiktok.com/@merk.salud">
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1693875228/tk_uewevo.png"
                  width={26}
                  height={26}
                  alt="TikTok Link"
                />
              </Link>
  
              <Link href="/">
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1693875403/yt_y900ai.png"
                  width={44}
                  height={39}
                  alt="Youtube Link"
                />
              </Link>
            </div>
        
        <figure className='my-8'>
          <Image
              src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694218487/logo2_xbakki.gif'
              width={150}
              height={75}
              alt="MerkSalud Logo"
          />
        </figure>
          
        <BackButton/>
    </section>
  )
}
