import { FaPlusCircle, FaUser } from 'react-icons/fa'
import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom'

export default function NavLg({ open, setOpen, emailOk, setEmailOk, passwordOk, setPasswordOk, role }) {
    return (
        <>
            <div onClick={() => setOpen(!open)} className="text-lg italic flex justify-center items-center mr-6">
                {role === "" &&
                    <>
                        <p className="mr-2">Ingresar</p>
                        <FaUser />
                    </>
                }
                {role === "paciente" ?
                    <button onClick={() => setOpen(!open)} className='flex justify-center items-center text-[20px]'>
                        <>
                            <p className="mr-2">
                                Menú
                            </p>
                            {!open ?
                                <RiMenu3Line />
                                :
                                <RiCloseFill />
                            }
                        </>
                    </button>
                    :
                    ""
                }
            </div>
            {open && (
                <div className="flex bg-white shadow-lg p-6 w-screen lg:w-[400px] rounded-lg absolute right-0 lg:right-6 top-12 md:top-14 flex-col">
                    {role === "" ?
                        <>
                            <Link to="/nosotros" className='navbar-button block xl:hidden'>Nosotros</Link>
                            <Link to="/centros" className='navbar-button block xl:hidden'>Centros de Salud</Link>
                            <Link to="/staff" className='navbar-button block xl:hidden'>Staff Médico</Link>
                            <Link to="/login" className='navbar-button block xl:hidden'>Turnos Online</Link>
                            <Link to="/login" className="text-neutral-500 user-menu-button py-2 mb-1 font-medium text-lg">Iniciar Sesión</Link>
                            <p className="text-neutral-700 text-left italic">Inicie con Usuario o E-mail</p>
                            <input
                                type="email"
                                name="email"
                                onInput={() => setEmailOk(true)}
                                placeholder="Ingrese su correo electrónico"
                                maxLength={35}
                                className="input-menu"
                            />
                            {
                                emailOk === true ?
                                    <>
                                        <p className="text-neutral-700 text-left italic">Ingresar Contraseña</p>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Ingrese su contraseña"
                                            onInput={() => setPasswordOk(true)}
                                            maxLength={16}
                                            minLength={8}
                                            className="input-menu"
                                        />
                                    </> : ""
                            }
                            {
                                passwordOk === true ?
                                    <button className="rounded-lg bg-[#126459] text-white text-sm py-2 px-4 mb-4">Ingresar</button> : ""
                            }
                            <hr className="mb-2 mt-2" />
                            <button className="flex items-center justify-center user-menu-button ">
                                <img src="./images/google.png" alt="" className="h-10 p-2" />
                                <p className="">Continuar con Google</p>
                            </button>
                            <hr className="mt-2 mb-4 " />
                            <Link to="/register" className="user-menu-button">Registrarse</Link>
                            <hr className="my-2" />
                        </>
                        :
                        <>

                            <Link to="/nosotros" className='navbar-button block xl:hidden'>Nosotros</Link>
                            <Link to="/centros" className='navbar-button block xl:hidden'>Centros de Salud</Link>
                            <Link to="/staff" className='navbar-button block xl:hidden'>Staff Médico</Link>
                            <Link to="/login" className='navbar-button block xl:hidden'>Turnos Online</Link>

                            <div className='flex items-center justify-between text-neutral-500 mt-4 xl:mt-0'>
                                <div className='text-left'>
                                    <p className='font-bold text-lg'>Nombre del Paciente</p>
                                    <p className='italic'>Dirección de email</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='flex flex-col rounded-full w-fit p-4 mb-2 bg-neutral-400 text-white text-xl'>
                                        <FaUser />
                                    </div>
                                    <p className='text-sm'>Editar perfil</p>
                                </div>
                            </div>
                            <hr className="my-4 border-neutral-300" />
                            <div className='flex items-center justify-between'>
                                <div className='flex'>
                                    <p className='rounded-full w-8 h-8 text-center font-bold text-white bg-[#126459] text-xl'>0</p>
                                    <p className='ml-1 text-lg font-bold text-neutral-500'>Turnos pendientes</p>
                                </div>
                                <button className="rounded-lg flex justify-center items-center bg-[#126459] text-white text-medium py-1 px-2 "><FaPlusCircle className='mr-2' />Nuevo Turno</button>
                            </div>
                            <hr className="my-4 border-neutral-300" />
                            <Link className="user-menu-button mt-2">Cerrar sesión</Link>
                        </>
                    }
                    <Link className="user-menu-button mt-2">Preguntas Frecuentes</Link>
                </div>
            )}
        </>
    )
}

