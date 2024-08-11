import { IoSearch } from 'react-icons/io5';
import { medicos } from '../../utils/medicosData'
import { MdOutlineLocationOn } from 'react-icons/md'
export default function EspecialistasHome() {

    function medicosRandom() {
        return medicos
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);
    }
    const medicosRandomResult = medicosRandom()
    console.log(medicosRandomResult)
    return (
        <div className='grid  bg-[#126459] pb-12'>
            <div className='p-4 md:p-12'>
                <p className="text-3xl md:text-[50px] text-white font-bold leading-tight">Encontrá aquí el profesional indicado</p>
                <p className="text-white italic text-[20px] md:text-2xl lg:w-[70%] mt-4 mb-10">Ubicados por todo el país, nuestros centros medicos ofrecen la mejor atención con profesionales altamente calificados y con amplia experiencia.</p>
                <form className='w-full flex flex-col xl:flex-row items-center gap-4'>
                    <div className='flex gap-4 w-full flex-col lg:flex-row'>
                        <p className='uppercase text-white font-semibold text-xl bg-neutral-500 rounded-md px-4 py-2  h-8 lg:h-16   flex items-center leading-6'>Buscar profesional</p>
                        <input
                        type="text"
                        placeholder="Buscador"
                        className='text-xl text-center text-neutral-700  rounded-md focus:outline-none focus:ring focus:ring-[#aaddd6] border border-[#126459] w-full h-16'
                        />
                    </div>
                    <div className='flex gap-4 w-full flex-col lg:flex-row'>
                        <p className='uppercase text-white font-semibold text-xl bg-neutral-500 rounded-md px-4 py-2  h-8 lg:h-16 flex items-center  leading-6'>Filtrar por:</p>
                        <select className="rounded-lg p-4 text-lg font-semibold text-white bg-[#0c423b] h-16 w-full truncate;">
                            <option disabled selected>Centros Médicos</option>
                            <option>Centro Médico Chaco Salud</option>
                            <option>Centro Médico Tucumán Bienestar</option>
                        </select>
                        <select className="rounded-lg p-4 text-lg font-semibold text-white bg-[#0c423b] h-16 w-full;">
                            <option disabled selected>Especialidad</option>
                            <option>Clínica Médica</option>
                            <option>Dermatología</option>
                        </select>
                        <button className="flex items-center gap-2 bg-white rounded-lg p-4 h-16">
                            <IoSearch className='text-4xl text-[#0c423b]' />
                            <p className="text-xl text-[#0c423b] font-bold uppercase">Buscar</p>
                        </button>
                    </div>
                </form>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 lg:px-12'>
                {
                    medicosRandomResult.map((medico, index) => {
                        return (
                            <div key={index} className="rounded-lg">
                                {/* <div className="h-72 rounded-t-md bg-cover bg-center" style={{ backgroundImage: `url(${medico.img})` }}></div> */}
                                <div className="flex flex-row lg:flex-col items-center lg:justify-centerrounded-b-md  relative">
                                    <img src={medico.img} className="h-32 w-24 lg:h-72 lg:w-72 xl:w-full rounded-md object-cover bg-center" alt="" />
                                    <div className='flex flex-col w-full lg:text-center'>
                                        <h1 className="bg-[#0c423b] rounded-md p-3 w-full font-bold text-white text-[20px]  bottom-[140px]">{medico.name}</h1>
                                        <p className='text-neutral-600 text-lg font-semibold  bg-white rounded-lg px-4 py-1'>{medico.specialty}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center '>
                                    <div className="mt-2 text-white border border-white px-3 py-2 rounded-full">
                                        <MdOutlineLocationOn
                                            className="inline-block mr-2 rounded-full h-7 w-7 p-1 bg-neutral-400 text-xl"
                                        />
                                        {medico.centroMedico}
                                    </div>
                                    <button
                                        className="rounded-full bg-neutral-100 text-[#126459] text-sm py-2 px-4 my-2">
                                        Más info
                                    </button>
                                </div>
                                <hr className='block md:hidden border-[0,5px] border-dashed border-white mt-4' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
