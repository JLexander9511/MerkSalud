import Image from "next/image"
import { Menu, MenuItem, MenuDivider } from '@szhsin/react-menu';
import { NavLink } from "./NavLink";

function AsideMenu() {
  return (
    <aside 
        className="bg-slate-100 text-black fixed w-2/12 h-screen flex flex-col items-center"
        style={{width:225}}>
        <Image
            src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694824934/ms-logo_torgzu.png'
            height={100}
            width={200}
            alt='Merksalud Logo'
            className="mt-6"/>
        
        <nav className="mt-8 pt-4 border-t border-slate-300 w-11/12">
            <NavLink href="/admin/dashboard">Vision General</NavLink>
            <NavLink href="/admin/dashboard/users">Usuarios</NavLink>
            <NavLink href="/admin/dashboard/partners">Aliados</NavLink>
            <NavLink href="/admin/dashboard/payments">Pagos</NavLink>
            <NavLink href="/admin/dashboard/metrics">Metricas</NavLink>
        </nav>
        
    </aside>
  )
}

export default AsideMenu