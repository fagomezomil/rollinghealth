import {useState} from 'react';
import { BsPencilSquare } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa6'
import useUsuarioStore from '../../zustand/usuario-zustand';
import useUsersStore from '../../zustand/usuarios-zustand';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';


export default function SideDashboard() {
    const [showModal, setShowModal] = useState(false);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);

    const { dataUsuario, getDataUsuario } = useUsuarioStore((state) => ({
        dataUsuario: state.dataUsuario,       
        getDataUsuario: state.getDataUsuario       
    }));

    const {     
        editarUsuario,
        isLoadingEdit,
        isErrorEdit,
        limpiarError,
      } = useUsersStore();

    const role = dataUsuario?.role || "";
    const imageSrc = dataUsuario?.img;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const openModal = (paciente) => {
        setUsuarioAEditar(paciente);
        reset(paciente);
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
          await getDataUsuario(dataUsuario._id);
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
        <div className='col-span-12 lg:col-span-4  bg-neutral-100 p-4 md:p-12'>
            <div className='flex justify-between'>
                <h1 className='italic text-4xl text-[#126459]'>
                    {dataUsuario && role === 'Doctor' ? 'Portal Médico' : dataUsuario && role === 'Administrador' && 'Portal Administrador'}</h1>
                <button className='text-4xl text-[#126459]' onClick={() => openModal(dataUsuario)}><BsPencilSquare /></button>
            </div>
            <div className='mt-6 flex justify-between'>
                <div className='flex flex-col justify-center mr-12'>
                    <p className='text-2xl font-bold text-neutral-600'>
                        {dataUsuario && dataUsuario.name}
                    </p>
                </div>
                <div className="rounded-full w-fit mb-2 bg-neutral-400 text-2xl">
                        {imageSrc ? (
                            <img src={imageSrc} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
                        ) : (
                            <FaUser className='text-white' />
                        )}
                    </div> 
            </div>
            <div>
                <p className='text-xl font-medium uppercase text-neutral-500'>Datos del {dataUsuario.role}</p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Correo Electrónico
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {dataUsuario && dataUsuario.email}
                </p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    {dataUsuario.role === 'Doctor' ? 'Especialidad Médica' : 'Perfil Funcional'}
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {dataUsuario.role === 'Doctor'
                        ? (dataUsuario.specialty ? dataUsuario.specialty : 'Especialidad Médica')
                        : (dataUsuario.role === 'Administrador' ? 'Administrador' : 'Perfil Desconocido')}
                </p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Telefono
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                 {dataUsuario.phone? dataUsuario.phone : 'agregar telefono'}
                </p>
            </div>
            {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-2xl font-semibold'>
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
                      {...register('email')}
                      defaultValue={usuarioAEditar?.email}
                      name='email'
                      type='email'
                      placeholder='Ingrese su Correo Electrónico'
                      maxLength={30}
                      className={`text-center h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] ${usuarioAEditar?.email ? 'bg-gray-200 text-gray-500' : 'text-neutral-700'}`}
                      disabled
                    />
                    {dataUsuario.role === 'Doctor' && (
                      <>
                        <p className='text-neutral-700 text-left italic'>Especialidad</p>
                        <input
                          {...register('specialty')}
                          name='specialty'
                          defaultValue={usuarioAEditar?.specialty}
                          placeholder='Ingrese la Especialidad'
                          className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                        />
                        <p className='text-neutral-700 text-left italic'>Telefono</p>
                        <input
                          {...register('phone')}
                          name='phone'
                          defaultValue={usuarioAEditar?.phone}
                          placeholder='Ingrese el Número de Licencia'
                          className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                        />
                      </>
                    )}
                    {dataUsuario.role === 'Administrador' && (
                      <>
                        <p className='text-neutral-700 text-left italic'>Domicilio</p>
                        <input
                          {...register('address')}
                          name='address'
                          defaultValue={usuarioAEditar?.address || ''}
                          placeholder='Ingrese el Domicilio'
                          className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                        />
                        <p className='text-neutral-700 text-left italic'>Teléfono</p>
                        <input
                          {...register('phone')}
                          name='phone'
                          defaultValue={usuarioAEditar?.phone}
                          placeholder='Ingrese el Teléfono'
                          className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                        />
                      </>
                    )}
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
      ) : null}
        </div>
    )
}
