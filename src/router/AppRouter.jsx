import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../components/Layout"
import Register from "../components/Register"
import Login from "../components/Login"
import Paciente from "../components/Paciente"
import Centros from "../pages/Centros"
import Staff from "../pages/Staff"
import Nosotros from "../pages/Nosotros"
import Dashboard from "../pages/Dashboard"
import RutasProtegidas from "./RutasProtegidas"
import RutasAdmin from "./RutasAdmin"
import RutasDoctor from "./RutasDoctor"
import useUsuarioStore from "../zustand/usuario-zustand"
import Error404 from "../components/Error404"

const AppRouter = () => {
    const { dataUsuario } = useUsuarioStore((state) => ({
        dataUsuario: state.dataUsuario,
    }))
    
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/centros" element={<Centros />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/404" element={<Error404 />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/dashboard/*"
                        element={
                            <RutasProtegidas>
                                {dataUsuario ? dataUsuario.role === 'Administrador' && <RutasAdmin /> : ''}
                                {dataUsuario ? dataUsuario.role === 'Doctor' && <RutasDoctor /> : ''}
                                {dataUsuario ? dataUsuario.role !== 'Administrador' && dataUsuario.role !== 'Doctor' && <Navigate to="/" /> : ''}
                            </RutasProtegidas>
                        }
                    />
                    <Route
                        path="/paciente/*"
                        element={
                            <RutasProtegidas role="Paciente">
                                <Paciente />
                            </RutasProtegidas>
                        }/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter