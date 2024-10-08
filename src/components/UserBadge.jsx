import { useState } from "react";
import { FaUser } from "react-icons/fa";
import NavLg from "./navbar/NavLg";
import useUsuarioStore from '../zustand/usuario-zustand.js';

const UserBadge = () => {
    const [open, setOpen] = useState(false);    
    const [emailOk, setEmailOk] = useState(false)
    const [passwordOk, setPasswordOk] = useState(false);
    const { dataUsuario } = useUsuarioStore();
    const role = dataUsuario ? dataUsuario.role : "";


    return (
        <div className="flex items-center relative">
            <NavLg open={open} setOpen={setOpen} emailOk={emailOk} setEmailOk={setEmailOk} passwordOk={passwordOk} setPasswordOk={setPasswordOk} role={role} />
        </div>
    );
};

export default UserBadge; 