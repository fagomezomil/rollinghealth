import { IoArrowBackCircle } from "react-icons/io5";
import { centrosMedicos } from "../../utils/centroMedicosData";
import { useState } from "react";
import { medicos } from "../../utils/medicosData";
import { FaPlusCircle } from "react-icons/fa";
import { turnos } from "../../utils/turnosData"

export default function TurnosPortal({ setPortal }) {

  const [centroMedicoSelected, setCentroMedicoSelected] = useState('');
  const [especialidadSelected, setEspecialidadSelected] = useState('');
  const [medicoSelected, setMedicoSelected] = useState('');
  const [fechaSelected, setFechaSelected] = useState('');

  const handleSelectCentro = (event) => {
    setCentroMedicoSelected(event.target.value);
  };

  const handleSelectEspecialidad = (especialidad) => {
    setEspecialidadSelected(especialidad);
  };

  const handleFechaChange = (event) => {
    setFechaSelected(event.target.value);
  };

  console.log(fechaSelected)

  return (
    <div className="">
      <p className="text-[50px] text-[#126459] font-base leading-[55px]">Portal Paciente</p>
      <p className="text-[50px] text-[#126459] font-bold mb-6">Gestión de Turnos</p>
      <div className="flex items-center">
        <div className="flex items-center justify-center">
          <p className="num-gestion-turno">01</p>
          <p className="opt-gestion-turno">Elija su Centro Médico más cercano:</p>
        </div>
        <select className="select-centros"
          value={centroMedicoSelected} onChange={handleSelectCentro}>
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
          <div className="grid grid-cols-5 gap-4 items-center">
            {
              centrosMedicos.find((centro) => centro.name === centroMedicoSelected)
                ? centrosMedicos.find((centro) => centro.name === centroMedicoSelected).specialty.map((especialidad) => (
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
        <div className="grid grid-cols-3 gap-4">
          {
            // no pude hacer que filtre la especialidad y el centro medico
            centroMedicoSelected && especialidadSelected
              ? medicos.filter((medico) => medico.specialty === especialidadSelected)
                .map((medico) => (
                  <div
                    key={medico.name}
                    onClick={() => setMedicoSelected(medico.name)}
                    className={`${medicoSelected === medico.name ? "col-span-2 row-span-3 h-full bg-[#0c423b]" : "cursor-pointer bg-[#126459]"}
                       p-4 text-white rounded-lg relative`}>
                    <div className="flex items-center ">
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
                    {
                      medicoSelected === medico.name &&
                      <div>
                        <div>
                          <hr className="mt-4 mb-2 border-white" />
                          <p className="text-xl font-medium">Horarios de atención: turno {medico.atencion}</p>
                          <hr className="my-4 border-white" />
                        </div>
                        <div className="bg-neutral-500 rounded-lg py-4 px-8 flex items-center w-fit">
                          <p className="text-white w-fit text-xl mr-4">Elija fecha del turno para continuar</p>
                          <input type="date"
                            name="FechaTurno"
                            onChange={handleFechaChange}
                            className="text-neutral-700 font-semibold text-lg rounded-lg p-2" />
                        </div>
                        {
                          fechaSelected !== "" && medicoSelected ?
                            <div className="bg-neutral-100 mt-4 p-2 rounded-lg flex items-center space-x-4">
                              <p className="text-xl font-semibold ml-6 text-[#126459]">Elegir horario y reservar turno</p>
                              <select className="grid grid-cols-4 rounded-lg p-4 text-lg font-semibold text-white bg-neutral-500">
                                {
                                  turnos.morning.map((turno) => (
                                    <option key={turno} value={turno}>
                                      {turno}
                                    </option>

                                  ))
                                }
                              </select>
                              <button className="py-4 px-8 rounded-lg text-lg font-semibold text-white uppercase bg-[#0c423b]">Confirmar Turno</button>
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