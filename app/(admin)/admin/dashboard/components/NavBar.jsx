"use client";

import { BallBeat } from 'react-pure-loaders';
import UserMenu from './UserMenu';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
import WithState from "@/app/validators/WithState";
import AppStatusIndicator from './AppStatusIndicator';

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
      <WithState loader={<BallBeat color={'#123abc'} loading={true}/>}>
        <AppStatusIndicator/>
        <UserMenu/>
      </WithState>  
    </nav>
  )
}

export default NavBar