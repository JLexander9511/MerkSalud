import { Source_Sans_3 } from 'next/font/google'
import './adminStyles.css'
import NavBar from './components/NavBar'
import AsideMenu from './components/AsideMenu'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import WithState from '@/app/validators/WithState'

export const metadata = {
    title: 'Panel de control - Administrador Merksalud',
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

  const queryClient = new QueryClient()

    return (
        <html lang="en">
            <body className={sSans.className}>
              <NavBar/>
              <AsideMenu/>
                <section className='flex flex-col items-stretch' style={{paddingLeft: 230, paddingTop: 65, paddingRight: 5, paddingBottom: 5, height: '100vh'}}>
                  <WithState loader={null}>
                    {children}      
                  </WithState>    
                </section>
            </body>
        </html>
      )
  }
