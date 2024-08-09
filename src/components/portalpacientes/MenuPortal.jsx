
import { FaWhatsapp } from 'react-icons/fa';
import { IoCalendarNumber, IoSearchSharp } from 'react-icons/io5';
import { FaRegTrashAlt } from "react-icons/fa";

export default function MenuPortal({ setPortal, portal }) {
    return (
        <div>
            <p className="text-[50px] text-[#126459] font-base leading-[55px]">Disfrutá todos los servicios del </p>
            <p className="text-[50px] text-[#126459] font-bold mb-6">
                Portal Paciente
            </p>
            <hr className="my-8 " />
            <div className='flex items-center'>
                <p className='rounded-full w-10 h-10 text-center pt-1 font-bold text-white bg-[#126459] text-2xl'>2</p>
                <p className='ml-4 mr-10 text-xl font-bold text-neutral-500'>Turnos pendientes</p>
                <button className="rounded-lg bg-[#126459] text-white text-medium py-2 px-4">Ver detalles</button>
            </div>
            <hr className="my-8 " />
            <div className='w-full'>
                <table className='table-auto min-w-full'>
                    <thead className='text-left'>
                        <tr className=''>
                            <th className='mr-10'>N°</th>
                            <th>Día</th>
                            <th>Horario</th>
                            <th>Médico tratante</th>
                            <th>Especialidad</th>
                            <th>Dirección de atención</th>
                            <th><FaRegTrashAlt className='' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='mr-10'>1</td>
                            <td>Lunes</td>
                            <td>09:00 - 10:00</td>
                            <td>Dr. Juan Perez</td>
                            <td>Cardiólogo</td>
                            <td>Calle 123 # 1-2</td>
                            <td><FaRegTrashAlt className='' /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className="my-2 " />
            <button onClick={() => setPortal("TurnosPortal")} className='boton-menu-portal'>
                <IoCalendarNumber className='text-7xl mr-6' />
                <div className='text-left'>
                    <p className='text-4xl font-semibold '>Gestión de Turnos</p>
                    <p>Aqui podes gestionar tus turnos de manera inmediata y concretar una cita con el especialista indicado</p>
                </div>
            </button>
            <button className='boton-menu-portal mt-6'>
                <IoSearchSharp className='text-7xl mr-6' />
                <div className='text-left'>
                    <p className='text-4xl font-semibold '>Buscar especialista</p>
                    <p>Encuentre al médico correcto para resolver sus consultas con la mejor atención </p>
                </div>
            </button>
            <button className='boton-menu-portal mt-6'>
                <FaWhatsapp className='text-7xl mr-6 ' />
                <div className='text-left'>
                    <p className='text-4xl font-semibold '>Atención Telefónica</p>
                    <p>Donde puedes realizar una llamada telefônica con el especialista indicado</p>
                </div>
            </button>
        </div>
    )
}
