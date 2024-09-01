import { Navigate } from "react-router-dom";
import useUsuarioStore from "../zustand/usuario-zustand"

const RutasProtegidas = ({children, role}) => {
  const { dataUsuario } = useUsuarioStore((state) => ({
    dataUsuario: state.dataUsuario,
  }))
  
  // const admin = dataUsuario ? dataUsuario.role === 'Administrador' : ''
  // const doc = dataUsuario ? dataUsuario.role === 'Doctor' : ''
/*   if(!dataUsuario) {
    return <Navigate to='/login' />
  }

  if(role && dataUsuario.role !== role){
    return <Navigate to='/login' />
  }

  return children */

  if (!dataUsuario) {
    return <Navigate to='/login' />;
  }
  if (role && !role.includes(dataUsuario.role)) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default RutasProtegidas