import { IoChevronBackCircle, IoChevronForwardCircle, IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { centrosMedicos } from "../utils/centroMedicosData";

export default function SlideCentros() {
    return (
        <div className="p-12 relative">
            <p className="text-6xl text-[#126459] font-bold">Conocé nuestros Centros Médicos</p>
            <p className="text-neutral-500 italic text-2xl w-[70%] my-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae doloribus iste dolorum inventore ullam? Similique voluptatum tenetur suscipit facilis, ad quam deleniti!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
                {
                    centrosMedicos.slice(0, 5).map((centro, index) => {
                        return (
                            <div key={index} className=" col-span-1">
                                <div className="h-72 rounded-t-md bg-cover bg-center" style={{ backgroundImage: `url(${centro.img})` }}>

                                </div>
                                <div className=" p-4 rounded-b-md shadow-lg">
                                    <h1 className="font-bold text-neutral-600 text-[20px]">{centro.name}</h1>
                                    <div className="truncate mt-1"><MdOutlineLocationOn className="inline-block mr-2 rounded-full h-7 w-7 p-1 bg-neutral-400 text-white text-xl" />{centro.address}</div>
                                    <button className="rounded-full bg-[#126459] text-white text-sm py-2 px-4 mt-2">Ver toda la información</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="absolute bottom-5 left-12">
                <button className="slide-control-button" >
                    <IoChevronBackCircle />
                </button>
                <button className="slide-control-button">
                    <IoPauseCircle />
                </button>
                <button className="slide-control-button">
                    <IoChevronForwardCircle />
                </button>
            </div>
        </div>
    )
}
