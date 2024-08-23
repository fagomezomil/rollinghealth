import { useState, useEffect } from "react";

function useHorariosDisponibles(atencion, turnos) {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  useEffect(() => {
    if (atencion) {
      const obtenerHorarios = () => {
        if (atencion.includes("mañana")) {
          return turnos.morning;
        } else if (atencion.includes("tarde")) {
          return turnos.afternoon;
        } else {
          return [];
        }
      };

      const horarios = obtenerHorarios();
      setHorariosDisponibles(horarios);
    }
  }, [atencion, turnos]);

  return horariosDisponibles;
}

export default useHorariosDisponibles;
