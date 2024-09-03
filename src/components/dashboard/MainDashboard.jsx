import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { IoSearch,} from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';
import useUsuarioStore from '../../zustand/usuario-zustand';
import useUsersStore from '../../zustand/usuarios-zustand';
import useTurnosStore from "../../zustand/turnos-zustand.js";
import usePacienteStore from "../../zustand/paciente-zustand.js";
import defaultAvatarImage from '../../../public/images/defaultAvatarImage.png';
import { obtenerMesYAnio, transformAdminDataForExcel, transformDoctorDataForExcel, exportToExcel } from '../../utils/functions.js';
import Spinner from '../Spinner';
import { FaFileExcel } from 'react-icons/fa';


export default function Component() {
  const [originalData, setOriginalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [turnosPorMes, setTurnosPorMes] = useState({});
  const [nombresPacientes, setNombresPacientes] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [noResultados, setNoResultados] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const {
    getUsuarios,
    usuarios,
    loading,
    guardarListaUsuarios,
    error,
    editarUsuario,
    isLoadingEdit,
    isErrorEdit,
    limpiarError,
  } = useUsersStore();
  const { dataUsuario } = useUsuarioStore();
  const { getTurnosDoctor, turnosDoctor } = useTurnosStore();
  const { getPacientesTurnosDoctor, pacientesTurnosDoctor } = usePacienteStore();

  const role = dataUsuario?.role || '';

  const getDataUsuarios = async () => {
    try {
      const users = await getUsuarios();
      if (users) {
        setOriginalData(users);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }; 

  const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

  const grupoTurnosPorMes = (turnos) => {
    const grupo = turnos.reduce((acc, turno) => {
      const fecha = new Date(turno.fecha);
      const mes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
      if (!acc[mes]) {
        acc[mes] = [];
      }
      acc[mes].push(turno);
      return acc;
    }, {});
    setTurnosPorMes(grupo);
  };

  useEffect(() => {
    getDataUsuarios();
    if (dataUsuario._id) {
      getTurnosDoctor(dataUsuario._id);
    }
  }, [dataUsuario._id, getTurnosDoctor]);

  useEffect(() => {
    if (turnosDoctor) {
      grupoTurnosPorMes(turnosDoctor);
    }
  }, [turnosDoctor]);

  useEffect(() => {
    const getNombresPacientes = async () => {
      setLoadingPacientes(true);
      const idsPacientes = new Set();

      Object.values(turnosPorMes).flat().forEach(turno => {
        if (turno.paciente && turno.paciente._id) {
          idsPacientes.add(turno.paciente._id);
        }
      });

      if (idsPacientes.size > 0) {
        try {
          await getPacientesTurnosDoctor(Array.from(idsPacientes));
          const pacientesMap = pacientesTurnosDoctor.reduce((acc, paciente) => {
            acc[paciente._id] = paciente.name;
            return acc;
          }, {});

          setNombresPacientes(pacientesMap);
        } catch (error) {
          console.error('Error al traer los pacientes:', error);
          toast.error('Error al cargar los nombres de los pacientes');
        } finally {
          setLoadingPacientes(false);
        }
      } else {
        setNombresPacientes([]);
        setLoadingPacientes(false);
      }
    };

    if (Object.keys(turnosPorMes).length > 0) {
      getNombresPacientes();
    }
  }, [turnosPorMes, getPacientesTurnosDoctor, pacientesTurnosDoctor]);


  const buscarUsuarios = (name) => {
    setIsSearching(true);
    if (name.length > 3) {
      const busqueda = originalData.filter((usuario) =>
        usuario.name.toLowerCase().includes(name.toLowerCase())
      );
      if (busqueda.length === 0) {
        setNoResultados(true);
        guardarListaUsuarios([]);
      } else {
        setNoResultados(false);
        guardarListaUsuarios(busqueda);
      }
    } else {
      setNoResultados(false);
      guardarListaUsuarios(originalData);
    }
    setIsSearching(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = (usuario) => {
    setUsuarioAEditar(usuario);
    reset(usuario);
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      await editarUsuario(data, usuarioAEditar?._id);
      if (isErrorEdit) {
        limpiarError();
        return toast.error('Ha ocurrido un error, intente nuevamente más tarde');
      }
      setShowModal(false);
      await getDataUsuarios();
      setUsuarioAEditar(null);
      toast.success('Datos guardados exitosamente');
    } catch {
      toast.error('Ha ocurrido un error, intente nuevamente más tarde');
    }
  };

  const closeModal = () => {
    setUsuarioAEditar(null);
    setShowModal(false);
  };
  
  function handleExportToExcel(role, turnosPorMes, nombresPacientes, usuarios) {
    let transformedData = [];
  
    if (role === 'Doctor') {
      transformedData = transformDoctorDataForExcel(turnosPorMes, nombresPacientes);
      exportToExcel(transformedData, 'Turnos_Doctor');
    } else if (role === 'Administrador') {
      transformedData = transformAdminDataForExcel(usuarios);
      exportToExcel(transformedData, 'Usuarios_Administrador');
    }
  }

  const handleExportToExcelClick = () => {
    handleExportToExcel(role, turnosPorMes, nombresPacientes, usuarios);
  };
  

 
  return (
    <div className='col-span-12 lg:col-span-8 my-8 mx-8 overflow-scroll'>    
    {role === 'Doctor' && (
      <>
        <p className='text-3xl md:text-[50px] text-[#126459] font-base leading-[55px]'>
          Encuentre aquí sus
        </p>
        <p className='text-3xl md:text-[50px] text-[#126459] font-bold mb-6'>
          Turnos Pendientes
        </p>
       
      </>
    )}
    {role === 'Administrador' && (
      <>
        <p className='text-3xl md:text-[50px] text-[#126459] font-base leading-[55px]'>
          Gestión de usuarios
        </p>
        <div>
          <p className='text-xl font-medium uppercase text-neutral-500 my-4'>
            Buscar Usuario
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <input
              type='text'
              placeholder='Busque por nombre o apellido'
              onChange={(e) => buscarUsuarios(e.target.value)}
              className='text-xl text-center text-neutral-700  rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] w-full h-16'
            />
            <button className='flex items-center gap-2 bg-[#0c423b] rounded-lg p-4 h-16'>
              <IoSearch className='text-4xl text-white' />
              <p className='text-xl text-white font-bold uppercase'>Buscar</p>
            </button>
          </div>
        </div>
        {noResultados && (
          <p className='text-xl text-center text-red-500 mt-4'>
            No se encontraron resultados
          </p>
        )}
        {!noResultados && !isSearching && (
          <p className='text-xl font-medium uppercase text-neutral-500 my-4'>
            Usuarios
          </p>
        )}
      </>
    )}
    {!noResultados && !isSearching && (
      <div className='overflow-x-auto'>
       {role === 'Doctor' && nombresPacientes.length === 0 ? (
            <p className='text-xl text-center text-red-500 mt-4'>
              No hay pacientes asignados momentaneamente...
            </p>
          ) : (
            <>
            <div className="table-header">
              <button onClick={handleExportToExcelClick} className="export-button flex items-center">
                <FaFileExcel className="text-green-600 mr-2" size={24} />
                <span className="font-semibold">Exportar a Excel</span>
              </button>
            </div>
              <table className='table-auto md:min-w-full mb-6'>
                  <thead className='text-left bg-gray-100'>
                    <tr className='h-6 text-neutral-500'>
                      {role === 'Doctor' && (
                        <>
                          <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                          <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                          <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                          <th className='p-1 md:p-5 whitespace-nowrap'>Nombre del Paciente</th>
                        </>
                      )}
                      {role === 'Administrador' && (
                        <>
                          <th className='p-1 md:p-5 whitespace-nowrap'>Nombre de Usuario</th>
                          <th className='p-1 md:p-5'>Email</th>
                          <th className='p-1 md:p-5'>Imagen</th>
                          <th className='p-1 md:p-5'>Rol</th>
                          <th className='p-1 md:p-5'>Verificado</th>
                          <th className='p-1 md:p-5'>Editar</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {role === 'Doctor' ? (
                      Object.keys(turnosPorMes).sort((a, b) => {
                        const fechaA = new Date(turnosPorMes[a][0].fecha);
                        const fechaB = new Date(turnosPorMes[b][0].fecha);
                        return fechaA - fechaB;
                      })
                        .map((mes) => {
                          const { mesString, anioString } = obtenerMesYAnio(turnosPorMes[mes][0].fecha);
                          return (
                            <React.Fragment key={mes}>
                              <tr>
                                <td colSpan={5} className='p-2 md:p-2 font-bold text-lg bg-gray-200'>
                                  {`${mesString} ${anioString}`}
                                </td>
                              </tr>
                              {turnosPorMes[mes].map((turno, index) => (
                                <tr key={turno._id}>
                                  <td className='p-2 md:p-5'>
                                    <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>
                                      {index + 1}
                                    </p>
                                  </td>
                                  <td className='p-2 md:p-5'>{formatDate(turno.fecha)}</td>
                                  <td className='p-2 md:p-5'>{turno.hora}</td>
                                  <td className='p-2 md:p-5'>
                                    {loadingPacientes
                                      ? 'Cargando...'
                                      : nombresPacientes[turno.paciente._id] || 'Nombre no disponible'}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        })
                    ) : error ? (
                      <tr>
                        <td colSpan='7' className='text-center'>
                          Error al mostrar los turnos, intente de nuevo más tarde
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan='7' className='text-center'>
                          {' '}
                        </td>
                      </tr>
                    )}

                    {role === 'Administrador' && !loading ? (
                      usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                          <td className='p-2 md:p-5'>{usuario?.name}</td>
                          <td className='p-2 md:p-5'>{usuario?.email}</td>
                          <td className='p-2 md:p-5'>
                            <img
                              className='w-10 h-10 rounded-full'
                              src={usuario?.img || defaultAvatarImage}
                              alt='Rounded avatar' />
                          </td>
                          <td className='p-2 md:p-5'>{usuario?.role}</td>
                          <td className='p-2 md:p-5'>
                            {usuario?.verified ? 'Activo' : 'Inactivo'}
                          </td>
                          <td className='p-2 md:p-5'>
                            <button
                              className='text-xl p-2 flex items-center rounded-full bg-green-700 text-white hover:bg-neutral-600'
                              onClick={() => openModal(usuario)}
                            >
                              <BsPencil />
                            </button>
                            <Toaster />
                          </td>
                        </tr>
                      ))
                    ) : error ? (
                      <tr>
                        <td colSpan='7' className='text-center'>
                          Error al mostrar los usuarios, intente de nuevo mas tarde
                        </td>
                      </tr>
                    ) : (
                      role === 'Administrador' && (
                        <tr>
                          <td colSpan='7' className='text-center'>
                            <Spinner />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table></>
        )}
      </div>
    )}
    
      {showModal && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    Editar Usuario: {usuarioAEditar?.name}
                  </h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => closeModal()}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='relative p-6 flex-auto'>
                  <form
                    className='flex flex-col'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <p className='text-neutral-700 text-left italic'>Nombre</p>
                    <input
                      {...register('name', {
                        required: 'El nombre es obligatorio',
                      })}
                      name='name'
                      defaultValue={usuarioAEditar?.name}
                      placeholder='Ingrese el Nombre'
                      maxLength={30}
                      className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                    />
                    <p className='text-neutral-700 text-left italic'>Email</p>
                    <input
                      {...register('email', {
                        required: 'El correo electrónico es obligatorio',
                      })}
                      defaultValue={usuarioAEditar?.email}
                      name='email'
                      type='email'
                      placeholder='Ingrese su Correo Electrónico'
                      maxLength={30}
                      className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                    />
                    <p className='text-neutral-700 text-left italic'>Estado</p>
                    <select
                      {...register('verified', {
                        required: 'El estado es obligatorio',
                      })}
                      name='verified'
                      defaultValue={usuarioAEditar?.verified || false}
                      className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                    >
                      <option value={true}>Activo</option>
                      <option value={false}>Inactivo</option>
                    </select>
                    <p className='text-neutral-700 text-left italic'>Rol</p>
                    <select
                      {...register('role', {
                        required: 'El rol es obligatorio',
                      })}
                      name='role'
                      defaultValue={usuarioAEditar?.role}
                      className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                    >
                      <option>Doctor</option>
                      <option>Administrador</option>
                      <option>Paciente</option>
                    </select>
                    <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                    <button
                        className='bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-bold uppercase px-6 py-2 text-sm rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => closeModal()}
                    >
                        Cancelar
                    </button>
                    <button
                        disabled={isLoadingEdit}
                        className={`
                        font-bold uppercase px-6 py-2 text-sm rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                        ${isLoadingEdit
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600'}
                        `}
                        type='submit'
                    >
                        {isLoadingEdit ? 'Guardando...' : 'Guardar'}
                    </button>         
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </div>
  );
}