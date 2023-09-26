import { startLogout } from '@/store/auth';
import { Menu, MenuItem, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

function UserMenu() {

    const {displayName, role} = useSelector( (state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()

    const rol = (role == 'admin') ? 'Administrador ' : 'NO VALIDO'

    const logout = () => {
        dispatch( startLogout() )
        setTimeout(() => {
            router.push('/admin')
        }, 1000);
    }

  return (
    <Menu menuButton={
    <button type="button">
        <Image
            src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1695046927/icon_jq3egz.png'
            height={40}
            width={40}
            alt='userIcon'/>
    </button>
    } >
        <div className='flex flex-col items-center'>
            <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1695694195/gears_dcriat.png'
                height={40}
                width={40}
                alt='userIcon'
                className='my-2'/>
            <span> { displayName } </span>
            <span> { rol } </span>
        </div>
        <MenuDivider />
        <MenuItem onClick={ logout }>Cerrar sesión</MenuItem>
    </Menu>
  )
}

export default UserMenu