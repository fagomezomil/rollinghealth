import { create } from 'zustand';
import axios from 'axios';
const URI_CENTROSMEDICOS = import.meta.env.VITE_API_CENTROSMEDICOS;


const useCentroMedicoStore = create((set) => ({
  centrosMedicos: [],
  centroMedico: null,
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
      set({ centroMedico: response.data });
    } catch (error) {
      set({ error: 'Error al traer el centroMedico' });
    } 
  },

  agregarCentroMedico: async (nuevocentroMedico) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${URI_CENTROSMEDICOS}`, nuevocentroMedico);
      set((state) => ({
        centrosMedicos: [...state.centrosMedicos, response.data],
      }));
    } catch (error) {
      set({ error: 'Error al agregar el centroMedico' });
    } 
  },

  actualizarCentroMedico: async (id, centroMedicoActualizado) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${URI_CENTROSMEDICOS}/${id}`, centroMedicoActualizado)
      set((state) => ({
        centrosMedicos: state.centrosMedicos.map((centroMedico) =>
          centroMedico.id === id ? response.data : centroMedico
        ),
      }));
    } catch (error) {
      set({ error: 'Error al actualizar el centroMedico' });
    } 
  },

  eliminarCentroMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URI_CENTROSMEDICOS}/${id}`)
      set((state) => ({
        centrosMedicos: state.centrosMedicos.filter((centroMedico) => centroMedico.id !== id),
      }));
    } catch (error) {
      set({ error: 'Error al eliminar el centroMedico' });
    } 
  },

}));

export default useCentroMedicoStore;