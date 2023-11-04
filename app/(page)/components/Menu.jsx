"use client";

import { useScreenSize } from '@/hooks';
import { Divide as Hamburger } from 'hamburger-react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'
import { NavLink } from './NavLink';

import WithState from '@/app/validators/WithState';
import UserBtn from './UserBtn';
import { BallBeat } from 'react-pure-loaders';

function Menu() {
  

  const {screenType} = useScreenSize();

  const [isOpen, setOpen] = useState(false)

  if (screenType == 'Desktop') {
    return (
      <div className='flex text-lg items-center' style={{color: 'rgb(74, 74, 74)'}}>
        
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="/about">Conócenos</NavLink>
        <NavLink href="/cards">Tarjetas</NavLink>
        <NavLink href="/questions">Preguntas</NavLink>
        <NavLink href="/contact">Contacto</NavLink>

      {/* <WithState loader={<BallBeat color={'#123abc'} loading={true}/>}>
          <UserBtn/>
      </WithState> */}
        
      </div>
    )
  }

  if(screenType == 'SmartPhone' || screenType == 'Tab'){
    return (
      <>
        <div>
          <div className="menuBtn" style={{zIndex:15, position:'relative'}}>
            <Hamburger toggled={isOpen} toggle={setOpen} rounded color={`${(isOpen) ? '#fff' : '#000'}`} hideOutline={false}/>
          </div>
          <div className={`menuMobile ${(isOpen) ? 'menuActive' : ''} flex flex-col justify-center items-center text-white text-4xl font-semibold	`}>
            <Link className='my-2' href="/" onClick={() => setOpen(!isOpen)}>Inicio</Link>
            <Link className='my-2' href="/about" onClick={() => setOpen(!isOpen)}>Conócenos</Link>
            <Link className='my-2' href="/cards" onClick={() => setOpen(!isOpen)}>Tarjetas</Link>
            <Link className='my-2' href="/questions" onClick={() => setOpen(!isOpen)}>Preguntas</Link>
            <Link className='my-2' href="/contact" onClick={() => setOpen(!isOpen)}>Contacto</Link>

            {/* {
              notAuthenticatedBtn || AuthenticatedBtn
            } */}
            
            <div className="socialMenuLinksContainer flex place-content-evenly mt-32 w-2/3 ">
              <Link href="https://www.instagram.com/merksalud/" onClick={() => setOpen(!isOpen)}>
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1686964851/whiteIgIcon_tb6bly.png"
                  width={40}
                  height={40}
                  alt="Instagram Link"
                />
              </Link>
  
              <Link href="/" onClick={() => setOpen(!isOpen)} >
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1686964938/whiteFbIcon_o2z0ry.png"
                  width={21}
                  height={21}
                  alt="Facebook Link"
                />
              </Link>
  
              <Link href="/" onClick={() => setOpen(!isOpen)} >
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1693875228/tk_uewevo.png"
                  width={35}
                  height={35}
                  alt="TikTok Link"
                />
              </Link>
  
              <Link href="/" onClick={() => setOpen(!isOpen)} >
                <Image
                  src="https://res.cloudinary.com/dpjk1eyh0/image/upload/w_auto/f_auto,q_auto/v1693875403/yt_y900ai.png"
                  width={55}
                  height={50}
                  alt="Youtube Link"
                />
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  
}

export default Menu
