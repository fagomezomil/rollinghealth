import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../components/Layout"
import Register from "../components/Register"
import Login from "../components/Login"
import Paciente from "../components/Paciente"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/paciente" element={<Paciente />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter

// https://codesandbox.io/p/sandbox/react-hook-form-tailwind-css-jykoy?file=%2Fsrc%2FApp.js