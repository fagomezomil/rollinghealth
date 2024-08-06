
import { useState } from 'react';
import MenuPortal from './portalpacientes/MenuPortal';
import SidePortal from './portalpacientes/SidePortal';
import TurnosPortal from './portalpacientes/TurnosPortal';

export default function Paciente() {
    const [portal, setPortal] = useState("MenuPortal")
    console.log(portal)
    return (
        <div className='mt-20 grid grid-cols-12'>
            <SidePortal  setPortal={setPortal} portal={portal}/>
            <div className="col-span-8 p-10 ">
                
                {   portal === "MenuPortal" ?
                    <MenuPortal setPortal={setPortal} portal={portal} />
                    : ""
                }
                {
                    portal === "TurnosPortal" ?
                    <TurnosPortal setPortal={setPortal} portal={portal} />
                    : ""
                }
            </div>

        </div>
    )
}
