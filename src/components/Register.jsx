
export default function Register() {
    return (
        <div className='mt-20 grid grid-cols-12'>
            <div className='col-span-5 bg-[url(/images/register/register.webp)] bg-cover bg-no-repeat w-full h-[650px]'>
            </div>
            <div className="col-span-5 p-10 ">
            <p className="text-[50px] text-[#126459] font-bold leading-[55px] mb-6">Registrese y sientase cuidado por Rolling Health</p>
            <form className="flex flex-col">
                <p className="text-neutral-700 text-left italic">Nombre y apellido</p>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ingrese su Nombre y Apellido completo" 
                    className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                />
                <p className="text-neutral-700 text-left italic">Correo electrónico</p>
                <input
                    type="email"
                    name="email"
                    placeholder="Ingrese su Correo Electrónico"
                    maxLength={30}
                    className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                />
                <p className="text-neutral-700 text-left italic">Ingresar Contraseña</p>
                <input
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    maxLength={16}
                    minLength={8}
                    className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                />
                <p className="text-neutral-700 text-left italic">Repetir Contraseña</p>
                <input
                    type="password"
                    name="password"
                    placeholder="Repita su contraseña"
                    maxLength={16}
                    minLength={8}
                    className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                />
                <button className="rounded-lg bg-[#126459] text-white text-sm py-2 px-4 mb-4">Ingresar</button>
            </form>
            </div>

        </div>
    )
}
