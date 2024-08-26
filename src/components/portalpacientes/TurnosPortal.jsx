import { IoArrowBackCircle } from "react-icons/io5";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { turnos } from "../../utils/turnosData";
import toast, { Toaster } from 'react-hot-toast';
import useCentroMedicoStore from "../../zustand/centroMedico-zustand.js";
import useMedicoStore from "../../zustand/medico-zustand.js";
import useTurnosStore from "../../zustand/turnos-zustand.js";
import useHorariosDisponibles from "../../hooks/useHorariosDisponibles";


export default function TurnosPortal({ setPortal, dataUsuario }) {
  const [centroMedicoSelected, setCentroMedicoSelected] = useState("");
  const [idCentroMedicoSelected, setIdCentroMedicoSelected] = useState("");
  const [especialidadSelected, setEspecialidadSelected] = useState("");
  const [medicoSelected, setMedicoSelected] = useState("");
  const [idMedicoSelected, setIdMedicoSelected] = useState("");
  const [fechaSelected, setFechaSelected] = useState("");
  const [horaSelected, setHoraSelected] = useState("");
  const [atencionSelected, setAtencionSelected] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const horariosBase = useHorariosDisponibles(atencionSelected, turnos);

  
  const { getCentrosMedicos, centrosMedicos} = useCentroMedicoStore(state =>({
    getCentrosMedicos : state.getCentrosMedicos,
    centrosMedicos : state.centrosMedicos
}));
  const { agregarTurno, getTurnosPaciente, getTurnos, turnosPaciente, allTurnos, getFechasDeshabilitadas, fechasDeshabilitadas } = useTurnosStore(state => ({
    agregarTurno: state.agregarTurno,
    getTurnos: state.getTurnos,
    getTurnosPaciente: state.getTurnosPaciente,
    turnosPaciente: state.turnosPaciente,
    allTurnos: state.turnos,
    getFechasDeshabilitadas: state.getFechasDeshabilitadas,
    fechasDeshabilitadas: state.fechasDeshabilitadas  
}));
  const { medicos, getMedicos} = useMedicoStore((state) => ({
    medicos: state.medicos,
    getMedicos: state.getMedicos
}));


  useEffect(() => {
    const getDatos = async () => {
      await getCentrosMedicos();
      await getMedicos();
      await getTurnos();
    };
    getDatos();
  }, [getCentrosMedicos, getMedicos, getTurnos]);

  const handleSelectCentro = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const centroElegido = selectedOption.getAttribute("data-name");
    const idCentroElegido = selectedOption.getAttribute("data-id");
    setCentroMedicoSelected(centroElegido);
    setIdCentroMedicoSelected(idCentroElegido);
  };

  const handleSelectEspecialidad = (especialidad) => {
    const especialidadElegida = especialidad;
    setEspecialidadSelected(especialidadElegida);
  };


  const horariosTurnos = allTurnos.map(turno => ({
    fecha: new Date(turno.fecha).toISOString().split('T')[0], 
    hora: turno.hora,
    doctorId: turno.doctor._id  
  }));


  const handleMedicoSelected = async (medico, id, atencion) => {
    const medicoElegido = medico;
    const idMedicoElegido = id;
    const atencionMedico = atencion;
    setMedicoSelected(medicoElegido);
    setIdMedicoSelected(idMedicoElegido);
    setAtencionSelected(atencionMedico);
    await getFechasDeshabilitadas(idMedicoElegido, horariosTurnos);    
};
  
  useEffect(() => {
      if (centroMedicoSelected) {       
        setEspecialidadSelected('');
      }
  }, [centroMedicoSelected]);
  
  
  useEffect(() => {
    if (medicoSelected) {      
      setFechaSelected('');
      setHoraSelected('');
    }
  }, [medicoSelected]);


  const handleFechaChange = (date) => {    
    const fechaSeleccionada = date;   
    const turnosEnFecha = allTurnos.filter(turno => {    
      const fechaTurno = new Date(turno.fecha);     
      return fechaTurno.toDateString() === fechaSeleccionada.toDateString();
    });   
    const horariosDisponiblesFiltrados = horariosBase.filter(hora => 
      !turnosEnFecha.some(turno => turno.hora === hora)
    );    
    setFechaSelected(fechaSeleccionada);
    setHorariosDisponibles(horariosDisponiblesFiltrados);
  };

  const handleHoraChange = (event) => {
    const horaElegida = event.target.value;
    setHoraSelected(horaElegida);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuevoTurno = {
      paciente: { _id: dataUsuario._id },
      doctor: { _id: idMedicoSelected },
      fecha: fechaSelected,
      hora: horaSelected,
      notas: "prueba",
    };

    try {
    const medicoYaReservado = turnosPaciente.some(turno => turno.doctor._id === idMedicoSelected);
      if (medicoYaReservado) {
        toast.error('El médico seleccionado ya tiene turnos reservados por Usted.');
      }else{ 
      await agregarTurno(nuevoTurno);
      await getTurnosPaciente(dataUsuario._id);
      toast.success("Turno guardado exitosamente");

      setTimeout(() => {
        setCentroMedicoSelected("");
        setMedicoSelected("");
        setFechaSelected("");
        setHoraSelected("");
        setPortal("MenuPortal");
      }, 2000)}
    } catch (error) {
      toast.error("Error al guardar el turno");
    }
  };


  const renderDayContents = (day, date) => {
    const isoFecha = date.toISOString().split('T')[0];
    const isDisabled = fechasDeshabilitadas.includes(isoFecha);
    const fechaPasada = date < new Date().setHours(0, 0, 0, 0);

    return (
      <div className="relative group">
        <span className={isDisabled && !fechaPasada ? "text-red-500" : ""}>
          {day}
        </span>
        {isDisabled && !fechaPasada && (
          <span className="absolute hidden group-hover:block bg-red-500 text-white text-xs rounded px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2">
            Turnos no disponibles en esta fecha
          </span>
        )}
      </div>
    );
  };


  return (
    <div className="">
      <p className="text-[50px] text-[#126459] font-base leading-[55px]">
        Portal Paciente
      </p>
      <p className="text-[50px] text-[#126459] font-bold mb-6">
        Gestión de Turnos
      </p>
      <div className="flex flex-col lg:flex-row items-start lg:items-center">
        <div className="flex items-center justify-center">
          <p className="num-gestion-turno">01</p>
          <p className="opt-gestion-turno">
            Elija su Centro Médico más cercano:
          </p>
        </div>
        <select
          className="select-centros"
          value={centroMedicoSelected}
          onChange={handleSelectCentro}
        >
          <option value="">Seleccione un centro médico</option>
          {centrosMedicos.map((centro, index) => (
            <option
              key={`${centro.name}-${index}`}
              value={centro.name}
              data-name={centro.name}
              data-id={centro._id}
              className="flex mb-6"
            >
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
            <p className="opt-gestion-turno">
              Filtre su búsqueda por especialidad:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {centrosMedicos.find(
              (centro) => centro.name === centroMedicoSelected
            ) ? (
              centrosMedicos
                .find((centro) => centro.name === centroMedicoSelected)
                .specialties.map((especialidad) => (
                  <button
                    key={especialidad}
                    onClick={() => handleSelectEspecialidad(especialidad)}
                    className={`${
                      especialidadSelected === especialidad
                        ? "bg-[#126459] text-white"
                        : "bg-white text-[#126459]"
                    }
                      w-full text-lg text-center font-semibold text-[#126459] border-2 border-[#126459] py-2 px-4 rounded-lg`}
                  >
                    {especialidad}
                  </button>
                ))
            ) : (
              <p className="text-continuar">
                Debe seleccionar un Centro Médico para continuar
              </p>
            )}
          </div>
        </div>
      </div>
      <hr className="my-8 " />
      <div className="flex flex-col">
        <div className="flex items-center mb-6">
          <p className="num-gestion-turno">03</p>
          <p className="opt-gestion-turno">
            Seleccione su médico y registre el turno:
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          { centroMedicoSelected && especialidadSelected
              ? (
                medicos.filter((medico) => medico.speciality === especialidadSelected
                  && medico.centroMedico === idCentroMedicoSelected).length > 0 
                ? medicos.filter((medico) => medico.speciality === especialidadSelected
                  && medico.centroMedico === idCentroMedicoSelected)
                  .map((medico) => (
                <div
                  key={medico._id}
                  onClick={() =>
                    handleMedicoSelected(
                      medico.name,
                      medico._id,
                      medico.atencion
                    )
                  }
                  className={`${
                    medicoSelected === medico.name
                      ? "col-span-1 lg:col-span-2 row-span-3 h-full bg-[#0c423b]"
                      : "cursor-pointer bg-[#126459]"
                  }
                       p-4 text-white rounded-lg relative`}
                >
                  <div className="flex items-center ">
                    <div className="flex flex-col md:flex-row">
                      <img src={medico.img} className="img-doc-turno" alt="" />
                      <div className="w-full">
                        <p className="text-xl font-bold">{medico.name}</p>
                        <p className="text-lg">{medico.specialty}</p>
                      </div>
                      {medicoSelected === medico.name && (
                        <p className="italic text-lg pr-10">{medico.bio}</p>
                      )}
                    </div>
                  </div>
                  {medicoSelected === medico.name && (
                    <div>
                      <div>
                        <hr className="mt-4 mb-2 border-white" />
                        <p className="text-xl font-medium">
                          Horarios de atención: turno {medico.atencion}
                        </p>
                        <hr className="my-4 border-white" />
                      </div>
                      <div className="bg-neutral-500 rounded-lg py-4 px-8 flex flex-col lg:flex-row items-start lg:items-center w-full">
                        <p className="text-white w-fit text-xl mr-4">
                          Elija fecha del turno para continuar
                        </p>                       
                        <DatePicker
                          showIcon
                          selected={fechaSelected ? new Date(fechaSelected) : null}
                          onChange={handleFechaChange}
                          filterDate={(date) => {
                            const isoFecha = date.toISOString().split('T')[0];
                            const isDisabled = fechasDeshabilitadas.includes(isoFecha);
                            const fechaPasada = date < new Date().setHours(0, 0, 0, 0);                            
                            return !fechaPasada && !isDisabled && (date.getDay() !== 0 && date.getDay() !== 6);
                          }}
                          dateFormat="dd/MM/yyyy"
                          minDate={new Date()} 
                          className="text-neutral-700 font-semibold text-lg rounded-lg p-2 text-center"
                          closeOnScroll={true}
                          renderDayContents={renderDayContents}
                        />
                      </div>
                      {fechaSelected !== "" && medicoSelected ? (
                        <div className="bg-neutral-100 mt-4 p-2 rounded-lg flex  flex-col lg:flex-row items-start lg:items-center lg:space-x-4">
                          <p className="text-xl font-semibold ml-6 text-[#126459] mb-4 md:mb-0">
                            Elegir horario y reservar turno
                          </p>
                          <div className="flex flex-col md:flex-row w-full my-4">
                            <select
                              className="rounded-lg p-4 text-lg font-semibold text-white bg-neutral-500"
                              value={horaSelected}
                              onChange={handleHoraChange}
                            >
                              <option value="">Seleccione horario</option>
                              {horariosDisponibles.map((turno) => (
                                <option key={turno} value={turno}>
                                  {turno}
                                </option>
                              ))}
                            </select>
                            <form onSubmit={handleSubmit}>
                              <button className="ml-0 md:ml-4 mt-4 md:mt-0 py-4 px-8 rounded-lg text-base font-semibold text-white uppercase bg-[#0c423b]">
                                Confirmar Turno
                              </button>
                            </form>
                            <Toaster />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                  <FaPlusCircle className="text-3xl absolute top-3 right-4" />
                </div>
             ))
                : <p className="text-xl font-semibold text-red-600">No hay médicos disponibles para el centro médico y especialidad seleccionados.</p>
              )
              : <p className="text-continuar">Debe seleccionar una especialidad médica para continuar</p>
          }
        </div>
      </div>
      <button
        onClick={() => setPortal("MenuPortal")}
        className="w-full flex items-center text-xl text-neutral-400 mt-10"
      >
        <IoArrowBackCircle className="text-4xl mr-6" />
        <p>Volver</p>
      </button>
    </div>
  );
}