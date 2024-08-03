import { medicos } from '../../utils/medicosData'
import { MdOutlineLocationOn } from 'react-icons/md'
export default function EspecialistasHome() {

    function medicosRandom() {
        return medicos
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }
    const medicosRandomResult = medicosRandom()
    console.log(medicosRandomResult)
    return (
        <div className='flex  bg-[#126459]'>
            <div>
                <h1 className='text-3xl font-bold text-white'>Buscador</h1>
                <input type="text" placeholder="Buscador" />
            </div>
            <div className='flex flex-row justify-evenly'>
                {
                    medicosRandomResult.map((medico, index) => {
                        return (
                            <div key={index} className="">
                                {/* <div className="h-72 rounded-t-md bg-cover bg-center" style={{ backgroundImage: `url(${medico.img})` }}></div> */}
                                <div className="flex flex-col items-center justify-center p-4 rounded-b-md  relative">
                                    <img src={medico.img} className="h-72 w-72 rounded-full object-cover bg-center" alt="" />
                                    <h1 className="bg-[#0c423b] rounded-md p-3 w-fit font-bold text-white text-[20px] mb-6 absolute bottom-[140px]">{medico.name}</h1>
                                    <div className='flex flex-col items-center justify-center bg-white rounded-md p-3'>
                                        <p className='text-neutral-600 mt-8 text-lg'>{medico.speciality}</p>
                                        <div className="truncate mt-1">
                                            <MdOutlineLocationOn
                                                className="inline-block mr-2 rounded-full h-7 w-7 p-1 bg-neutral-400 text-white text-xl"
                                            />
                                            {medico.centroMedico}
                                        </div>
                                        <button
                                            className="rounded-full bg-[#126459] text-white text-sm py-2 px-4 my-4">
                                            Ver toda la información
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
