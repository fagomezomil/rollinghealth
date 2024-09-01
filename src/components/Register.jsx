import { useForm } from "react-hook-form"
import { agregarUsuarioAPI } from "../utils/queries"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { irAlTop } from "../utils/functions";

export default function Register() {
    useEffect( () => {
        irAlTop();
      });

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const navegacion = useNavigate()

    const onSubmit = async (dataForm) => {
        const response = await agregarUsuarioAPI(dataForm)
        if (response.status === 201) {
            toast.success('Registrado exitosamente')
            reset()
            navegacion('/login')
        } else {
            toast.error('Error al registrar, intente más tarde')
        }
    }

    return (
        <div className='mt-20 grid grid-cols-12'>
            <div className='col-span-12 lg:col-span-5 bg-[url(/images/register/register.webp)] bg-cover bg-no-repeat w-full h-[350px] lg:h-full'>
            </div>
            <div className="col-span-12 lg:col-span-6 p-10 ">
                <p className="text-[50px] text-[#126459] font-bold leading-[55px] mb-6">Registrese y sientase cuidado por Rolling Health</p>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-neutral-700 text-left italic">Nombre y apellido <span className="text-red-500">*</span></p>
                    <input
                        type="text"
                        placeholder="Ingrese su Nombre y Apellido completo"
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                        {
                        ...register("name", {
                            required: 'El nombre y apellido es obligatorio.',
                            minLength: {
                                value: 3,
                                message: "Debe ingresar como mínimo 3 carácteres para el nombre y apellido de usuario.",
                            },
                            maxLength: {
                                value: 50,
                                message: "Puede ingresar como máximo 30 carácteres para el nombre y apellido de usuario.",
                            },
                        })
                        }
                    />
                    {errors.nombre && (
                        <p className="text-red-500 text-sm">{errors.nombre.message}</p>
                    )}
                    <p className="text-neutral-700 text-left italic">Dirección (Domicilio y Provincia) <span className="text-red-500">*</span></p>
                    <input
                        type="text"
                        placeholder="Ingrese su dirección"
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                        {
                        ...register("address", {
                            required: 'La dirección es obligatoria.',
                            minLength: {
                                value: 3,
                                message: "Debe ingresar como mínimo 3 carácteres para la dirección.",
                            },
                            maxLength: {
                                value: 250,
                                message: "Puede ingresar como máximo 250 carácteres para la dirección.",
                            },
                        })
                        }
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address.message}</p>
                    )}
                    <p className="text-neutral-700 text-left italic">Teléfono de contacto <span className="text-red-500">*</span></p>
                    <input
                        type="number"
                        placeholder="Ingrese su número de contacto (sin 0 ni 15)"
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                        {
                        ...register("phone", {
                            required: 'El número de teléfono es obligatorio.',
                            minLength: {
                                value: 10,
                                message: "Debe ingresar como mínimo 10 carácteres para el número de teléfono.",
                            },
                            maxLength: {
                                value: 15,
                                message: "Puede ingresar como máximo 15 carácteres para el número de teléfono.",
                            },
                        })
                        }
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}
                    <p className="text-neutral-700 text-left italic">Correo electrónico <span className="text-red-500">*</span></p>
                    <input
                        type="email"
                        placeholder="Ingrese su Correo Electrónico"
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                        {...register("email", {
                            required: "El email es obligatorio",
                            minLength: {
                                value: 4,
                                message:
                                    "El email debe contener al menos 4 caracteres",
                            },
                            maxLength: {
                                value: 250,
                                message:
                                    "El email debe contener como máximo 250 caracteres",
                            },
                            pattern: {
                                value:
                                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message:
                                    "Ingrese una dirección de correo electrónico válida",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email.message}</p>
                    )}
                    <p className="text-neutral-700 text-left italic">Ingresar Contraseña <span className="text-red-500">*</span></p>
                    <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 10 carácteres.",
                            },
                            maxLength: {
                                value: 16,
                                message: "La contraseña puede tener hasta 16 carácteres.",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className='text-red-500 text-sm'>{errors.password.message}</p>
                    )}
                    <p className="text-neutral-700 text-left italic">Repetir Contraseña <span className="text-red-500">*</span></p>
                    <input
                        type="password"
                        placeholder="Repita su contraseña"
                        className="text-center text-neutral-700 h-10 my-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459]"
                        {...register("confirmPassword", {
                            required: "Es obligatorio ingresar nuevamente la contraseña",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 10 carácteres.",
                            },
                            maxLength: {
                                value: 16,
                                message: "La contraseña puede tener hasta 16 carácteres.",
                            },
                            validate: (value) =>
                                value === watch("password") ||
                                "Las contraseñas no coinciden",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
                    )}
                    <button type="submit" className="rounded-lg bg-[#126459] text-white text-sm py-2 px-4 mb-4">Registrar</button>
                </form>
            </div>
            <Toaster />
        </div>
    )
}
