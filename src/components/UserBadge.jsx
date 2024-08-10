import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserBadge = () => {
    const [open, setOpen] = useState(false);
    const userRole = "";
    const [emailOk, setEmailOk] = useState(false)
    const [passwordOk, setPasswordOk] = useState(false)
    
  

    return (
        <div className="flex items-center relative">
            {userRole === "" ? (
                <>
                    <button onClick={() => setOpen(!open)} className="text-lg italic flex justify-center items-center mr-6">
                        <p className="mr-2">Ingresar</p>
                        <FaUser />
                    </button>
                    {open && (
                        <div className="user-menu">
                            <Link to="/login" className="text-neutral-500 user-menu-button py-2 mb-1 font-medium text-lg">Iniciar Sesión</Link>
                            <p className="text-neutral-700 text-left italic">Inicie con Usuario o E-mail</p>
                            <input
                                type="email"
                                name="email"
                                onInput={() => setEmailOk(true)}
                                placeholder="Ingrese su correo electrónico"
                                maxLength={35}
                                className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
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
                                            className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
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
                            <Link className="user-menu-button mt-2">Preguntas Frecuentes</Link>
                        </div>
                    )}
                </>

            ) : userRole === "paciente" ? (
                <div>
                    <button onClick={() => setOpen(!open)} className="user-badge">
                        <p className="text-[20px]">
                            <FaUser />
                        </p>
                    </button>
                    {open ? (
                        <div>open badge</div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default UserBadge; 