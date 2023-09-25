import { Montserrat, Source_Sans_3 } from 'next/font/google'
import './payStyles.css'

export const metadata = {
    title: 'MerkPagos',
    description: 'Asistencia Médica Online y muchos beneficios más: Médicos Especialistas, Servicio Dental y Oftalmológico, Proveedores de Servicios de Salud, Seguros de Salud y Vida, Seguros Funerarios',
  }
  
const montserrat = Montserrat({
    weight: ['100', '200','300', '400','500', '600','700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
  })

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