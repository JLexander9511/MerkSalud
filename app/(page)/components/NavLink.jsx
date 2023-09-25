'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Un componente personalizado que recibe el href y el children como props
export function NavLink({ href, children }) {

    const pathname = usePathname()
    const isActive = pathname === href
    const className = isActive ? 'border-b-2 border-blue-900 text-blue-700 mx-5' : 'mx-5'

    return (
    <Link href={href} className={className}>
        {children}
    </Link>
)
}
