import { BsPencilSquare } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa6'
import useUsuarioStore from '../../zustand/usuario-zustand';

export default function SideDashboard() {
    const { dataUsuario } = useUsuarioStore();
    const role = dataUsuario?.role || "";
    return (
        <div className='col-span-12 md:col-span-4  bg-neutral-100 p-4 md:p-12'>
            <div className='flex justify-between'>
                <h1 className='italic text-4xl text-[#126459]'>
                    {dataUsuario && role === 'Doctor' ? 'Portal Médico' : dataUsuario && role === 'Administrador' && 'Portal Administrador'}</h1>
                <button className='text-4xl text-[#126459]'><BsPencilSquare /></button>
            </div>
            <div className='mt-6 flex justify-between'>
                <div className='flex flex-col justify-center mr-12'>
                    <p className='text-2xl font-bold text-neutral-600'>
                        {dataUsuario && dataUsuario.name}
                    </p>
                </div>
                <div className='mt-6 flex flex-col items-center justify-center text-center'>
                    <p className="rounded-full w-fit p-6 mb-2 bg-neutral-400 text-2xl">
                        <FaUser className=' text-white' />
                    </p>
                    <p className='text-sm'>Subir foto</p>
                </div>
            </div>
            <div>
                <p className='text-base italic text-neutral-600 mt-4'>
                    Correo Electrónico
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {dataUsuario && dataUsuario.email}
                </p>
                <hr className="my-4" />
                <p className='text-xl font-medium uppercase text-neutral-500'>Servicios</p>
                <hr className="my-4" />
                <div className='navbar-button' >{role === 'Doctor' ? "Agenda" : "Edición usuarios"}</div>
            </div>
        </div>
    )
}
