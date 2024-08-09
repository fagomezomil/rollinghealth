// import { useState } from 'react'
// import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';


const NavBar = () => {
    // const [close, setClose] = useState(true);
    // const handleClose = () => setClose(!close);

    return (
        <div className='flex justify-items-center items-center relative'>
            <div className='hidden xl:block lg:mr-2 xl:mr-8'>
                <button className='navbar-button'>Nosotros</button>
                <button className='navbar-button'>Centros de Salud</button>
                <button className='navbar-button'>Staff Médico</button>
                <button className='navbar-button'>Turnos Online</button>
            </div>
        </div>
    );
};

export default NavBar;