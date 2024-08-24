import { Toaster } from 'react-hot-toast'
import { IoArrowRedoCircle, IoCloseCircle, IoPencil, IoSearch } from 'react-icons/io5'
import useUsuarioStore from '../../zustand/usuario-zustand';
import { BsPencil } from 'react-icons/bs';

export default function MainDashboard() {
    const { dataUsuario } = useUsuarioStore();
    const role = dataUsuario?.role || "";
    return (
        <div className='col-span-12 lg:col-span-8 my-8 mx-8 overflow-scroll'>
            {role === 'Doctor' && <>
                <p className="text-3xl md:text-[50px] text-[#126459] font-base leading-[55px]">Encuentre aquí sus</p>
                <p className="text-3xl md:text-[50px] text-[#126459] font-bold mb-6">
                    Turnos Pendientes
                </p>
                <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>Turnos Hoy</p>
            </>}
            {role === 'Administrador' && <>
                <p className="text-3xl md:text-[50px] text-[#126459] font-base leading-[55px]">Gestión de usuarios</p>
                <div>
                    <p className='text-xl font-medium uppercase text-neutral-500 my-4'>Buscar Usuario</p>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <input
                            type="text"
                            placeholder="Busque por nombre o apellido"
                            className='text-xl text-center text-neutral-700  rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] w-full h-16'
                        />
                        <button className="flex items-center gap-2 bg-[#0c423b] rounded-lg p-4 h-16">
                            <IoSearch className='text-4xl text-white' />
                            <p className="text-xl text-white font-bold uppercase">Buscar</p>
                        </button>
                    </div>
                </div>
                <p className='text-xl font-medium uppercase text-neutral-500 my-4'>Usuarios</p>
            </>}
            <table className='table-auto md:min-w-full mb-6'>
                <thead className=' text-left bg-gray-100'>
                    <tr className='h-6 text-neutral-500'>
                        {role === 'Doctor' &&
                            <>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Nombre del Paciente</th>
                            </>}
                        {role === 'Administrador' &&
                            <>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Id</th>
                                <th className='p-1 md:p-5 whitespace-nowrap'>Nombre de Usuario</th>
                                <th className='p-1 md:p-5 '>Email</th>
                                <th className='p-1 md:p-5 '>Imagen</th>
                                <th className='p-1 md:p-5 '>Rol</th>
                                <th className='p-1 md:p-5 '>Verificado</th>
                                <th className='p-1 md:p-5 '>Editar</th>
                            </>}
                    </tr>
                </thead>
                <tbody>
                    <tr className=''>
                        {role === 'Doctor' &&
                            <>
                                <td className='p-2 md:p-5'> <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>1</p></td>
                                <td className='p-2 md:p-5'>20/10/2024</td>
                                <td className='p-2 md:p-5'>8:00 hs</td>
                                <td className='p-2 md:p-5'>Juan Lopez</td>
                            </>
                        }
                        {role === 'Administrador' &&
                            <>
                                <td className='p-2 md:p-5'>321a3s2d1a5d1asd</td>
                                <td className='p-2 md:p-5'>Juan Lopez</td>
                                <td className='p-2 md:p-5'>juanlopez@rollinghealth.com</td>
                                <td className='p-2 md:p-5'>muestra el enlace de datausuario.img</td>
                                <td className='p-2 md:p-5'>Paciente</td>
                                <td className='p-2 md:p-5'>Activo</td>
                                <td className='p-2 md:p-5'>
                                    <button className="text-xl p-2 flex items-center rounded-full bg-green-700 text-white hover:bg-neutral-600">
                                        <BsPencil />
                                    </button>
                                    <Toaster />
                                </td>
                            </>}
                    </tr>
                </tbody>
            </table>
            <hr className="my-4" />
            {role === 'Doctor' &&
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
                    <hr className="my-4" />
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
