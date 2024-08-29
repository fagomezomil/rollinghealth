import { Navigate } from "react-router-dom";
import useUsuarioStore from "../zustand/usuario-zustand"

const RutasProtegidas = ({children}) => {
  const { dataUsuario } = useUsuarioStore((state) => ({
    dataUsuario: state.dataUsuario,
  }))
  
  const admin = dataUsuario ? dataUsuario.role === 'Administrador' : ''
  const doc = dataUsuario ? dataUsuario.role === 'Doctor' : ''
  if(!(admin || doc)) {
    return <Navigate to='/login' />
  } else{
    return children
  }
}

export default RutasProtegidas