import { IoAdd, IoAddCircle, IoChevronBackCircle, IoChevronForwardCircle, IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { centrosMedicos } from "../../utils/centroMedicosData";
import { Link } from "react-router-dom";

export default function SlideCentros() {
    return (
        <div className="p-6 md:p-12 relative">
            <p className="text-3xl md:text-[50px] text-[#126459] font-bold leading-tight">Conocé nuestros Centros Médicos</p>
            <p className="text-neutral-500 italic text-[20px] md:text-2xl lg:w-[70%] mt-4 mb-10">Ubicados por todo el país, nuestros centros medicos ofrecen la mejor atención con profesionales altamente calificados y con amplia experiencia.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {
                    centrosMedicos.slice(0, 4).map((centro, index) => {
                        return (
                            <div key={index} >
                                <div className="hidden lg:block col-span-1">
                                    <div className="h-72 rounded-t-md bg-cover bg-center" style={{ backgroundImage: `url(${centro.img})` }}>

                                    </div>
                                    <div className=" p-4 rounded-b-md shadow-lg">
                                        <h1 className="font-bold text-neutral-600 text-[20px]">{centro.name}</h1>
                                        <div className="truncate mt-1"><MdOutlineLocationOn className="inline-block mr-2 rounded-full h-7 w-7 p-1 bg-neutral-400 text-white text-xl" />{centro.address}</div>
                                        <button className="rounded-full bg-[#126459] text-white text-sm py-2 px-4 my-4">Ver toda la información</button>
                                    </div>
                                </div>
                                <div key={index} className="flex flex-row lg:hidden c col-span-1">
                                    <img src={centro.img} alt="" className="hidden sm:block w-44 rounded-t-md" />
                                    <div className=" p-4 rounded-b-md shadow-lg w-full">
                                        <h1 className="font-bold text-neutral-600 text-[20px]">{centro.name}</h1>
                                        <div className=" mt-1"><MdOutlineLocationOn className="inline-block mr-2 rounded-full h-7 w-7 p-1 bg-neutral-400 text-white text-xl" />{centro.address}</div>
                                        <button className="rounded-full bg-[#126459] text-white text-sm py-2 px-4 my-4">Ver toda la información</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center">
                <Link to="/centros" className="flex justify-center items-center bg-neutral-400 rounded-full px-6 py-4 font-semibold text-white">
                    <div className="mr-2 slide-control-button" >
                        <IoAddCircle />
                    </div>
                    <p>Ver todos los Centros</p>
                </Link>
            </div>
        </div>
    )
}
