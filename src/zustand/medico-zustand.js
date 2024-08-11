import { create } from 'zustand';
import axios from 'axios';
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;


const useMedicoStore = create((set) => ({
  medicos: [],
  medico: null,
  loading: false,
  error: null,


  getMedicos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(URI_USUARIOS);
      const medicos = response.data.filter((usuario) => usuario.role === 'Doctor');
      set({ medicos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  traerMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${URI_USUARIOS}/${id}`);
      set({ medico: response.data });
    } catch (error) {
      set({ error: 'Error al traer el medico' });
    } 
  },

  agregarMedico: async (nuevoMedico) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${URI_USUARIOS}/registrar`, nuevoMedico);
      set((state) => ({
        medicos: [...state.medicos, response.data],
      }));
    } catch (error) {
      set({ error: 'Error al agregar el medico' });
    } 
  },

  actualizarMedico: async (id, medicoActualizado) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${URI_USUARIOS}/${id}`, medicoActualizado)
      set((state) => ({
        medicos: state.medicos.map((medico) =>
          medico.id === id ? response.data : medico
        ),
      }));
    } catch (error) {
      set({ error: 'Error al actualizar el medico' });
    } 
  },

  eliminarMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URI_USUARIOS}/${id}`)
      set((state) => ({
        medicos: state.medicos.filter((medico) => medico.id !== id),
      }));
    } catch (error) {
      set({ error: 'Error al eliminar el medico' });
    } 
  },

}));

export default useMedicoStore;
