import { useState } from "react";
import { FaUserDoctor, FaUserNurse, FaUsers } from "react-icons/fa6";
import { IoCalendarNumber } from "react-icons/io5";
import {services} from "../../utils/servicesData";
import { Link } from "react-router-dom";

export default function ServicesHome() {
    const [hoveredServiceId, setHoveredServiceId] = useState(null);

    const handleMouseEnter = (serviceId) => {
        setHoveredServiceId(serviceId);
    };

    const handleMouseLeave = () => {
        setHoveredServiceId(null);
    };

    return (
        <div className="h-36 flex justify-around bg-neutral-400 items-center">
            {services.map((service) => (
                <Link key={service.id} to={service.link}>
                <div className="flex">
                    <button
                        className={`services-button ${hoveredServiceId === service.id ? "hovered p-6 bg-[#126459]" : ""}`}
                        onMouseEnter={() => handleMouseEnter(service.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex">
                            <p className="services-icon">
                                {service.icon === "FaUserDoctor" && <FaUserDoctor />}
                                {service.icon === "FaUserNurse" && <FaUserNurse />}
                                {service.icon === "FaUsers" && <FaUsers />}
                                {service.icon === "IoCalendarNumber" && <IoCalendarNumber />}
                            </p>
                            {service.title}
                        </div>
                    </button>
                    {
                        hoveredServiceId === service.id &&
                        <p className="text-[15px] text-center ml-2 p-2 bg-white rounded-lg text-neutral-500 w-36 ">{service.text}</p>
                    }
                </div>
                </Link>
            ))}
        </div>
    );
}