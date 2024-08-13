import { FaWhatsapp } from 'react-icons/fa';
import { IoCalendarNumber, IoCloseCircle, IoSearchSharp } from 'react-icons/io5';
import { FaRegTrashAlt } from "react-icons/fa";
import useTurnosStore from "../../zustand/turnos-zustand.js";


export default function MenuPortal({ setPortal, portal, cantidadTurnos, turnosPaciente, centroMedicoTurnos, medicos}) {

    const {eliminarTurno, getTurnosPaciente} = useTurnosStore(state => ({      
        eliminarTurno: state.eliminarTurno,
        getTurnosPaciente: state.getTurnosPaciente,      
    }));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };
    const turnosPacienteMenu = Array.isArray(turnosPaciente) ? turnosPaciente : [];

    const turnosCompletos = turnosPacienteMenu.map(turno => {
       
        const medico = medicos.find(m => m._id === turno.doctor._id) || { name: 'Desconocido' };       
        const centroMedico = centroMedicoTurnos.find(c => c._id === medico.centroMedico) || { address: 'Desconocido' };

        return {
            ...turno,
            fecha: formatDate(turno.fecha),
            centroMedico: centroMedico.address,
            medico: medico.name,
            especialidad: medico.speciality
        };
    });
      
    const cancelarTurno = async (id) => {
        try {       
          await eliminarTurno(id);
          await getTurnosPaciente("66b695969eeea75cf7534bb3");// aqui va el id del user logueado
          console.log("Turno eliminado");        
          alert("Turno cancelado exitosamente");
        } catch (error) {
          console.error("Error al cancelar el turno:", error);        
        }
      };   


    console.log(turnosCompletos);
  
    return (
        <div>
            <p className="text-[50px] text-[#126459] font-base leading-[55px]">Disfrutá todos los servicios del </p>
            <p className="text-[50px] text-[#126459] font-bold mb-6">
                Portal Paciente
            </p>
            <hr className="my-8 " />
            <div className='flex items-center'>
                <p className='rounded-full w-10 h-10 text-center pt-1 font-bold text-white bg-[#126459] text-2xl'>{cantidadTurnos}</p>
                <p className='ml-4 mr-10 text-xl font-bold text-neutral-500'>Turnos pendientes</p>
                <button className="rounded-lg bg-[#126459] text-white text-medium py-2 px-4">Ver detalles</button>
            </div>
            <div className='overflow-scroll rounded-lg my-6'>
                <div className='w-full'>
                    <table className='table-auto md:min-w-full'>
                        <thead className='text-left bg-gray-100'>
                            <tr className='text-neutral-500'>
                                <th className='p-2 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                                <th className='p-2 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                                <th className='p-2 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                                <th className='p-2 md:p-5 whitespace-nowrap'>Médico tratante</th>
                                <th className='p-2 md:p-5 whitespace-nowrap'>Especialidad</th>
                                <th className='p-2 md:p-5 whitespace-nowrap'>Dirección de atención</th>
                                <th className='p-2 md:p-5 '>Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnosCompletos.map((turno, index) => (
                                <tr key={turno._id || index} className='border-b'>
                                    <td className='p-2 md:p-5'>{index + 1}</td>
                                    <td className='p-2 md:p-5'>{turno.fecha}</td>
                                    <td className='p-2 md:p-5'>{turno.hora}</td>
                                    <td className='p-2 md:p-5'>{turno.medico}</td>
                                    <td className='p-2 md:p-5'>{turno.especialidad}</td>
                                    <td className='p-2 md:p-5'>{turno.centroMedico}</td>
                                    <td className='p-2 md:p-5'>
                                        <button onClick={() => cancelarTurno(turno._id)} className="text-red-500 hover:text-red-700">
                                            <IoCloseCircle />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={() => setPortal("TurnosPortal")} className='boton-menu-portal'>
                <IoCalendarNumber className='text-7xl mr-6' />
                <div className='text-left'>
                    <p className='text-2xl md:text-4xl font-semibold '>Gestión de Turnos</p>
                    <p>Aqui podes gestionar tus turnos de manera inmediata y concretar una cita con el especialista indicado</p>
                </div>
            </button>
            <button className='boton-menu-portal mt-6'>
                <IoSearchSharp className='text-7xl mr-6' />
                <div className='text-left'>
                    <p className='text-2xl md:text-4xl font-semibold '>Buscar especialista</p>
                    <p>Encuentre al médico correcto para resolver sus consultas con la mejor atención </p>
                </div>
            </button>
            <button className='boton-menu-portal mt-6'>
                <FaWhatsapp className='text-7xl mr-6 ' />
                <div className='text-left'>
                    <p className='text-2xl md:text-4xl font-semibold '>Atención Telefónica</p>
                    <p>Donde puedes realizar una llamada telefônica con el especialista indicado</p>
                </div>
            </button>
        </div>
    )
}


