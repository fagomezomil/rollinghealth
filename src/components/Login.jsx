import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ROLES } from '../constants/usersRoles';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const URI_LOGIN = import.meta.env.VITE_API_LOGIN;
  const userRole = '';
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (dataForm) => {
    setIsLoadingButton(true);
    try {
      const { data } = await axios.post(URI_LOGIN, dataForm);
      if (data.role === ROLES.PATIENT) navigate('/paciente');
    } catch (error) {
      toast.error('El nombre de usuario o contraseña son incorrectos')
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
  userRole === '' ? (
    <div className='mt-20 grid grid-cols-12 items-center'>
      <div className='col-span-5 bg-[url(/images/register/register.webp)] bg-cover bg-no-repeat w-full h-[650px]'></div>
      <div className='col-span-5 p-10 '>
        <p className='text-[50px] text-[#126459] font-bold leading-[55px] mb-6'>
          Ingresar
        </p>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-neutral-700 text-left italic'>
            Correo electrónico
          </p>
          <input
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
            })}
            type='email'
            name='email'
            placeholder='Ingrese su Correo Electrónico'
            maxLength={30}
            className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
          <p className='text-neutral-700 text-left italic'>
            Ingresar Contraseña
          </p>
          <input
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            })}
            type='password'
            name='password'
            placeholder='Ingrese su contraseña'
            maxLength={16}
            minLength={8}
            className='text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]'
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
          <button
            type='submit'
            disabled={isLoadingButton}
            className={`rounded-lg text-white text-sm py-2 px-4 mb-4 ${
              isLoadingButton
                ? 'bg-[#E6E6E6] cursor-not-allowed'
                : 'bg-[#126459]'
            }`}
          >
            {isLoadingButton ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
       <Toaster />
    </div>
  ) : (
    ''
  )
  );
}
