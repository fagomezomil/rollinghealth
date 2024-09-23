import { IoAddCircle } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { centrosMedicos } from "../../utils/centroMedicosData";
import { Link } from "react-router-dom";

export default function SlideCentros() {
    return (
        <div className="p-6 md:p-12 relative">
            <p className="titulo-articulo">Conocé nuestros Centros Médicos</p>
            <p className="bajada-articulo">Ubicados por todo el país, nuestros centros medicos ofrecen la mejor atención con profesionales altamente calificados y con amplia experiencia.</p>
            <div className="container-centros">
                {
                    centrosMedicos.slice(0, 4).map((centro, index) => {
                        return (
                            <div key={index} >
                                <div className="hidden lg:block col-span-1">
                                    <div className="h-72 rounded-t-md bg-cover bg-center" style={{ backgroundImage: `url(${centro.img})` }}>
                                    </div>
                                    <div className=" p-4 rounded-b-md shadow-lg">
                                        <h1 className="titulo-centro">{centro.name}</h1>
                                        <div className="truncate mt-1"><MdOutlineLocationOn className="icon-info" />{centro.address}</div>
                                        <Link to="centros"><button className="button-info">Ver toda la información</button></Link>
                                    </div>
                                </div>
                                <div key={index} className="flex flex-row lg:hidden c col-span-1">
                                    <img src={centro.img} alt="" className="hidden sm:block w-44 rounded-t-md" />
                                    <div className=" p-4 rounded-b-md shadow-lg w-full">
                                        <h1 className="titulo-centro">{centro.name}</h1>
                                        <div className=" mt-1"><MdOutlineLocationOn className="icon-info" />{centro.address}</div>
                                        <Link to="centros"><button className="button-info">Ver toda la información</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center">
                <Link to="/centros" className="button-mas">
                    <div className="mr-2 slide-control-button" >
                        <IoAddCircle />
                    </div>
                    <p>Ver todos los Centros</p>
                </Link>
            </div>
        </div>
    )
}
