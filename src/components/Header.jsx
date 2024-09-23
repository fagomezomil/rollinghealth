import { Link } from "react-router-dom";
import  UserBadge  from "./UserBadge";
import  NavBar  from "./NavBar";

const Header = () => {
    return (
        <header className="header-style">
            <Link to="/">
                <img 
                src="./images/rollinghealth.svg" 
                alt="Rolling Health" 
                className="ml-4 md:ml-6 lg:ml-12 h-9 md:h-12" />
            </Link>
            <div className="flex">
                <NavBar />
                <UserBadge />
            </div>
        </header>
    );
};

export default Header;