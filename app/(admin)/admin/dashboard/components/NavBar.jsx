"use client";

import UserMenu from './UserMenu';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

function NavBar() {

  const router = useRouter()
  const { status } = useSelector( (state) => state.auth)

  useEffect(() => {
    
    (status != 'authenticated') && router.replace('/admin')

  }, [status])

  return (
    <nav className="bg-black p-4 flex items-center justify-end">
        <UserMenu/>
    </nav>
  )
}

export default NavBar