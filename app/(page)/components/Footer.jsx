"use client";

import Image from "next/image"
import { useScreenSize } from '@/hooks';
import Link from "next/link";

const date = new Date();

function Footer() {

    const {screenType} = useScreenSize();

    return (
    <section
        style={{backgroundColor: 'rgb(28, 69, 164)'}}
        className="py-8 flex items-center justify-evenly">
            <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694218487/logo2_xbakki.gif'
                width={(screenType == 'SmartPhone' ? 100 : 150)}
                height={100}
                alt='logo merksalud'
                className="inline"
                // className={`${(screenType == 'SmartPhone') ? 'hidden' : null}`}
                // style={{marginTop: (screenType == 'Tab') ? '5rem' : null}}
            />
            <div className={`${(screenType == 'SmartPhone' ? "flex w-6/12 justify-evenly" : "flex w-3/12 justify-evenly")}`}>
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
            <span className={`${(screenType == 'SmartPhone' ? "hidden" : "text-white text-xl")}`}>{`© ${ date.getFullYear() } Merksalud`}</span>
        </section>
  )
}

export default Footer