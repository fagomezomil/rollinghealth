// import { useState } from 'react'
// import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';
import useUsuarioStore from '../zustand/usuario-zustand';


import { Link } from "react-router-dom";


const NavBar = () => {
    // const [close, setClose] = useState(true);
    // const handleClose = () => setClose(!close);
    const {dataUsuario} = useUsuarioStore((state) => ({
        dataUsuario: state.dataUsuario  
    }));

    const role = dataUsuario?.role || "";

    return (
        <div className='flex justify-items-center items-center relative'>
            <div className='hidden xl:block lg:mr-2 xl:mr-8'>
                <Link to="/nosotros" className='navbar-button' >Nosotros</Link>
                <Link to="/centros" className='navbar-button'>Centros de Salud</Link>
                <Link to="/staff" className='navbar-button'>Staff Médico</Link>                
                <Link to={role ? (()=>{
                            switch(role) {
                                case "Paciente":
                                    return "/paciente";
                                case "Administrador":
                                case "Doctor":
                                    return "/dashboard";
                                default:
                                    return "/login";}
                            })()
                            : "/login"
                        }
                    className='navbar-button'>Turnos Online</Link>
            </div>
        </div>
    );
};

export default NavBar;