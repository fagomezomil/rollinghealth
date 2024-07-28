import { useState } from 'react'
import { FaUserDoctor, FaUserNurse, FaUsers } from "react-icons/fa6";
import { IoCalendarNumber } from "react-icons/io5";

export default function ServicesButton(text, title, icon, key) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            className={`services-button ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={key}
        >
            <div className="services-icon">
                {icon === 'FaUserDoctor' && <FaUserDoctor />}
                {icon === 'FaUserNurse' && <FaUserNurse />}
                {icon === 'FaUsers' && <FaUsers />}
                {icon === 'IoCalendarNumber' && <IoCalendarNumber />}
            </div>
            <div className="services-text">{title}</div>
        </button>
    );
}