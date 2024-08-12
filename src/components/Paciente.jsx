import { useState } from 'react';
import MenuPortal from './portalpacientes/MenuPortal';
import SidePortal from './portalpacientes/SidePortal';
import TurnosPortal from './portalpacientes/TurnosPortal';

import { useEffect } from 'react';
import useTurnosStore from "../zustand/turnos-zustand.js";
import usePacienteStore from "../zustand/paciente-zustand.js";

export default function Paciente() {
    const [portal, setPortal] = useState("MenuPortal")
    const [turnos, setTurnos] =  useState([]);
    const { getTurnosPaciente, turnosPaciente}= useTurnosStore((state) => 
        ({
            getTurnosPaciente: state.getTurnosPaciente,
            getTurnos: state.getTurnos,          
            turnosPaciente: state.turnosPaciente,           
          }));      
    const { paciente, traerPaciente} = usePacienteStore((state) => ({
        traerPaciente: state.traerPaciente,
        paciente: state.paciente,
    }));
 
    useEffect(() => {
        const getDatos = async () => {
            await  getTurnosPaciente("66b695969eeea75cf7534bb3");
            await traerPaciente("66b695969eeea75cf7534bb3");//aqui hay que pasarle el _id del paciente logueado
            setTurnos[turnosPaciente];
        };

        getDatos();
    }, [getTurnosPaciente, traerPaciente, turnosPaciente, turnos]);   

    const cantidadTurnos = Array.isArray(turnosPaciente) ? turnosPaciente.length : 0;

    return (
        <div className='mt-20 grid grid-cols-12'>
            <SidePortal  setPortal={setPortal} portal={portal} cantidadTurnos={cantidadTurnos} paciente={paciente}/>
            <div className="col-span-12 xl:col-span-8 p-10 ">
                {   portal === "MenuPortal" ?
                    <MenuPortal setPortal={setPortal} portal={portal} />
                    : ""
                }
                {
                    portal === "TurnosPortal" ?
                    <TurnosPortal setPortal={setPortal} portal={portal} />
                    : ""
                }
            </div>
        </div>
    )
}
