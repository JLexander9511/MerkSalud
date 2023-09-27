'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Un componente personalizado que recibe el href y el children como props
export function NavLink({ href, children }) {

    const pathname = usePathname()
    const isActive = pathname === href
    const className = isActive ? 'border-r-4 border-blue-900 my-2 p-2 block rounded-md hover:bg-slate-300 outline-none' : 'my-2 p-2 block rounded-md hover:bg-slate-300'

    return (
    <Link href={href} className={className}>
        {children}
    </Link>
)
}
