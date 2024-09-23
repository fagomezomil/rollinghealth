import { useEffect, useState } from 'react'
import { MdOutlineLocationOn, MdOutlineMail, MdOutlinePhone } from 'react-icons/md'
import useCentroMedicoStore from '../zustand/centroMedico-zustand'
import { Link } from 'react-router-dom';
import { irAlTop } from '../utils/functions';
import Spinner from '../components/Spinner';

export default function Centros() {
    const {centrosMedicos, getCentrosMedicos, isLoading} = useCentroMedicoStore(state => ({      
        centrosMedicos: state.centrosMedicos,
        getCentrosMedicos: state.getCentrosMedicos,
        isLoading: state.loading   
    }));
    const [centroMedicoSelected, setCentroMedicoSelected] = useState('');


    useEffect(() => {
        const getDatos = async () => {
            await getCentrosMedicos();
        };
        getDatos();
        irAlTop();
    }, [getCentrosMedicos])

    return (
        <div className='mt-20'>
            <div className="p-6 md:p-12 relative">
                <p className="titulo-articulo">Conocé nuestros Centros Médicos</p>
                <p className="bajada-articulo">Ubicados por todo el país, nuestros centros medicos ofrecen la mejor atención con profesionales altamente calificados y con amplia experiencia.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {isLoading ? <Spinner /> :
                        centrosMedicos.map((centro, index) => {
                            return (
                                <button key={index} onClick={() => setCentroMedicoSelected(centro._id)} className={` lg:block ${centroMedicoSelected === centro._id ? 'md:col-span-1 lg:col-span-3 ' : 'col-span-1'}`}>
                                    <div className={`rounded-b-md shadow-lg grid  ${centroMedicoSelected === centro._id ? 'lg:grid-cols-3 h-full ' : ''}`}>
                                        <div className={`bg-cover bg-center ${centroMedicoSelected === centro._id ? 'h-full' : 'h-72'}`} style={{ backgroundImage: `url(${centro.img})` }}>
                                        </div>
                                        <div className={`grid grid-cols-2 items-center gap-1 ${centroMedicoSelected === centro._id ? 'p-8 col-span-2' : 'p-4'}`}>
                                            <div className={`flex flex-col items-start gap-2 mr-2  text-left ${centroMedicoSelected === centro._id ? 'col-span-2 md:col-span-1' : 'col-span-2'}`} >
                                                <h1 className={`font-bold text-neutral-600 ${centroMedicoSelected === centro._id ? 'text-[30px] leading-8' : 'text-[20px]'}`}>{centro.name}</h1>
                                                <p className="md:truncate md:w-full w-64 mt-1"><MdOutlineLocationOn className="icon-info" />{centro.address}</p>
                                                <p className={`${centroMedicoSelected === centro._id ? 'block' : 'hidden'}`}>
                                                    <MdOutlinePhone className="icon-info" />
                                                    {centro.phone}
                                                </p>
                                                <p className={`${centroMedicoSelected === centro._id ? 'block' : 'hidden'}`}>
                                                    <MdOutlineMail className="icon-info" />
                                                    {centro.email}
                                                </p>
                                                <Link to="/paciente" className={`${centroMedicoSelected === centro._id ? 'rounded-lg bg-[#0c423b] text-white text-md font-medium py-2 px-4 my-4' : 'hidden'}`}>Solicitar turno</Link>
                                            </div>
                                            <iframe className={`${centroMedicoSelected === centro._id ? 'col-span-2 md:col-span-1 w-full h-full' : 'hidden'}`} src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14241.076361140696!2d-65.2050432!3d-26.8313923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1723988109297!5m2!1ses!2sar" ></iframe>
                                            <div className='col-span-2'>
                                                <p className={`${centroMedicoSelected === centro._id ? 'hidden' : 'rounded-full bg-[#126459] text-white text-sm py-2 px-4 my-4'}`}>Ver toda la información</p>
                                                <p className={`${centroMedicoSelected === centro._id ? 'block uppercase font-semibold text-left mt-4 pb-4' : 'hidden'}`}>Especialidades habilitadas</p>
                                                <div className='flex flex-wrap text-left gap-1'>
                                                    {centroMedicoSelected === centro._id && centro.specialties.map((especialidad, index) => (
                                                        <div key={index} className='badge-especialidad'>{especialidad}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
