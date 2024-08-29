import { Route, Routes } from "react-router-dom"
import Paciente from "../components/Paciente"

const RutasPaciente = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Paciente />} />
    </Routes>
  )
}

export default RutasPaciente