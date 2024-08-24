import React, { useEffect } from 'react'
import { FaUser } from 'react-icons/fa6'
import { irAlTop } from '../utils/functions'

export default function Nosotros() {
  useEffect(() => {
    irAlTop();
  })
  return (
    <div className="mt-20 p-6 md:p-12 relative">
      <p className="text-3xl md:text-[50px] text-[#126459] font-bold leading-tight">Un equipo consolidado por el desarrollo</p>
      <p className="text-neutral-500 italic text-[20px] md:text-2xl lg:w-[70%] mt-4 mb-10">Somos un grupo de personas que apostamos a perfeccionar el manejo de React durante esta comisión avanzada dispuestos a trabajar en equipo.</p>
      <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12'>
        <div className='flex flex-col items-center'>
          <div className='rounded-full w-64 h-64 bg-[url("/images/nosotros/mariana.png")] bg-cover'></div>
          <p className='bg-[#126459] rounded-md py-2 px-7 text-white text-xl font-medium mt-2'>Mariana Cervantes</p>
          <p className='bg-neutral-400 rounded-md py-2 px-7 text-white italic font-base'>Titulo correspondiente - Comisión 32J</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='rounded-full w-64 h-64 bg-[url("/images/nosotros/lucas.jpg")] bg-cover'></div>
          <p className='bg-[#126459] rounded-md py-2 px-7 text-white text-xl font-medium mt-2'>Lucas Capdevilla</p>
          <p className='bg-neutral-400 rounded-md py-2 px-7 text-white italic font-base'>Titulo correspondiente - Comisión 32J</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='rounded-full w-64 h-64 bg-[url("/images/nosotros/marcelo.png")] bg-cover'></div>
          <p className='bg-[#126459] rounded-md py-2 px-7 text-white text-xl font-medium mt-2'>Marcelo Frias</p>
          <p className='bg-neutral-400 rounded-md py-2 px-7 text-white italic font-base'>Titulo correspondiente - Comisión 32J</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='rounded-full w-64 h-64 bg-[url("/images/nosotros/joaquin.jpg")] bg-cover'></div>
          <p className='bg-[#126459] rounded-md py-2 px-7 text-white text-xl font-medium mt-2'>Joaquin Ortiz</p>
          <p className='bg-neutral-400 rounded-md py-2 px-7 text-white italic font-base'>Titulo correspondiente - Comisión 32J</p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='rounded-full w-64 h-64 bg-[url("/images/nosotros/federico.jpg")] bg-cover'></div>
          <p className='bg-[#126459] rounded-md py-2 px-7 text-white text-xl font-medium mt-2'>Federico Alvarez</p>
          <p className='bg-neutral-400 rounded-md py-2 px-7 text-white italic font-base'>Graphic Developer - Comisión 7i</p>
        </div>
      </div>
      <hr className="my-8  border-neutral-300" />
      <div className='grid lg:grid-cols-2'>
        <div className='flex flex-col text-left'>
          <p className="text-4xl md:text-[50px] text-[#126459] font-bold leading-tight">Proyecto Final Rolling Health</p>
          <p className="text-neutral-500 uppercase text-3xl mt-4 mb-10">Grupo 4 - Curso de React Avanzado</p>
        </div>
        <img src="/images/rollingcodelogo.svg" alt="" className='w-96' />
      </div>
      <div className='grid  lg:grid-cols-2 gap-6 mt-6'>
        <div>
          <div className='pr-6'>
            <p className='font-medium text-xl text-[#126459]'>Objetivos del proyecto</p>
            <p>El objetivo de este proyecto es desarrollar una plataforma integral de gestión para Rolling Health, un grupo de centros médicos de todo el país, diseñada para servir a tres tipos de usuarios: administradores, médicos y pacientes. La plataforma tiene como meta centralizar y optimizar la gestión de citas, el historial médico de los pacientes, la administración de recursos del centro y la comunicación entre los diferentes usuarios.</p>
            <p className='font-medium text-xl text-[#126459] mt-4'>Descripción del proyecto</p>
            <p>El sistema será una aplicación web desarrollada con React para la interfaz de usuario y Zustand para la gestión del estado global de la aplicación. A continuación, se detalla el alcance y las funcionalidades que se implementarán para cada tipo de usuario.</p>
            <p className='font-medium text-xl text-[#126459] mt-4'>Implementación técnica</p>
            <ul>
              <li className='font-medium'>Frontend:</li>
              <li>React: Para el desarrollo de componentes de interfaz de usuario.</li>
              <li>Zustand: Para la gestión del estado global de la aplicación.</li>
              <li>React Router: Para la navegación y manejo de rutas.</li>
              <li>Tailwind CSS o Material-UI: Para estilos y componentes visuales.</li>
              <li>Axios: Para la comunicación con la API backend.</li>
              <li className='font-medium'>Despliegue:</li>
              <li>Vercel o Netlify: Para desplegar el frontend.</li>
            </ul>
            <p className='font-medium text-xl text-[#126459] mt-4'>Fecha de entrega:</p>
            <p>03 de Septiembre de 2024</p>
            <p className='font-medium text-xl text-[#126459] mt-4'>Lugar:</p>
            <p>Av. General Paz 576, Piso 9, oficina 2. San Miguel de Tucumán, Argentina</p>
          </div>
        </div>
        <div className=''>
          <p className='font-medium text-xl text-[#126459]'>Presentación</p>
          <p>Como alumno del curso de React.js Avanzado se deberá realizar un
            proyecto en React que será presentado ante una comisión
            evaluadora de RollingCode.
            La aplicación deberá presentar funcionalidades, metodologías e
            implementaciones vistas a lo largo del curso. Se evaluaran los siguientes
            puntos:
          </p>
          <ul className='list-disc ml-5 mt-4'>
            <li>Funcionalidad del Proyecto.</li>
            <li>Estructura del Proyecto, Archivos y legibilidad del código.</li>
            <li>Diseño Interfaz de Usuario.</li>
            <li>Manejo de Datos de Servicios Api Restful.</li>
            <li>Componetización.</li>
            <li>Creación de Custom Hooks.</li>
            <li>Manejo de estados globales y estados de componentes.</li>
          </ul>
          <p className='font-medium text-xl text-[#126459] mt-4'>Requisitos</p>
          <p>La aplicación debe estar realizada íntegramente con React.
            A tener en cuenta la comisión examinadora puede solicitar si lo considera
            el acceso al código de desarrollo en una de las máquinas de los alumnos
            para marcar mejoras a realizar.
            El tema seleccionado por el grupo para el desarrollo de la aplicación es
            libre.
            Como requisito obligatorio el desarrollo debe considerar los
            siguientes puntos:
          </p>
          <ul className='list-decimal ml-5 mt-4'>
            <li>Acceso y Registro de usuarios.</li>
            <li>Implementación de navegación con rutas básicas y protegidas.</li>
            <li>Implementación de componentes personalizados.</li>
            <li>Desarrollo de al menos 2 Custom Hooks.</li>
            <li>Uso de un gestor de estados Globales</li>
            <li>Diseño de la interfaz de usuarios con el framework de estilos aprendido.</li>
            <li>Implementación de datos con api desde un servicio externo</li>
            <li>Manejo de errores del lado del cliente.</li>
          </ul>
        </div>
      </div>
      <hr className="my-12  border-neutral-300" />
      <p className='text-3xl md:text-[60px] text-[#126459] font-bold text-center mb-6'>Muchas Gracias</p>
    </div>
  )
}
