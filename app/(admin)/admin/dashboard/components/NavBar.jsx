"use client";

import UserMenu from './UserMenu';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
import WithState from "@/app/validators/WithState";

function NavBar() {

  // const router = useRouter()
  // const { status } = useSelector( (state) => state.auth)

  // useEffect(() => {
    
  //   (status != 'authenticated') && router.replace('/admin')

  // }, [status])

  return (
    <nav 
      className="bg-black p-4 flex items-center justify-end fixed w-screen"
      style={{height:60, backgroundColor:'rgb(65,93,153)'}}>
      <WithState>
        <UserMenu/>
      </WithState>  
    </nav>
  )
}

export default NavBar