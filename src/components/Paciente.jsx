import { useState, useEffect, useCallback } from 'react';
import MenuPortal from './portalpacientes/MenuPortal';
import SidePortal from './portalpacientes/SidePortal';
import TurnosPortal from './portalpacientes/TurnosPortal';

import useTurnosStore from "../zustand/turnos-zustand.js";
import usePacienteStore from "../zustand/paciente-zustand.js";
import useCentroMedicoStore from '../zustand/centroMedico-zustand.js';
import useMedicoStore from '../zustand/medico-zustand';

export default function Paciente() {
    const [portal, setPortal] = useState("MenuPortal");
    const [medicoTurnos, setMedicoTurnos] = useState([]);
    const [centroTurnos, setCentroTurnos] = useState([]);
    const [medicos, setMedicos] = useState([]); 

    const { getTurnosPaciente, turnosPaciente } = useTurnosStore(state => ({
        getTurnosPaciente: state.getTurnosPaciente,
        turnosPaciente: state.turnosPaciente,
    }));

    const { paciente, traerPaciente } = usePacienteStore(state => ({
        traerPaciente: state.traerPaciente,
        paciente: state.paciente,
    }));

    const { getCentrosTurnos, centroMedicoTurnos } = useCentroMedicoStore(state => ({
        getCentrosTurnos: state.getCentrosTurnos,
        centroMedicoTurnos: state.centroMedicoTurnos,
    }));

    const { getCentrosByMedicosIds, idMedicoCentro, traerMedico } = useMedicoStore(state => ({
        getCentrosByMedicosIds: state.getCentrosByMedicosIds,
        idMedicoCentro: state.idMedicoCentro,
        traerMedico: state.traerMedico,
    }));


    const getDatos = useCallback(async () => {
        try {
            await getTurnosPaciente("66b695969eeea75cf7534bb3"); //cambiar por id de usuario logueado
            await traerPaciente("66b695969eeea75cf7534bb3");
        } catch (error) {
            console.error("Error al obtener datos del paciente:", error);
        }
    }, [getTurnosPaciente, traerPaciente]);

    useEffect(() => {
        getDatos();
    }, [getDatos]);

    useEffect(() => {
        const getDataMedicos = async () => {
            try {
                const doctorIds = [];
                turnosPaciente.forEach(turno => {
                    if (turno.doctor && !doctorIds.includes(turno.doctor._id)) {
                        doctorIds.push(turno.doctor._id);
                    }
                });
                setMedicoTurnos(doctorIds);
                console.log('Doctor IDs:', doctorIds);
            
                const medicosData = [];
                for (const id of doctorIds) {
                    await traerMedico(id);
                    const medicoData = useMedicoStore.getState().medico;
                    medicosData.push(medicoData);
                }
                setMedicos(medicosData); 
                await getCentrosByMedicosIds(doctorIds);
            } catch (error) {
                console.error("Error al obtener datos de médicos:", error);
            }
        };

        if (turnosPaciente?.length > 0) {
            getDataMedicos();
        }
    }, [turnosPaciente, getCentrosByMedicosIds, traerMedico]);

    useEffect(() => {
        const getCentros = async () => {
            if (idMedicoCentro?.length > 0) { 
                setCentroTurnos(idMedicoCentro);
                await getCentrosTurnos(idMedicoCentro);
            }
        };

        if (idMedicoCentro?.length > 0) {
            getCentros();
        }
    }, [idMedicoCentro, getCentrosTurnos]);

    const cantidadTurnos = Array.isArray(turnosPaciente) ? turnosPaciente.length : 0;
    const turnosPacienteMenu = Array.isArray(turnosPaciente) ? turnosPaciente : [];

    console.log("Turnos Paciente:", turnosPaciente);
    console.log("id Medico Turnos:", medicoTurnos);
    console.log("id Centro Medico Turnos:", idMedicoCentro);
    console.log("datos Centro Medico turnos:", centroMedicoTurnos);
    console.log("Datos de Médicos:", medicos); 

    return (
        <div className='mt-20 grid grid-cols-12'>
            <SidePortal setPortal={setPortal} portal={portal} cantidadTurnos={cantidadTurnos} paciente={paciente} />
            <div className="col-span-12 xl:col-span-8 p-10 ">
                {portal === "MenuPortal" && <MenuPortal setPortal={setPortal} portal={portal}  cantidadTurnos={cantidadTurnos} turnosPaciente={turnosPacienteMenu} centroMedicoTurnos={centroMedicoTurnos} medicos={medicos} />}
                {portal === "TurnosPortal" && <TurnosPortal setPortal={setPortal} portal={portal} />}
            </div>
        </div>
    );
}
