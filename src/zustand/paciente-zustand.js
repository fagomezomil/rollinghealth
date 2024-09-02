import { create } from 'zustand';
import axios from 'axios';
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;


const usePacienteStore = create((set) => ({
  pacientes: [],
  paciente: null,
  loading: false,
  error: null,
  pacientesTurnosDoctor: [],


  getPacientes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(URI_USUARIOS);
      const pacientes = response.data.filter((usuario) => usuario.role === 'Paciente');
      set({ pacientes, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  traerPaciente: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${URI_USUARIOS}/${id}`);
      set({ paciente: response.data, loading: false });
    } catch (error) {
      set({ error: 'Error al traer el paciente', loading: false });
    } 
  },

  agregarPaciente: async (nuevoPaciente) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${URI_USUARIOS}/registrar`, nuevoPaciente);
      set((state) => ({
        pacientes: [...state.pacientes, response.data],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al agregar el paciente', loading: false });
    } 
  },

  actualizarPaciente: async (id, pacienteActualizado) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${URI_USUARIOS}/${id}`, pacienteActualizado)
      set((state) => ({
        pacientes: state.pacientes.map((paciente) =>
          paciente._id === id ? response.data : paciente
        ), loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al actualizar el paciente', loading: false });
    } 
  },

  eliminarPaciente: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URI_USUARIOS}/${id}`)
      set((state) => ({
        pacientes: state.pacientes.filter((paciente) => paciente._id !== id),
        loading: false }));
    } catch (error) {
      set({ error: 'Error al eliminar el paciente' });
    } 
  },

  getPacientesTurnosDoctor: async (ids) => {
    set({ loading: true, error: null });
    try {      
      const idsPacientes = Array.from(new Set(ids));     
      const responses = await Promise.all(
        idsPacientes.map(id => axios.get(`${URI_USUARIOS}/${id}`))
      );      
      const pacientesTurnosDoctor = responses.map(response => response.data);      
      set({ pacientesTurnosDoctor, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }

}));

export default usePacienteStore;
