import { create } from 'zustand';
import axios from 'axios';
const URI_LOGIN = import.meta.env.VITE_API_LOGIN;
import { persist } from 'zustand/middleware';

const useUsuarioStore = create(
  persist((set) => ({
    dataUsuario: null,
    isLoading: false,
    error: false,

    postLogin: async (dataForm) => {
      set({ isLoading: true, error: null });
      try {
        const { data } = await axios.post(URI_LOGIN, dataForm);
        set({ dataUsuario: data });
        return data;
      } catch (error) {
        set({ error: true });
      } finally {
        set({ isLoading: false });
      }
    },
    postLogout: async () => {
      set({ isLoading: true, error: null });
      try {
        set({ dataUsuario: null });
        localStorage.removeItem('user-storage');
      } catch (error) {
        set({ error: true , loading: false });
      }
    },
  }),  
  {
    name: 'user-storage'    
  })
);

export default useUsuarioStore;
