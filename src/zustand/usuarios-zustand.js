import { create } from 'zustand';
import axios from 'axios';
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;

const useUsersStore = create((set) => ({
  usuarios: [],
  loading: true,
  error: null,
  isErrorEdit: false,
  isLoadingEdit: false,

  getUsuarios: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${URI_USUARIOS}`);
      const quitarAdmin = data.filter(
        (usuario) => usuario.role !== 'Administrador'
      );
      set({ usuarios: quitarAdmin });
      return data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  guardarListaUsuarios: (data) => {
    set({ usuarios: data });
  },
  editarUsuario: async (dataForm, id) => {
    set({ isLoadingEdit: true });
    try {
      const { data } = await axios.put(`${URI_USUARIOS}/${id}`, dataForm);
      return data;
    } catch (error) {
      set({ isErrorEdit: true });
    } finally {
      set({ isLoadingEdit: false });
    }
  },
  limpiarError: set({ isErrorEdit: false }),
}));

export default useUsersStore;
