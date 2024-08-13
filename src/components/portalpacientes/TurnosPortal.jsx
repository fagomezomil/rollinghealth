import { IoArrowBackCircle } from "react-icons/io5";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { turnos } from "../../utils/turnosData";

import useCentroMedicoStore from "../../zustand/centroMedico-zustand.js";
import useMedicoStore from "../../zustand/medico-zustand.js";
import useTurnosStore from "../../zustand/turnos-zustand.js";


export default function TurnosPortal({ setPortal }) {

  const [centroMedicoSelected, setCentroMedicoSelected] = useState('');
  //const [idCentroMedicoSelected, setIdCentroMedicoSelected] = useState('');
  const [especialidadSelected, setEspecialidadSelected] = useState('');
  const [medicoSelected, setMedicoSelected] = useState('');
  const [idMedicoSelected, setIdMedicoSelected] = useState('');
  const [fechaSelected, setFechaSelected] = useState('');
  const [horaSelected, setHoraSelected] = useState('');

  const centrosMedicos = useCentroMedicoStore((state) => state.centrosMedicos);
  const getCentrosMedicos = useCentroMedicoStore((state) => state.getCentrosMedicos);
  const medicos = useMedicoStore((state) => state.medicos);
  const getMedicos = useMedicoStore((state) => state.getMedicos);
  //aqui tambien hay que traer _id (pacienteSelectedId) del paciente logueado para ingresarlo en el turno!
  const agregarTurno= useTurnosStore((state) => state.agregarTurno);
  const getTurnos= useTurnosStore((state) => state.getTurnos);
  const getTurnosPaciente = useTurnosStore((state) => state.getTurnosPaciente);

  

  useEffect(() => {
    const getDatos = async () => {
      await getCentrosMedicos();
      await getMedicos();
      await getTurnos();
    };
    getDatos();
  }, [getCentrosMedicos, getMedicos, getTurnos])


  const handleSelectCentro = (event) => {
    const centroElegido = event.target.value;
    setCentroMedicoSelected(centroElegido);
    //setIdCentroMedicoSelected(centroMedicoSelected.id);   
};

  const handleSelectEspecialidad = (especialidad) => {
    const especialidadElegida = especialidad;
    setEspecialidadSelected(especialidadElegida);   
  };

  const handleMedicoSelected = (medico, id) => {
    const medicoElegido = medico;
    const idMedicoElegido = id;
    setMedicoSelected(medicoElegido);
    setIdMedicoSelected(idMedicoElegido);
  };

  const handleFechaChange = (event) => {
    const fechaElegida = event.target.value;
    setFechaSelected(fechaElegida);
  };


  const handleHoraChange = (event) => {
    const horaElegida = event.target.value;
    setHoraSelected(horaElegida); 
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuevoTurno = {
      paciente: { _id: "66b695969eeea75cf7534bb3"},  //aqui va el _id del paciente logueado
      doctor: { _id: idMedicoSelected },      
      fecha: fechaSelected,                  
      hora: horaSelected,                     
      notas: "prueba"
    }
    await agregarTurno(nuevoTurno);   
    await getTurnosPaciente("66b695969eeea75cf7534bb3"); //aqui va el _id del paciente logueado
    alert('Turno guardado exitosamente');
    setCentroMedicoSelected('');
    setMedicoSelected('');
    setFechaSelected('');
    setHoraSelected(''); 
    setPortal("MenuPortal");
    
  } 


  return (
    <div className="">
      <p className="text-[50px] text-[#126459] font-base leading-[55px]">Portal Paciente</p>
      <p className="text-[50px] text-[#126459] font-bold mb-6">Gestión de Turnos</p>
      <div className="flex flex-col lg:flex-row items-start lg:items-center">
        <div className="flex items-center justify-center">
          <p className="num-gestion-turno">01</p>
          <p className="opt-gestion-turno">Elija su Centro Médico más cercano:</p>
        </div>
        <select className="select-centros"
          value={centroMedicoSelected} onChange={handleSelectCentro}>
          <option value="">Seleccione un centro médico</option>
          {centrosMedicos.map((centro, index) => (
            <option key={`${centro.name}-${index}`} value={centro.name} className="flex mb-6">
              {centro.name}
            </option>
          ))}
        </select>
      </div>
      <hr className="my-8 " />
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex items-center mb-6">
            <p className="num-gestion-turno">02</p>
            <p className="opt-gestion-turno">Filtre su búsqueda por especialidad:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {
              centrosMedicos.find((centro) => centro.name === centroMedicoSelected)
                ? centrosMedicos.find((centro) => centro.name === centroMedicoSelected).specialties.map((especialidad) => (
                  <button
                    key={especialidad}
                    onClick={() => handleSelectEspecialidad(especialidad)}
                    className={`${especialidadSelected === especialidad ?
                      "bg-[#126459] text-white" : "bg-white text-[#126459]"}
                      w-full text-lg text-center font-semibold text-[#126459] border-2 border-[#126459] py-2 px-4 rounded-lg`}>
                    {especialidad}
                  </button>
                ))
                : <p className="text-continuar">Debe seleccionar un Centro Médico para continuar</p>
            }
          </div>
        </div>

      </div>
      <hr className="my-8 " />
      <div className="flex flex-col">
        <div className="flex items-center mb-6">
          <p className="num-gestion-turno">03</p>
          <p className="opt-gestion-turno">Seleccione su médico y registre el turno:</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {
            centroMedicoSelected && especialidadSelected
              ? medicos.filter((medico) => medico.speciality === especialidadSelected)
              //&&  medico.centroMedico === idCentroMedicoSelected)
                .map((medico) => (
                  <div
                    key={medico._id}
                    onClick={() => handleMedicoSelected(medico.name, medico._id)}
                    className={`${medicoSelected === medico.name ? "col-span-1 lg:col-span-2 row-span-3 h-full bg-[#0c423b]" : "cursor-pointer bg-[#126459]"}
                       p-4 text-white rounded-lg relative`}>
                    <div className="flex items-center ">
                      <div className="flex flex-col md:flex-row">
                        <img src={medico.img} className="img-doc-turno" alt="" />
                        <div className="w-full">
                          <p className="text-xl font-bold">{medico.name}</p>
                          <p className="text-lg">{medico.specialty}</p>
                        </div>
                        {
                          medicoSelected === medico.name &&
                          <p className="italic text-lg pr-10">
                            {medico.bio}
                          </p>
                        }
                      </div>
                    </div>
                    {
                      medicoSelected === medico.name &&
                      <div>
                        <div>
                          <hr className="mt-4 mb-2 border-white" />
                          <p className="text-xl font-medium">Horarios de atención: turno {medico.atencion}</p>
                          <hr className="my-4 border-white" />
                        </div>
                        <div className="bg-neutral-500 rounded-lg py-4 px-8 flex flex-col lg:flex-row items-start lg:items-center w-full">
                          <p className="text-white w-fit text-xl mr-4">Elija fecha del turno para continuar</p>
                          <input type="date"
                            name="FechaTurno"
                            value={fechaSelected}
                            onChange={handleFechaChange}
                            className="text-neutral-700 font-semibold text-lg rounded-lg p-2" />
                        </div>
                        {
                          fechaSelected !== "" && medicoSelected ?
                            <div className="bg-neutral-100 mt-4 p-2 rounded-lg flex  flex-col lg:flex-row items-start lg:items-center lg:space-x-4">
                              <p className="text-xl font-semibold ml-6 text-[#126459] mb-4 md:mb-0">Elegir horario y reservar turno</p>
                              <div className="flex flex-col md:flex-row w-full my-4">
                                <select className="rounded-lg p-4 text-lg font-semibold text-white bg-neutral-500"
                                value={horaSelected} onChange={handleHoraChange}>
                                  {
                                    turnos.morning.map((turno) => (
                                      <option key={turno} value={turno}>
                                        {turno}
                                      </option>

                                    ))
                                  }
                                </select>
                                <form onSubmit={handleSubmit}>
                                  <button className="ml-0 md:ml-4 mt-4 md:mt-0 py-4 px-8 rounded-lg text-base font-semibold text-white uppercase bg-[#0c423b]">Confirmar Turno</button>
                                </form>
                              </div>
                            </div>
                            : null
                        }
                      </div>
                    }
                    <FaPlusCircle className="text-3xl absolute top-3 right-4" />
                  </div>
                ))
              : <p className="text-continuar">Debe seleccionar una especialidad médica para continuar</p>
          }
        </div>
      </div>
      <button
        onClick={() => setPortal("MenuPortal")}
        className='w-full flex items-center text-xl text-neutral-400 mt-10'>
        <IoArrowBackCircle className='text-4xl mr-6 ' />
        <p>Volver</p>
      </button>
    </div>
  );
}