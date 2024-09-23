import { create } from 'zustand';
import axios from 'axios';
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;


const useMedicoStore = create((set) => ({
  medicos: [],
  medico: null,
  loading: false,
  error: null,
  idMedicoCentro: [],


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
      set({ medico: response.data, loading: false });
    } catch (error) {
      set({ error: 'Error al traer el medico', loading: false });
    } 
  },

  getCentrosByMedicosIds: async (idsMedicos) => {
    set({ loading: true, error: null });
    try {        
        const response = await axios.get(URI_USUARIOS); 
        const medicos = response.data;        
        const medicosFiltrados = medicos.filter((medico) => idsMedicos.includes(medico._id));
        const idsCentrosMedicos = medicosFiltrados.map((medico) => medico.centroMedico);     
        const unicosCentrosMedicos = [...new Set(idsCentrosMedicos)];
        set({
            idMedicoCentro: unicosCentrosMedicos,
            loading: false,
        });
    } catch (error) {
        set({
            error: error.message || 'Error al obtener los centros médicos',
            loading: false,
            idMedicoCentro: [],
        });
    }
},


  agregarMedico: async (nuevoMedico) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${URI_USUARIOS}/registrar`, nuevoMedico);
      set((state) => ({
        medicos: [...state.medicos, nuevoMedico],
        loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al agregar el medico', loading: false });
    } 
  },

  actualizarMedico: async (id, medicoActualizado) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${URI_USUARIOS}/${id}`, medicoActualizado)
      set((state) => ({
        medicos: state.medicos.map((medico) =>
          medico._id === id ? response.data : medico
        ), loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al actualizar el medico', loading: false });
    } 
  },

  eliminarMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URI_USUARIOS}/${id}`)
      set((state) => ({
        medicos: state.medicos.filter((medico) => medico._id !== id),
        loading: false}
      ));
    } catch (error) {
      set({ error: 'Error al eliminar el medico', loading: false });
    } 
  },

}));

export default useMedicoStore;
