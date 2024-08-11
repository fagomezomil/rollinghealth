import { create } from 'zustand';
import axios from 'axios';
const URI_TURNOS = import.meta.env.VITE_API_TURNOS;


const useTurnosStore = create((set) => ({
  turnos: [],
  turno: null,
  turnosPaciente: null,
  loading: false,
  error: null,


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
      const response = await axios.post(`${URI_TURNOS}`, nuevoTurno);
      set((state) => ({
        turnos: [...state.turnos, response.data],
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
          turno.id === id ? response.data : turno
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
        turnos: state.turnos.filter((turno) => turno.id !== id),
      }));
    } catch (error) {
      set({ error: 'Error al eliminar el turno' });
    } 
  },

}));

export default useTurnosStore;
