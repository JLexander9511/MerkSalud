import './pageStyles.css'
import { Montserrat } from 'next/font/google'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Merksalud',
  description: 'Asistencia Médica Online y muchos beneficios más: Médicos Especialistas, Servicio Dental y Oftalmológico, Proveedores de Servicios de Salud, Seguros de Salud y Vida, Seguros Funerarios',
}

const montserrat = Montserrat({
  weight: ['100', '200','300', '400','500', '600','700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <body className={montserrat.className}>
            <header className='flex justify-center'>
              <Navbar />
            </header>
            {children}
            <Footer />
          </body>
        </html>
  )
}
