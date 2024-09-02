import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlusCircle, FaUser } from 'react-icons/fa';
import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useUsuarioStore from '../../zustand/usuario-zustand';
import useTurnosStore from '../../zustand/turnos-zustand.js';
import useButtonState from '../../hooks/useButtonState';
import { resizeImage } from '../../utils/functions.js';
import { ROLES } from '../../constants/usersRoles';
import useUsersStore from '../../zustand/usuarios-zustand';


export default function NavLg({
  open,
  setOpen,
  emailOk,
  setEmailOk,
  passwordOk,
  setPasswordOk,
  role,
}) {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { isButtonDisabled, disableButton, enableButton } = useButtonState(false);
  const [showModal, setShowModal] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  const { turnosPaciente } = useTurnosStore((state) => ({
    turnosPaciente: state.turnosPaciente,
  }));

  const {
    dataUsuario,
    postLogout,
    isLoading,
    actualizarImagenPerfil,
    getDataUsuario,
    eliminarImagenPerfil,
    postLogin,
    error,
  } = useUsuarioStore((state) => ({
    dataUsuario: state.dataUsuario,
    postLogout: state.postLogout,
    actualizarImagenPerfil: state.actualizarImagenPerfil,
    getDataUsuario: state.getDataUsuario,
    eliminarImagenPerfil: state.eliminarImagenPerfil,
    postLogin: state.postLogin,
    error: state.error,
    isLoading: state.isLoading,
  }));

  const {       
    editarUsuario,
    isLoadingEdit,
    isErrorEdit,
    limpiarError,
  } = useUsersStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    disableButton();
    toast(
      (t) => (
        <div>
          <p>¿Seguro que quieres cerrar sesión?</p>
          <div className='flex justify-end mt-4'>
            <button
              className='mr-2 px-4 py-2 bg-green-500 text-white rounded-lg'
              onClick={() => {
                toast.dismiss(t.id);
                postLogout().then(() => {
                  enableButton();
                  setOpen(false);
                  navigate('/');
                });
              }}
            >
              Sí
            </button>
            <button
              className='mr-2 px-4 py-2 bg-red-500 text-white rounded-lg'
              onClick={() => {
                toast.dismiss(t.id);
                enableButton();
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      }
    );
  };

  //const cantidadTurnos = Array.isArray(turnosPaciente) ? turnosPaciente.length : 0;
  const turnosPacienteMenu = Array.isArray(turnosPaciente)
    ? turnosPaciente
    : [];

  const turnosCompletos = turnosPacienteMenu.map((turno) => {
    return {
      fecha: turno.fecha,
    };
  });

  const hoy = new Date();
  const turnosFiltrados = turnosCompletos.filter((turno) => {
    const fechaTurno = new Date(turno.fecha);
    return fechaTurno >= hoy;
  });

  const cantidadTurnos = Array.isArray(turnosFiltrados)
    ? turnosFiltrados.length
    : 0;

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const resizedImage = await resizeImage(file, 800, 800);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(resizedImage);
  };

  useEffect(() => {
    if (image) {
      getDataUsuario(dataUsuario._id);
      handleSubmitImage();
    }
  }, [image, getDataUsuario]);

  const handleSubmitImage = async (event) => {
    if (event) event.preventDefault();
    if (image) {
      await actualizarImagenPerfil(dataUsuario._id, image);
      await getDataUsuario(dataUsuario._id);
    }
  };

  const handleRemoveImage = async () => {
    await eliminarImagenPerfil(dataUsuario._id);
  };

  const imageSrc = dataUsuario?.img;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (dataForm) => {
    try {
      const user = await postLogin(dataForm);
      if (user.role === ROLES.PATIENT) {
        navigate('/paciente');
      } else if (user.role === ROLES.DOCTOR || user.role === ROLES.ADMIN) {
        navigate('/dashboard');
      } else {
        toast.error('Rol desconocido, por favor contacte con soporte.');
      }
      reset({ username: '', password: '' });
      setOpen(false);
    } catch {
      toast.error('El nombre de usuario o contraseña son incorrectos');
    }
  };


  const openModal = (paciente) => {
    setUsuarioAEditar(paciente);
    reset(paciente);
    setShowModal(true);
  };

  const onSubmitEdit = async (data) => {
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
    <>
      <div
        onClick={() => setOpen(!open)}
        className='text-lg italic flex justify-center items-center mr-6'
      >
        {role === '' && (
          <>
            <p className='mr-2'>Ingresar</p>
            <FaUser />
          </>
        )}
        {role !== '' && (
          <button
            onClick={() => setOpen(!open)}
            className='flex justify-center items-center text-[20px]'
          >
            <>
              <p className='mr-2'>Menú</p>
              {!open ? <RiMenu3Line /> : <RiCloseFill />}
            </>
          </button>
        )}
      </div>
      {open && (
        <div className='flex bg-neutral-100 shadow-lg p-6 w-screen lg:w-[400px] rounded-lg absolute right-0 lg:right-6 top-12 md:top-14 flex-col'>
          <>
            {role === '' && (
              <>
                <Link to='/nosotros' className='navbar-button block xl:hidden'>
                  Nosotros
                </Link>
                <Link to='/centros' className='navbar-button block xl:hidden'>
                  Centros de Salud
                </Link>
                <Link to='/staff' className='navbar-button block xl:hidden'>
                  Staff Médico
                </Link>
                <Link to='/login' className='navbar-button block xl:hidden'>
                  Turnos Online
                </Link>
                <Link
                  to='/login'
                  className='text-neutral-500 user-menu-button py-2 mb-1 font-medium text-lg'
                  onClick={() => setOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <form
                  className='flex flex-col'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className='text-neutral-700 text-left italic'>
                    Inicie con Usuario o E-mail
                  </p>
                  <input
                    {...register('email', {
                      required: 'El correo electrónico es obligatorio',
                    })}
                    type='email'
                    name='email'
                    onInput={() => setEmailOk(true)}
                    placeholder='Ingrese su correo electrónico'
                    maxLength={35}
                    className='input-menu'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                  {emailOk === true && (
                    <>
                      <p className='text-neutral-700 text-left italic'>
                        Ingresar Contraseña
                      </p>
                      <input
                        {...register('password', {
                          required: 'La contraseña es obligatoria',
                          minLength: {
                            value: 8,
                            message:
                              'La contraseña debe tener al menos 8 caracteres',
                          },
                        })}
                        type='password'
                        name='password'
                        placeholder='Ingrese su contraseña'
                        onInput={() => setPasswordOk(true)}
                        maxLength={16}
                        minLength={8}
                        className='input-menu'
                      />
                      {errors.password && (
                        <p className='text-red-500 text-sm'>
                          {errors.password.message}
                        </p>
                      )}
                    </>
                  )}
                  {passwordOk === true && (
                    <>
                      <button
                        type='submit'
                        disabled={isLoading}
                        className={`rounded-lg text-white text-sm py-2 px-4 mb-4 ${isLoading ? 'bg-[#E6E6E6] cursor-not-allowed' : 'bg-[#126459]'
                          }`}
                      >
                        Ingresar
                      </button>
                    </>
                  )}
                </form>
                <hr className='mb-2 mt-2' />
                <button
                  className='flex items-center justify-center user-menu-button'
                  onClick={() => setOpen(false)}
                >
                  <img src='./images/google.png' alt='' className='h-10 p-2' />
                  <p className=''>Continuar con Google</p>
                </button>
                <hr className='mt-2 mb-4' />
                <Link
                  to='/register'
                  className='user-menu-button'
                  onClick={() => setOpen(false)}
                >
                  Registrarse
                </Link>
                <hr className='my-2' />
              </>
            )}
            {role !== '' && (
              <>
                {role === 'Paciente' && (
                  <>
                    <Link
                      to='/nosotros'
                      className='navbar-button block xl:hidden'
                    >
                      Nosotros
                    </Link>
                    <Link
                      to='/centros'
                      className='navbar-button block xl:hidden'
                    >
                      Centros de Salud
                    </Link>
                    <Link to='/staff' className='navbar-button block xl:hidden'>
                      Staff Médico
                    </Link>
                    <Link to='/login' className='navbar-button block xl:hidden'>
                      Turnos Online
                    </Link>
                  </>
                )}
                {role === 'Doctor' && (
                  <Link
                    to='/dashboard'
                    className='navbar-button mb-4 block'
                    onClick={() => setOpen(false)}
                  >
                    Administración
                  </Link>
                )}
                {role === 'Administrador' && (
                  <Link
                    to='/dashboard'
                    className='navbar-button mb-4 block'
                    onClick={() => setOpen(false)}
                  >
                    Administración
                  </Link>
                )}
                <div className='flex items-center justify-between text-neutral-500 mt-4 xl:mt-0'>
                  <div className='text-left'>
                    <p className='font-bold text-lg'>{dataUsuario.name}</p>
                    <p className='italic'>{dataUsuario.email}</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`flex flex-col rounded-full w-fit mb-2  ${imageSrc === '' ? 'bg-neutral-400 text-white p-4' : ''} text-xl cursor-pointer`}
                      onClick={handleIconClick}
                    >
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt='Perfil'
                          className='rounded-full w-16 h-16 object-cover'
                        />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    {imageSrc ? (
                      <p
                        className='text-sm text-black-500 cursor-pointer'
                        onClick={handleRemoveImage}
                      >
                        Eliminar foto
                      </p>
                    ) : (
                      <p className='text-sm'>Subir foto perfil</p>
                    )}

                    <input
                      type='file'
                      accept='image/*'
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className='hidden'
                    />
                  </div>
                </div>
                {role === 'Paciente' && (
                  <>
                    <hr className='my-4 border-neutral-300' />
                    <div className='flex items-center justify-between'>
                      <div className='flex'>
                        <p className='rounded-full w-8 h-8 text-center font-bold text-white bg-[#126459] text-xl'>
                          {cantidadTurnos}
                        </p>
                        <p className='ml-1 text-lg font-bold text-neutral-500'>
                          Turnos pendientes
                        </p>
                      </div>
                      <Link to='/paciente'><button
                        className='rounded-lg flex justify-center items-center bg-[#126459] text-white text-medium py-1 px-2'
                        onClick={() => openModal(dataUsuario)}
                      >                       
                        Editar Perfil
                      </button></Link>
                    </div>
                  </>
                )}
                <hr className='my-4 border-neutral-300' />
                <button
                  onClick={handleLogout}
                  disabled={isButtonDisabled}
                  className={`btn text-white text-sm py-2 px-4 mb-4 rounded-lg ${isButtonDisabled
                    ? 'cursor-not-allowed opacity-50 bg-gray-500'
                    : 'bg-[#126459] hover:bg-[#0f513a]'
                    }`}
                >
                  {isLoading ? 'Cerrando Sesión...' : 'Cerrar Sesión'}
                </button>

              </>
            )}
          </>
        </div>
      )}
      <Toaster />
      {showModal ? (
            <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                    <h3 className='text-2xl font-semibold text-black'>
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
                        onSubmit={handleSubmit(onSubmitEdit)}
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
                        className={`text-center h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] ${usuarioAEditar?.email ? 'bg-gray-200 text-gray-500' : 'text-neutral-700'}`}
                        disabled                            
                        />                     
                        <p className='text-neutral-700 text-left italic'>Domicilio</p>
                        <input
                        {...register('address'
                        )}
                        name='address'
                        defaultValue={usuarioAEditar?.address || ''}
                        className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
                        />                    
                        <p className='text-neutral-700 text-left italic'>Teléfono</p>
                        <input
                        {...register('phone'
                        )}
                        name='phone'
                        defaultValue={usuarioAEditar?.phone}
                        className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
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
    </>
  );
}
