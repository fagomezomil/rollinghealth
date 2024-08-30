import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import {
  IoArrowRedoCircle,
  IoCloseCircle,
  IoPencil,
  IoSearch,
} from 'react-icons/io5';
import useUsuarioStore from '../../zustand/usuario-zustand';
import { BsPencil } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import useUsersStore from '../../zustand/usuarios-zustand';
import defaultAvatarImage from '../../../public/images/defaultAvatarImage.png';

export default function MainDashboard() {
  const [originalData, setOriginalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
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
  const role = dataUsuario?.role || '';

  const getDataUsuarios = async () => {
    try {
      const users = await getUsuarios();
      if (users) {
        setOriginalData(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUsuarios();
  }, []);

  const buscarUsuarios = (name) => {
    if (name.length > 3) {
      const busqueda = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(name.toLowerCase())
      );
      guardarListaUsuarios(busqueda);
    } else {
      guardarListaUsuarios(originalData);
    }
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
        return toast.error(
          'Ha ocurrido un error, intente nuevamente más tarde'
        );
      }
      setShowModal(false);
      await getDataUsuarios();
      setUsuarioAEditar(null);
      toast.success('Usuario editado exitosamente');
    } catch {
      toast.error('Ha ocurrido un error, intente nuevamente más tarde');
    }
  };

  const closeModal = () => {
    setUsuarioAEditar(null);
    setShowModal(false);
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
          <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>
            Turnos Hoy
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
          <p className='text-xl font-medium uppercase text-neutral-500 my-4'>
            Usuarios
          </p>
        </>
      )}
      <div className='overflow-x-auto'>
        <table className='table-auto md:min-w-full mb-6'>
          <thead className=' text-left bg-gray-100'>
            <tr className='h-6 text-neutral-500'>
              {role === 'Doctor' && (
                <>
                  <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                  <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                  <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>
                    Horario
                  </th>
                  <th className='p-1 md:p-5 whitespace-nowrap'>
                    Nombre del Paciente
                  </th>
                </>
              )}
              {role === 'Administrador' && (
                <>
                  <th className='p-1 md:p-5 whitespace-nowrap'>
                    Nombre de Usuario
                  </th>
                  <th className='p-1 md:p-5 '>Email</th>
                  <th className='p-1 md:p-5 '>Imagen</th>
                  <th className='p-1 md:p-5 '>Rol</th>
                  <th className='p-1 md:p-5 '>Verificado</th>
                  <th className='p-1 md:p-5 '>Editar</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {role === 'Doctor' && (
              <tr>
                <>
                  <td className='p-2 md:p-5'>
                    {' '}
                    <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>
                      1
                    </p>
                  </td>
                  <td className='p-2 md:p-5'>20/10/2024</td>
                  <td className='p-2 md:p-5'>8:00 hs</td>
                  <td className='p-2 md:p-5'>Juan Lopez</td>
                </>
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
                      alt='Rounded avatar'
                    />
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
                    Cargando usuarios...
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <hr className='my-4' />
      {role === 'Doctor' && (
        <>
          <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>
            Turnos Mañana
          </p>
          <table className='table-auto md:min-w-full'>
            <thead className=' text-left bg-gray-100'>
              <tr className='h-6 text-neutral-500'>
                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                <th className='p-1 md:p-5 whitespace-nowrap'>
                  Nombre del Paciente
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=''>
                <td className='p-2 md:p-5'>
                  {' '}
                  <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>
                    1
                  </p>
                </td>
                <td className='p-2 md:p-5'>20/10/2024</td>
                <td className='p-2 md:p-5'>8:00 hs</td>
                <td className='p-2 md:p-5'>Juan Lopez</td>
              </tr>
            </tbody>
          </table>
          <hr className='my-4' />
          <p className='text-xl font-medium uppercase text-neutral-500 mb-4'>
            Turnos Próximos 7 días
          </p>
          <table className='table-auto md:min-w-full'>
            <thead className=' text-left bg-gray-100'>
              <tr className='h-6 text-neutral-500'>
                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>N°</th>
                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Día</th>
                <th className='p-1 md:p-5 mr-10 whitespace-nowrap'>Horario</th>
                <th className='p-1 md:p-5 whitespace-nowrap'>
                  Nombre del Paciente
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=''>
                <td className='p-2 md:p-5'>
                  {' '}
                  <p className='font-bold text-white bg-[#126459] rounded-full py-2 px-4 w-fit'>
                    1
                  </p>
                </td>
                <td className='p-2 md:p-5'>20/10/2024</td>
                <td className='p-2 md:p-5'>8:00 hs</td>
                <td className='p-2 md:p-5'>Juan Lopez</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
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
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <form
                    className='flex flex-col'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <p className='text-neutral-700 text-left italic'>Nombre</p>
                    <input
                      {...register('name', {
                        required: 'El correo electrónico es obligatorio',
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
                        required: 'El correo electrónico es obligatorio',
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
                        required: 'El correo electrónico es obligatorio',
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
                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => closeModal()}
                      >
                        Cancelar
                      </button>
                      <button
                        disabled={isLoadingEdit}
                        className={`rounded-lg text-white text-sm py-2 px-4 mb-4 ${
                          isLoadingEdit
                            ? 'bg-[#E6E6E6] cursor-not-allowed'
                            : 'bg-[#126459]'
                        }`}
                        type='submit'
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </div>
  );
}
