import { useState } from "react";
import { FaUser } from "react-icons/fa";

const UserBadge = () => {
    const [user, setUser] = useState(false);

    return (
        <div className="flex items-center relative">

            <button onClick={() => setUser(!user)} className="user-badge">
                <p className="text-[20px]">
                    <FaUser />
                </p>
            </button>
            {user ?
                <div className="user-menu">
                    <button className="user-menu-button">Iniciar Sesión</button>
                    <hr className="my-2" />
                    <button className="flex items-center justify-center user-menu-button ">
                        <img src="./images/google.png" alt="" className="h-10 p-2" />
                        <p className="">Continuar con Google</p>
                    </button>
                    <hr className="mt-2 mb-4 " />
                    <p className="text-neutral-700 italic">Iniciar con E-mail</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Ingrese su correo electrónico"
                        id="" maxLength={50}
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]" />
                    <hr className="mb-2 mt-2" />
                    <button className="user-menu-button">Registrarse</button>
                    <button className="user-menu-button mt-2">Preguntas Frecuentes</button>
                </div>
                : ""}
        </div>
    )
}

export default UserBadge;