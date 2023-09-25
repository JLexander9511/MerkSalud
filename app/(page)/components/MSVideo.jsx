"use client";

import { useScreenSize } from "@/hooks";

function MSVideo() {

  const {screenType} = useScreenSize();

  return (
    <section 
      className="flex flex-col items-center"
      >
        <div style={{backgroundColor:'rgb(63, 93, 153)'}} className={`${(screenType == 'SmartPhone') ? 'text-center text-white py-10' : 'text-center text-white py-14 flex flex-col items-center'}`} >
            <h3 className="text-xl font-bold">Ahorra con nosotros...</h3>
            <h2 className={`${(screenType == 'SmartPhone' ? 'text-4xl font-bold mt-6' : 'text-5xl font-bold mt-6 w-10/12 text-center')}`}>Tarjetas de descuentos en servicios de salud y mucho más</h2>
            <h3 className="text-xl font-bold mt-6">Te invitamos a ver el siguiente video</h3>
        </div>



        <video 
          src="https://d1yei2z3i6k35z.cloudfront.net/4358935/649ce53db1890_lv_0_20230216194137.mp4" 
          preload="auto" 
          controls
          poster="https://d1yei2z3i6k35z.cloudfront.net/4358935/649ce5c78c5b6_VideodeMerkSalud.png" 
          style={{width: (screenType == 'Desktop') ? '90%' : '100%', height:'100%'}}
          className={`${(screenType == 'Desktop') ? 'my-8' : null}`}></video>
          
    </section> 
  )
}

export default MSVideo;