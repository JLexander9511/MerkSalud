"use client";

import Image from "next/image";
import { useState } from "react";

function Accordion({title, text}) {

    const [active, setActive] = useState(false)

    return (
        <div className="rounded-lg px-6 py-4 bg-slate-100 mt-4" onClick={() => setActive(!active)} style={{cursor:'pointer'}}>
            <div className="flex justify-between">
                <span className='text-xl font-medium' style={{color: 'rgb(74, 74, 74)', width:'90%'}}>{ title }</span>
                <figure className="grid place-content-center" style={{transform: (active) ? 'rotate(180deg)' : 'rotate(0deg)', width: '10%'}}>
                    <Image
                        src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694552102/f1_zhqzs1.png'
                        width={25}
                        height={25}
                        alt='Icon'
                    />
                </figure>
            </div>
            
            <div>
                { active && <p className="text-center text-lg mt-2" style={{color: 'rgb(95, 102, 126)'}}>{text}</p>}
            </div>
 
        </div>
    )
}

export default Accordion;