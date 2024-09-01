import { create } from 'zustand';
import axios from 'axios';
const URI_LOGIN = import.meta.env.VITE_API_LOGIN;
import { persist } from 'zustand/middleware';
const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS;


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
      } finally {
        set({ isLoading: false });
      }
    },
    actualizarImagenPerfil: async (userId, image) => {
      try {
        const {data} = await axios.put(`${URI_USUARIOS}/${userId}`,{ img: image });     
        set((state) => ({
          dataUsuario: {
            ...state.dataUsuario, 
            img: data.img, 
          },
        }));
      } catch (error) {
        console.error('Error al actualizar la imagen de perfil:', error);
      }
    },
    getDataUsuario: async (userId) => {
      try {
        const { data } = await axios.get(`${URI_USUARIOS}/${userId}`);
        set(({ dataUsuario: data
        }));
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    },
    eliminarImagenPerfil: async (userId) => {
      try {
        await axios.put(`${URI_USUARIOS}/${userId}`, { img: '' });
        set((state) => ({
          dataUsuario: {
            ...state.dataUsuario,
            img: '',
          },
        }));
      } catch (error) {
        console.error('Error al eliminar la imagen de perfil:', error);
      }
    },
  }),  
  {
    name: 'user-storage'    
  })
);

export default useUsuarioStore;
