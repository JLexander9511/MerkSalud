import { Montserrat, Source_Sans_3 } from 'next/font/google'
import './adminStyles.css'
import WithState from '../validators/WithState'


export const metadata = {
    title: 'Administrador Merksalud',
    description: 'Asistencia Médica Online y muchos beneficios más: Médicos Especialistas, Servicio Dental y Oftalmológico, Proveedores de Servicios de Salud, Seguros de Salud y Vida, Seguros Funerarios',
  }
  
const sSans = Source_Sans_3({
    weight: ['200','300', '400','500', '600','700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
  })

export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body className={sSans.className}>           
                  {children}          
            </body>
        </html>
      )
  }
