import { create } from 'zustand';
import axios from 'axios';
const URI_CENTROSMEDICOS = import.meta.env.VITE_API_CENTROSMEDICOS;


const useCentroMedicoStore = create((set) => ({
  centrosMedicos: [],
  centroMedico: null,
  centroMedicoTurnos: [],
  loading: false,
  error: null,


  getCentrosMedicos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(URI_CENTROSMEDICOS);
      const centrosMedicos = response.data;
      set({ centrosMedicos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  traerCentroMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${URI_CENTROSMEDICOS}/${id}`);
      set({ centroMedico: response.data, loading: false });
    } catch (error) {
      set({ error: 'Error al traer el centroMedico', loading: false });
    } 
  },

  getCentrosTurnos: async (idsCentros) => {
    set({ loading: true, error: null });
    try {
        const response = await axios.get(URI_CENTROSMEDICOS);
        const centrosMedicos = response.data;
        const centrosFiltrados = centrosMedicos.filter((centro) => idsCentros.includes(centro._id));
        set({
            centrosMedicos,
            centroMedicoTurnos: centrosFiltrados,
            loading: false,
        });
    } catch (error) {
        set({
            error: error.message || 'Error al traer los turnos',
            loading: false,
            centroMedicoTurnos: [],
        });
    }
},


  agregarCentroMedico: async (nuevocentroMedico) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${URI_CENTROSMEDICOS}`, nuevocentroMedico);
      set((state) => ({
        centrosMedicos: [...state.centrosMedicos, response.data],
        loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al agregar el centroMedico', loading: false });
    } 
  },

  actualizarCentroMedico: async (id, centroMedicoActualizado) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${URI_CENTROSMEDICOS}/${id}`, centroMedicoActualizado)
      set((state) => ({
        centrosMedicos: state.centrosMedicos.map((centroMedico) =>
          centroMedico._id === id ? response.data : centroMedico
        ),
        loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al actualizar el centroMedico', loading: false });
    } 
  },

  eliminarCentroMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URI_CENTROSMEDICOS}/${id}`)
      set((state) => ({
        centrosMedicos: state.centrosMedicos.filter((centroMedico) => centroMedico._id !== id),
        loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al eliminar el centroMedico' });
    } 
  },

}));

export default useCentroMedicoStore;
