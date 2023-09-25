"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';


function WeekPromotions() {
  return (
    <section>
      <div 
          className="pt-6 flex flex-col justify-items-center items-center"
          style={{backgroundColor: 'rgba(155, 155, 155, 0.24)'}}>
              <h2 className="text-3xl font-bold text-center" style={{color: 'rgba(63, 93, 153, 1)'}}>Promociones de la semana</h2>

              <Swiper 
                  slidesPerView={1}
                  navigation={true} 
                  modules={[Navigation, Autoplay]} 
                  className="mySwiper"
                  autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}>
                  <SwiperSlide>
                      <Link href='https://drive.google.com/file/d/18jMc9qYKTVJXa7S2NOKpkjsK7P80ugaI/view?usp=sharing' rel="noopener noreferrer" target="_blank">
                      <Image
                          src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694141882/qjs1r3ypwekmxqca2eoh.png'
                          width={3420}
                          height={1080}
                          alt='Banner-quieres ser un aliado merksalud'/>
                      </Link>
                  </SwiperSlide>
                  <SwiperSlide>
                      <Image
                          src='https://d1yei2z3i6k35z.cloudfront.net/4358935/649e137d8e5c0_4.png'
                          width={3420}
                          height={1080}
                          alt='Banner-referidos'/>
                  </SwiperSlide>
              </Swiper>
              
      </div>
    </section>
  )
}

export default WeekPromotions