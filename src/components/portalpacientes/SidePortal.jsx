import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa6'
import { BsPencilSquare } from "react-icons/bs";
import { ImStatsBars2 } from "react-icons/im";
import { FaPlusCircle } from 'react-icons/fa';
import useUsuarioStore from '../../zustand/usuario-zustand';
import useUsersStore from '../../zustand/usuarios-zustand';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';


export default function SidePortal({ setPortal, cantidadTurnos, paciente }) {
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

    useEffect(() => {
        if (paciente) {
            getDataUsuario(dataUsuario._id);
        }
    }, [paciente, getDataUsuario]);

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
        <div className='col-span-12 xl:col-span-4 bg-neutral-100 bg-cover bg-no-repeat w-full p-4 md:p-12'>
            <div className='flex justify-between'>
                <h1 className='italic text-4xl text-[#126459]'>Perfil de paciente</h1>
                <button className='text-4xl text-[#126459]' onClick={() => openModal(dataUsuario)}><BsPencilSquare /></button>
            </div>
            <div className='mt-6 flex justify-between'>
                <div className='flex flex-col justify-center mr-12'>
                    <p className='text-2xl font-bold text-neutral-600'>
                        {dataUsuario ? dataUsuario.name : 'Nombre y Apellido Paciente'}
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
                <p className='subtitulo-side'>Datos del paciente</p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Correo Electrónico
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {dataUsuario ? dataUsuario.email : 'Correo Electrónico del paciente'}
                </p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Domicilio
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {dataUsuario ? dataUsuario.address : 'Domicilio del paciente y Provincia'}
                </p>
                <hr className="my-2" />
                <p className='text-base italic text-neutral-600 mt-4'>
                    Telefono de contacto
                </p>
                <p className='text-xl text-neutral-600 mb-4'>
                    {dataUsuario ? dataUsuario.phone : 'Telefono del paciente'}
                </p>
                <hr className="my-2" />
            </form>
            <div className='mt-6'>
                <p className='subtitulo-side'>Gestor de Turnos</p>
                <hr className="mb-2 mt-2" />
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between mt-4'>
                    <div className='flex items-center'>
                        <p className='bg-circle-verde'>{cantidadTurnos}</p>
                        <p className='ml-3 text-xl font-bold text-neutral-500'>Turnos pendientes</p>
                    </div>
                    <button onClick={() => setPortal("TurnosPortal")} className="button-side my-4"><FaPlusCircle className='mr-2' />Nuevo Turno</button>
                </div>
            </div>
            <hr className="my-2" />
            <div className='mt-6'>
                <div className='flex flex-col lg:flex-row items-baseline justify-between mt-4'>
                    <div className='flex items-center'>
                        <ImStatsBars2 className='mr-2' />
                        <p className='subtitulo-side'>Historial del paciente</p>
                    </div>
                    <button className="button-side mt-4" onClick={() => setPortal("HistorialPortal")}>Ver Historial</button>
                </div>
            </div>
            {showModal ? (
                <>
                    <div className='container-modal'>
                        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                            {/*content*/}
                            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                {/*header*/}
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
                                {/*body*/}
                                <div className='relative p-6 flex-auto'>
                                    <form
                                        className='flex flex-col'
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <p className='input-text-register'>Nombre</p>
                                        <input
                                            {...register('name', {
                                                required: 'El correo electrónico es obligatorio',
                                            })}
                                            name='name'
                                            defaultValue={usuarioAEditar?.name}
                                            placeholder='Ingrese el Nombre'
                                            maxLength={30}
                                            className='input-menu'
                                        />
                                        <p className='input-text-register'>Email</p>
                                        <input
                                            {...register('email', {
                                                required: 'El correo electrónico es obligatorio',
                                            })}
                                            defaultValue={usuarioAEditar?.email}
                                            name='email'
                                            type='email'
                                            placeholder='Ingrese su Correo Electrónico'
                                            maxLength={30}
                                            className={`text-center h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] ${usuarioAEditar?.email ? 'bg-gray-200 text-gray-500' : 'text-neutral-700'}`}
                                            disabled
                                        />
                                        <p className='input-text-register'>Domicilio</p>
                                        <input
                                            {...register('address'
                                            )}
                                            name='address'
                                            defaultValue={usuarioAEditar?.address || ''}
                                            className='input-menu'
                                        />
                                        <p className='input-text-register'>Teléfono</p>
                                        <input
                                            {...register('phone'
                                            )}
                                            name='phone'
                                            defaultValue={usuarioAEditar?.phone}
                                            className='input-menu'
                                        />
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
