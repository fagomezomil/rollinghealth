import { useState } from "react"
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md"
import { Link } from "react-router-dom"

export default function DocCard({ medico }) {
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(false)

    return (
        <button onClick={() => setMedicoSeleccionado(!medicoSeleccionado)} className={`rounded-lg ${medicoSeleccionado === true ? 'flex flex-col lg:col-span-2' : ''}`}>
            <div className={`items-center lg:justify-center rounded-b-md drop-shadow-md ${medicoSeleccionado === true ? 'grid lg:grid-cols-2' : 'flex flex-row lg:flex-col'}`}>
                <div className={`flex lg:grid w-full ${medicoSeleccionado === true ? '' : ''}`}>
                    <img src={medico.img} className="h-32 w-32 lg:h-72 lg:w-full rounded-md object-cover bg-center" alt="" />
                    <div className='flex flex-col w-full lg:text-center md:items-center justify-center'>
                        <h1 className="bg-[#0c423b] rounded-md p-3 w-full font-bold text-white text-[20px]  bottom-[140px]">{medico.name}</h1>
                        <p className='w-full text-neutral-600 text-lg font-semibold  bg-white rounded-lg px-4 py-1'>{medico.speciality}</p>
                        <div
                            className={`rounded-lg bg-neutral-300 w-4/5 text-[#126459] text-sm py-1 px-4 mb-2 ${medicoSeleccionado === true ? 'hidden' : 'block'}`}>
                            Más info
                        </div>
                    </div>
                </div>
                <div className={`${medicoSeleccionado === true ? 'bg-white h-full ml-2 my-4 rounded-lg p-4 text-left' : 'hidden'}`}>
                    <p className="uppercase text-[#126459] font-medium text-sm">Bio Doc</p>
                    <p className={``}>{medico.bio}</p>
                    <div className="flex items-end  my-2">
                        <p className="uppercase text-[#126459] font-medium text-sm mr-2">Matrícula Profesional: </p>
                        <p className={``}>{medico.mp}</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="uppercase text-[#126459] font-medium text-sm mt-2 mr-2" >Atención:</p>
                        <p className={`capitalize`}>{medico.atencion}</p>
                    </div>
                    <p className="capitalize mt-2"><MdOutlinePhone className="inline-block mr-2 rounded-full h-5 w-5 p-1 bg-[#126459] text-white text-xl" />{medico.phone}</p>
                    <p className="my-4"><MdOutlineEmail className="inline-block mr-2 rounded-full h-5 w-5 p-1 bg-[#126459] text-white text-xl" />{medico.email}</p>
                    <Link className="rounded-full bg-[#126459] text-white text-sm py-2 px-4 mt-2">Preguntas Frecuentes</Link>
                </div>
            </div>
        </button>
    )
}
