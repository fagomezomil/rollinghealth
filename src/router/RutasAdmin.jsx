import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"

const RutasAdmin = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Dashboard /> } />
    </Routes>
  )
}

export default RutasAdmin