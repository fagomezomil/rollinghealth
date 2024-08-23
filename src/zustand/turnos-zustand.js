import { create } from 'zustand';
import axios from 'axios';
const URI_TURNOS = import.meta.env.VITE_API_TURNOS;
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;
import { turnos } from "../utils/turnosData";


const useTurnosStore = create((set) => ({
  turnos: [],
  turno: null,
  turnosPaciente: null,
  loading: false,
  error: null,
  fechasDeshabilitadas: [],

  getTurnos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(URI_TURNOS);
      const turnos = response.data;
      set({ turnos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  traerTurno: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${URI_TURNOS}/${id}`);
      set({ turno: response.data });
    } catch (error) {
      set({ error: 'Error al traer el turno' });
    } 
  },


  getTurnosPaciente: async (idPaciente) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(URI_TURNOS);
      const turnos = response.data;
      set({
        turnos,
        turnosPaciente: turnos.filter((turno) => turno.paciente._id === idPaciente),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Error al traer los turnos',
        loading: false,
        turnosPaciente: [], 
      });
    }
  },

  agregarTurno: async (nuevoTurno) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${URI_TURNOS}`, nuevoTurno);
      set((state) => ({
        turnos: [...state.turnos, nuevoTurno],
      }));
    } catch (error) {
      set({ error: 'Error al agregar el turno' });
    } 
  },
  

  actualizarTurno: async (id, turnoActualizado) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${URI_TURNOS}/${id}`, turnoActualizado)
      set((state) => ({
        turnos: state.turnos.map((turno) =>
          turno._id === id ? response.data : turno
        ),
      }));
    } catch (error) {
      set({ error: 'Error al actualizar el turno' });
    } 
  },

  eliminarTurno: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URI_TURNOS}/${id}`)
      set((state) => ({
        turnos: state.turnos.filter((turno) => turno._id !== id),
      }));
    } catch (error) {
      set({ error: 'Error al eliminar el turno' });
    } 
  },

  getFechasDeshabilitadas: async(idMedico, horarios) => {
    set({ loading: true, error: null });
    try{
      const response = await axios.get(`${URI_USUARIOS}/${idMedico}`); 
      const atencion = response.data.atencion;
      let horariosTotales = [];
      if (atencion.includes("mañana")) {
        horariosTotales = turnos.morning;
      } else if (atencion.includes("tarde")) {
        horariosTotales = turnos.afternoon;
      }
      // Cuento horarios ocupados por fecha para un médico específico
      const fechasOcupadas = horarios.reduce((acc, horario) => {         
          if (horario.doctorId === idMedico) {
            if (acc[horario.fecha]) {
              acc[horario.fecha].push(horario.hora);
            } else {
              acc[horario.fecha] = [horario.hora];
            }
          }
          return acc;
      }, {});  
      // Filtro las fechas donde todos los horarios están ocupados y la seteo al estado
      const fechasDeshabilitadas = Object.keys(fechasOcupadas).filter(fecha => fechasOcupadas[fecha].length >= horariosTotales.length);   
      set({ fechasDeshabilitadas });
    }catch (error) {
      set({ error: 'Error al obtener fechas deshabilitadas'});
    }     
  }
}));



export default useTurnosStore;
