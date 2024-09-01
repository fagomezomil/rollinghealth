import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"

const RutasDoctor = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Dashboard /> } />
    </Routes>
  )
}

export default RutasDoctor