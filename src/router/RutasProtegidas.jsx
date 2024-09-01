import { Navigate } from "react-router-dom";
import useUsuarioStore from "../zustand/usuario-zustand"

const RutasProtegidas = ({children, role}) => {
  const { dataUsuario } = useUsuarioStore((state) => ({
    dataUsuario: state.dataUsuario,
  }))
  
  if(!dataUsuario) {
    return <Navigate to='/login' />
  }

  if(role && dataUsuario.role !== role){
    return <Navigate to='/' />
  }

  return children 
}

export default RutasProtegidas