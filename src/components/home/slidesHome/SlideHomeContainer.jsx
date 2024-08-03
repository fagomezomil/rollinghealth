import { RiWhatsappLine } from "react-icons/ri";
export default function SlideHomeContainer({ data }) {
    return (
        <div
            className={`h-[650px] w-full bg-cover bg-center flex flex-col justify-center items-start`}
            style={{ backgroundImage: `url(${data.img})` }}
        >
            <div className="lg:ml-12 space-y-8 w-[40%]">
                <p className="text-[#0c423b] text-7xl">{data.title}</p>
                <p className="text-neutral-500 text-2xl w-[70%]">{data.text}</p>
                <button className={`slide-home-button ${data.icon === "whatsapp" ? "bg-[#29bb24]" : "bg-neutral-500"}`}>
                    {
                        data.icon === "whatsapp" && <RiWhatsappLine className="inline-block mr-2 text-2xl" />
                    }
                    {data.button}
                </button>
            </div>
        </div>
    );
}