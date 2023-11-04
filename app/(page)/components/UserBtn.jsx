import { useScreenSize } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

function UserBtn() {

    const {errorMessage, status} = useSelector((state) => state.auth)
    const {screenType} = useScreenSize();

    const signInBtn = (<Link
        href='/login'
        className = {`${(screenType == 'Desktop' ? 'p-2 rounded-full bg-blue-900 text-white flex items-center text-lg font-medium me-2' : 'p-2 rounded-full bg-transparent text-white flex items-center text-lg font-medium border-2 me-2' )}`}>
          <Image
          src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1695050220/sign-in_sncxyd.png'
            width={25}
            height={25}
            alt='user icon'
            className='mx-2'/>
          Iniciar Sesion
      </Link>)

    const panelBtn = (<Link 
        href='/' 
        className = {`${(screenType == 'Desktop' ? 'p-2 rounded-full bg-blue-900 text-white flex items-center text-lg font-medium' : 'p-2 rounded-full bg-transparent text-white flex items-center text-lg font-medium border-2' )}`}>
          <Image
          src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1695046927/icon_jq3egz.png'
            width={30}
            height={30}
            alt='user icon'
            className='me-2'/>
          Panel de control
          </Link>)

  return (status == 'not-authenticated') ? signInBtn : panelBtn
  
}

export default UserBtn