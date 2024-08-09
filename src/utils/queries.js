import axios from "axios"

const URI_USUARIOS = import.meta.env.VITE_API_USUARIOS
const URI_CENTROSMEDICOS = import.meta.env.VITE_API_CENTROSMEDICOS
const URI_TURNOS = import.meta.env.VITE_API_TURNOS
const URI_LOGIN = import.meta.env.VITE_API_LOGIN


//----------------------- USUARIOS -----------------------//

export const traerUsuariosAPI = async () => {
  try {
    const response = await axios.get(URI_USUARIOS)
    const listaUsuarios = await response.data
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
  try {
    const response = await axios.post(`${URI_USUARIOS}/registrar`, {
      nuevoUsuario
    })
    return response
  } catch (error) {
    console.error(error);
  }
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


//----------------------- CENTROS MEDICOS -----------------------//

export const traerCentrosMedicosAPI = async () => {
  try {
    const response = await axios.get(URI_CENTROSMEDICOS)
    const listaCentrosMedicos = await response.data
    return listaCentrosMedicos
  } catch (error) {
    console.error(error);
  }
}

export const traerUnCentroMedicoAPI = async(id) => {
  try {
    const response = await axios.get(`${URI_CENTROSMEDICOS}/${id}`);
    return response
  } catch (error) {
    console.error(error);
  }
}

export const agregarCentroMedicoAPI = async(nuevoCentroMedico) => {
  try {
    const response = await axios.post(URI_CENTROSMEDICOS, {
      nuevoCentroMedico
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export const actualizarCentroMedicoAPI = async(id, centroMedico) => {
  try {
    const response = await axios.put(`${URI_CENTROSMEDICOS}/${id}`, {
      centroMedico
    })
    return response
  } catch (error) {
    console.error(error);
  }
}

export const eliminarCentroMedicoAPI = async(id) => {
  try {
    const response = await axios.delete(`${URI_CENTROSMEDICOS}/${id}`)
    return response
  } catch (error) {
    console.error(error);
  }
}


//----------------------- TURNOS -----------------------//

export const traerTurnosAPI = async() => {
  try {
    const response = await axios.get(URI_TURNOS)
    const listaTurnos = await response.data
    return listaTurnos
  } catch (error) {
    console.error(error);
  }
}

export const traerUnTurnoAPI = async(id) => {
  try {
    const response = await axios.get(`${URI_TURNOS}/${id}`)
    return response
  } catch (error) {
    console.error(error);
  }
}

export const agregarTurnoAPI = async(nuevoTurno) => {
  try {
    const response = await axios.post(URI_TURNOS, {
      nuevoTurno
    })
    return response
  } catch (error) {
    console.error(error);
  }
}

export const actualizarTurnoAPI = async(id, turno) => {
  try {
    const response = await axios.put(`${URI_TURNOS}/${id}`, {
      turno
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export const eliminarTurnoAPI = async(id) => {
  try {
    const response = await axios.delete(`${URI_TURNOS}/${id}`)
    return response
  } catch (error) {
    console.error(error);
  }
}