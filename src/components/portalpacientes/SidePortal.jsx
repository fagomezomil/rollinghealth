import {useEffect} from 'react';
import { FaUser } from 'react-icons/fa6'
import { BsPencilSquare } from "react-icons/bs";
import { ImStatsBars2 } from "react-icons/im";
import { FaPlusCircle } from 'react-icons/fa';
import useUsuarioStore from '../../zustand/usuario-zustand';


export default function SidePortal({ setPortal , cantidadTurnos, paciente}) {
    
    const { dataUsuario, getDataUsuario } = useUsuarioStore((state) => ({
        dataUsuario: state.dataUsuario,       
        getDataUsuario: state.getDataUsuario       
    }));

    useEffect(() => {
        if (paciente) {
        getDataUsuario(dataUsuario._id);        
        }
    }, [paciente, getDataUsuario]); 
    
    const imageSrc = dataUsuario?.img;

    return (
        <div className='col-span-12 xl:col-span-4 bg-neutral-100 bg-cover bg-no-repeat w-full p-4 md:p-12'>
            <div className='flex justify-between'>
                <h1 className='italic text-4xl text-[#126459]'>Perfil de paciente</h1>
                <button className='text-4xl text-[#126459]'><BsPencilSquare /></button>
            </div>
            <div className='mt-6 flex justify-between'>
                <div className='flex flex-col justify-center mr-12'>
                    <p className='text-2xl font-bold text-neutral-600'>
                    {paciente ? paciente.name : 'Nombre y Apellido Paciente'}
                  </p>
                </div>
                <div className='mt-6 flex flex-col items-center justify-center text-center'>
                <div className="rounded-full w-fit mb-2 bg-neutral-400 text-2xl">
                        {imageSrc ? (
                            <img src={imageSrc} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
                        ) : (
                            <FaUser className='text-white' />
                        )}
                    </div>             
                </div>
            </div>
            <form>
                <p className='text-xl font-medium uppercase text-neutral-500'>Datos del paciente</p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Correo Electrónico
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                 {paciente ? paciente.email : 'Correo Electrónico del paciente'}
                </p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Domicilio
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {paciente ? paciente.address : 'Domicilio del paciente y Provincia'}
                </p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Telefono de contacto
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {paciente ? paciente.phone : 'Telefono del paciente'}
                </p>
                <hr className="my-2" />
            </form>
            <div className='mt-6'>
                <p className='text-xl font-medium uppercase text-neutral-500'>Gestor de Turnos</p>
                <hr className="mb-2 mt-2" />
                <div className='flex flex-col lg:flex-row items-start justify-between mt-4'>
                    <div className='flex items-center'>
                        <p className='rounded-full w-10 h-10 text-center pt-1 font-bold text-white bg-[#126459] text-2xl'>{cantidadTurnos}</p>
                        <p className='ml-3 text-xl font-bold text-neutral-500'>Turnos pendientes</p>
                    </div>
                    <button onClick={() => setPortal("TurnosPortal")} className="rounded-lg flex justify-center items-center bg-[#126459] text-white text-lg py-2 px-4 my-4 lg:mt-0"><FaPlusCircle className='mr-2' />Nuevo Turno</button>
                </div>
            </div>
            <hr className="my-2" />
            <div className='mt-6'>
                <div className='flex flex-col lg:flex-row items-baseline justify-between mt-4'>
                    <div className='flex items-center'>
                        <ImStatsBars2 className='mr-2' />
                        <p className='text-xl font-medium uppercase text-neutral-500'>Historial del paciente</p>
                    </div>
                    <button className="rounded-lg flex justify-center items-center bg-[#126459] text-white text-lg py-2 px-4 mt-4 lg:mt-0" onClick={() => setPortal("HistorialPortal")}>Ver Historial</button>
                </div>
            </div>
        </div>
    )
}
