import { Toaster } from 'react-hot-toast'
import { IoCloseCircle } from 'react-icons/io5'
import useUsuarioStore from '../../zustand/usuario-zustand';

export default function MainDashboard() {
    const { dataUsuario } = useUsuarioStore();
    return (
        <div className='col-span-12 md:col-span-8 my-8 mx-8 overflow-scroll'>
            <p className="text-3xl md:text-[50px] text-[#126459] font-base leading-[55px]">Encuentre aquí sus</p>
            <p className="text-3xl md:text-[50px] text-[#126459] font-bold mb-6">
                Turnos Pendientes
            </p>
            <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>Turnos Hoy</p>
            <table className='table-auto md:min-w-full mb-6'>
                <thead className=' text-left bg-gray-100'>
                    <tr className='h-6 text-neutral-500'>
                        {dataUsuario.role === 'Doctor' &&
                            <>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Nombre del Paciente</th>
                            </>}
                        {dataUsuario.role === 'Administrador' &&
                            <>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Id</th>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Nombre de Usuario</th>
                                <th className='p-1 md:p-5 '>Email</th>
                                <th className='p-1 md:p-5 '>Rol</th>
                                <th className='p-1 md:p-5 '>Estado</th>
                                <th className='p-1 md:p-5 '>Editar</th>
                            </>}
                    </tr>
                </thead>
                <tbody>
                    <tr className=''>
                        {dataUsuario.role === 'Doctor' &&
                            <>
                                <td className='p-2 md:p-5'> <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>1</p></td>
                                <td className='p-2 md:p-5'>20/10/2024</td>
                                <td className='p-2 md:p-5'>8:00 hs</td>
                                <td className='p-2 md:p-5'>Juan Lopez</td>
                            </>
                        }
                        {dataUsuario.role === 'Administrador' &&
                            <>
                                <td className='p-2 md:p-5'>321a3s2d1a5d1asd</td>
                                <td className='p-2 md:p-5'>Juan Lopez</td>
                                <td className='p-2 md:p-5'>juanlopez@rollinghealth.com</td>
                                <td className='p-2 md:p-5'>Paciente</td>
                                <td className='p-2 md:p-5'>Activo</td>
                                <td className='p-2 md:p-5'>
                                    <button className="text-3xl flex items-center text-red-500 hover:text-neutral-600">
                                        <IoCloseCircle />
                                    </button>
                                    <Toaster />
                                </td>
                            </>}
                    </tr>
                </tbody>
            </table>
            {dataUsuario.role === 'Doctor' &&
                <>
                    <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>Turnos Mañana</p>
                    <table className='table-auto md:min-w-full'>
                        <thead className=' text-left bg-gray-100'>
                            <tr className='h-6 text-neutral-500'>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Nombre del Paciente</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=''>
                                <td className='p-2 md:p-5'> <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>1</p></td>
                                <td className='p-2 md:p-5'>20/10/2024</td>
                                <td className='p-2 md:p-5'>8:00 hs</td>
                                <td className='p-2 md:p-5'>Juan Lopez</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>Turnos Próximos 7 días</p>
                    <table className='table-auto md:min-w-full'>
                        <thead className=' text-left bg-gray-100'>
                            <tr className='h-6 text-neutral-500'>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Nombre del Paciente</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=''>
                                <td className='p-2 md:p-5'> <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>1</p></td>
                                <td className='p-2 md:p-5'>20/10/2024</td>
                                <td className='p-2 md:p-5'>8:00 hs</td>
                                <td className='p-2 md:p-5'>Juan Lopez</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}
