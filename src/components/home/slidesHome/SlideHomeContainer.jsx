import { RiWhatsappLine } from "react-icons/ri";
import { Link } from "react-router-dom";
export default function SlideHomeContainer({ data }) {
    return (
        <>
            <div
                className={`hidden lg:flex h-[650px] w-full bg-cover bg-center lg:flex-col justify-center items-start`}
                style={{ backgroundImage: `url(${data.img})` }}
            >
                <div className="lg:ml-12 space-y-8 w-[50%] xl:w-[40%]">
                    <p className="text-[#0c423b] text-6xl">{data.title}</p>
                    <p className="text-neutral-500 text-2xl w-[90%]">{data.text}</p>
                    <button className={`slide-home-button ${data.icon === "whatsapp" ? "bg-[#29bb24]" : "bg-neutral-500"}`}>
                        {
                            data.icon === "whatsapp" && <RiWhatsappLine className="inline-block mr-2 text-2xl" />
                        }
                        {data.button}
                    </button>
                </div>
            </div>
            <div className="lg:hidden">
                <div
                    className="h-[250px] object-contain bg-cover bg-center"
                    style={{ backgroundImage: `url(${data.img})` }}
                >
                </div>
                <div className="p-6 space-y-4 ">
                    <p className="text-[#0c423b] font-medium text-4xl md:text-5xl">{data.title}</p>
                    <p className="text-neutral-500 text-2xl w-[90%]">{data.text}</p>
                    <Link to={data.link} className={`slide-home-button ${data.icon === "whatsapp" ? "bg-[#29bb24]" : "bg-neutral-500"}`}>
                        {
                            data.icon === "whatsapp" && <RiWhatsappLine className="inline-block mr-2 text-2xl" />
                        }
                        {data.button}
                    </Link >
                </div>
            </div>
        </>
    );
}