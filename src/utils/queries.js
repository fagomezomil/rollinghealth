import axios from "axios"

const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS
const URI_CENTROSMEDICOS = import.meta.env.VITE_API_CENTROSMEDICOS
const URI_TURNOS = import.meta.env.VITE_API_TURNOS
const URI_LOGIN = import.meta.env.VITE_API_LOGIN


//----------------------- USUARIOS -----------------------//

export const traerUsuariosAPI = async () => {
  try {
    const response = await axios.get(URI_USUARIOS)
    const listaUsuarios = await response.json()
    console.log(listaUsuarios);
    return listaUsuarios
  } catch (error) {
    console.error(error);
  }
}

export const traerUnUsuarioAPI = async(id) => {
  try {
    const response = await axios.get(`${URI_USUARIOS}/${id}`)
    return response
  } catch (error) {
    console.error(error);
  }
}

export const agregarUsuarioAPI = async(nuevoUsuario) => {
  const response = await axios.post(`${URI_USUARIOS}/registrar`, {
    nuevoUsuario
  })
  return response
}

export const actualizarUsuarioAPI = async(id, usuario) => {
  try {
    const response = await axios.put(`${URI_USUARIOS}/${id}`, {
      usuario
    })
    return response
  } catch (error) {
    console.error(error);
  }
}

export const eliminarUsuarioAPI = async(id) => {
  try {
    const response = await axios.delete(`${URI_USUARIOS}/${id}`)
    return response
  } catch (error) {
    console.error(error);
  }
}

export const login = async(usuario) => {
  try {
    const response = await axios.post(URI_LOGIN, {
      usuario
    })
    return response
  } catch (error) {
    console.error(error);
  }
}