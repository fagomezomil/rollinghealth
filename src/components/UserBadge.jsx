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
                    <button className="text-neutral-500 hover:bg-[#c4e9e4] hover:rounded-xl hover:text-neutral-700 py-1 font-medium text-lg">Iniciar Sesión</button>
                    <hr className="my-2" />
                    <button className="flex items-center justify-center hover:bg-white hover:rounded-xl ">
                        <img src="./images/google.png" alt="" className="h-10 p-2" />
                        <p className="text-neutral-500  py-1 font-medium text-lg hover:text-neutral-700">Continuar con Google</p>
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
                    <button className="text-neutral-500 hover:bg-white hover:rounded-xl hover:text-neutral-700 py-1 font-medium text-lg">Registrarse</button>
                    <button className="text-neutral-500 hover:bg-white hover:rounded-xl hover:text-neutral-700 py-1 font-medium text-lg">Preguntas Frecuentes</button>
                </div>
                : ""}
        </div>
    )
}

export default UserBadge;