import { create } from 'zustand';
import axios from 'axios';
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;

const useUsersStore = create((set) => ({
  usuarios: [],
  loading: true,
  error: null,

  getUsuarios: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${URI_USUARIOS}usuarios`);
      const quitarAdmin = data.filter(usuario => usuario.role !== 'Administrador');
      set({ usuarios: quitarAdmin });
      return data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  guardarListaUsuarios: (data) => {
    set({usuarios: data})
  },
}));

export default useUsersStore;
