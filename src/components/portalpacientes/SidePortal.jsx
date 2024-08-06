import { FaUser } from 'react-icons/fa6'
import { BsPencilSquare } from "react-icons/bs";
import { ImStatsBars2 } from "react-icons/im";
import { FaPlusCircle } from 'react-icons/fa';

export default function SidePortal({setPortal}) {
  return (
    <div className='col-span-4 bg-neutral-100 bg-cover bg-no-repeat w-full p-12'>
                <div className='flex justify-between'>
                    <h1 className='italic text-4xl text-[#126459]'>Perfil de paciente</h1>
                    <button className='text-4xl text-[#126459]'><BsPencilSquare /></button>
                </div>
                <div className='mt-6 flex justify-between'>
                    <div className='flex flex-col justify-center mr-12'>
                        <p className='text-2xl font-bold text-neutral-600'>
                            Nombre y Apellido Paciente
                        </p>
                    </div>
                    <div className='mt-6'>
                        <p className="rounded-full w-fit p-10 mb-2 bg-neutral-400 text-2xl">
                            <FaUser className=' text-white' />
                        </p>
                        <p className='text-sm'>Subir foto de perfil</p>
                    </div>
                </div>
                <form>
                    <p className='text-xl font-medium uppercase text-neutral-500'>Datos del paciente</p>
                    <hr className="mb-2 mt-2" />
                    <p className='text-base italic text-neutral-600 mt-4'>
                        Correo Electrônico
                    </p>
                    <p className='text-xl text-neutral-600 mb-4'>
                        Correo Electrônico del paciente
                    </p>
                    <hr className="mb-2 mt-2" />
                    <p className='text-base italic text-neutral-600 mt-4'>
                        Domicilio
                    </p>
                    <p className='text-xl text-neutral-600 mb-4'>
                        Domicilio del paciente y Provincia
                    </p>
                    <hr className="mb-2 mt-2" />
                    <p className='text-base italic text-neutral-600 mt-4'>
                        Telefono de contacto
                    </p>
                    <p className='text-xl text-neutral-600 mb-4'>
                        Numero de telefono del paciente
                    </p>
                    <hr className="mb-2 mt-2" />
                </form>
                <div className='mt-6'>
                    <p className='text-xl font-medium uppercase text-neutral-500'>Gestor de Turnos</p>
                    <hr className="mb-2 mt-2" />
                    <div className='flex items-start justify-between mt-4'>
                        <div className='flex items-center'>
                            <p className='rounded-full w-10 h-10 text-center pt-1 font-bold text-white bg-[#126459] text-2xl'>0</p>
                            <p className='ml-3 text-xl font-bold text-neutral-500'>Turnos pendientes</p>
                        </div>
                        <button  onClick={() => setPortal("TurnosPortal")}  className="rounded-lg flex justify-center items-center bg-[#126459] text-white text-medium py-2 px-4 mb-4"><FaPlusCircle className='mr-2' />Nuevo Turno</button>
                    </div>
                </div>
                <hr className="mb-2 mt-2" />
                <div className='mt-6'>
                    <div className='flex items-baseline justify-between mt-4'>
                        <p className='text-xl font-medium uppercase text-neutral-500'>Estadísticas del paciente</p>
                        <button className="rounded-lg flex justify-center items-center bg-[#126459] text-white text-medium py-2 px-4 mb-4"><ImStatsBars2 className='mr-2' />Ver Estadísticas</button>
                    </div>
                </div>
            </div>
  )
}
