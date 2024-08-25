import { IoSearch } from 'react-icons/io5';
import useCentroMedicoStore from "../../zustand/centroMedico-zustand.js";
import useMedicoStore from "../../zustand/medico-zustand.js";
import { useEffect, useState } from 'react';
import DocCard from './DocCard.jsx';
export default function EspecialistasHome() {
    const centrosMedicos = useCentroMedicoStore((state) => state.centrosMedicos);
    const getCentrosMedicos = useCentroMedicoStore((state) => state.getCentrosMedicos);
    const medicos = useMedicoStore((state) => state.medicos);
    const getMedicos = useMedicoStore((state) => state.getMedicos);

    const [centroMedicoId, setCentroMedicoId] = useState(0);
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadElegida, setEspecialidadElegida] = useState('');

    useEffect(() => {
        const getDatos = async () => {
            await getCentrosMedicos();
            await getMedicos();
        };
        getDatos();
    }, [getCentrosMedicos, getMedicos])

    const handleCentroMedicoChange = (event) => {
        setCentroMedicoId(event.target.value);
        const centroMedico = centrosMedicos.find((centro) => centro._id === event.target.value);
        const especialidadesFiltradas = centroMedico.specialties;
        setEspecialidades(especialidadesFiltradas);
    };

    const handleEspecialidadChange = (e) => {
        setEspecialidadElegida(e.target.value);
    };

    return (
        <div className='grid  bg-neutral-100 pb-12'>
            <div className='p-4 md:p-12'>
                <p className="text-3xl md:text-[50px] text-[#126459] font-bold leading-tight">
                    Encontrá aquí el profesional indicado
                </p>
                <p className="text-neutral-500 italic text-[20px] md:text-2xl lg:w-[70%] mt-4 mb-10">
                    Ubicados por todo el país, nuestros centros medicos ofrecen la mejor atención con profesionales altamente calificados y con amplia experiencia.
                </p>
                <form className='w-full flex flex-col xl:flex-row items-center gap-4'>
                    <p className='uppercase text-white font-semibold text-xl bg-neutral-500 rounded-md px-4 py-2  h-8 lg:h-16   flex items-center leading-6'>
                        Buscar profesional
                    </p>
                    <div className='flex gap-4 w-full flex-col lg:flex-row'>
                        <select
                            required
                            value={centroMedicoId}
                            onChange={handleCentroMedicoChange}
                            className="rounded-lg p-4 text-lg font-semibold text-white bg-[#126459] h-16 w-full truncate;">
                            <option value="" >Elija su Centro Médico</option>
                            {centrosMedicos.map((centro) => {
                                return (
                                    <option key={centro._id} value={centro._id}>{centro.name}</option>
                                )
                            })}
                        </select>
                        <select
                            required
                            value={especialidadElegida}
                            onChange={handleEspecialidadChange}
                            className="rounded-lg p-4 text-lg font-semibold text-white bg-[#126459] h-16 w-full;">
                            <option value="" defaultValue>Elija la especialidad</option>
                            {especialidades.map((especialidad, index) => (
                                <option key={index} value={especialidad}>
                                    {especialidad}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex gap-4 w-full flex-col lg:flex-row'>
                        <input
                            required
                            type="text"
                            placeholder="Busque por nombre o apellido"
                            className='text-xl text-center text-neutral-700  rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] w-full h-16'
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-[#0c423b] rounded-lg p-4 h-16">
                        <IoSearch className='text-4xl text-white' />
                        <p className="text-xl text-white font-bold uppercase">Buscar</p>
                    </button>
                </form>
            </div>
            {centroMedicoId === 0 ? 
                <>
                    <div className='my-8 mx-4 lg:mx-12'>
                        <p className='text-3xl md:text-4xl text-[#126459] leading-tight'>El cuerpo profesional de los Centros Médicos de Rolling Health le garantizan la mejor atención con la calidéz y la excelencia que nos representa.</p>
                    </div>
                    <hr className="my-8 mx-4 lg:mx-12 border-neutral-300" />
                </> :
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 lg:px-12'>
                    {medicos.filter((medico) => medico.centroMedico === centroMedicoId)
                    .filter((medico) => especialidadElegida ? medico.speciality === especialidadElegida : true)
                    .map((medico, index) => {
                        return (
                            <DocCard key={index} medico={medico} />
                        )
                    })}
                </div>
            }
        </div>
    )
}
