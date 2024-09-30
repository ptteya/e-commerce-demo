import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import Sidebar from "components/layout/Sidebar/Sidebar";
import Search from "../Search/Search";
import './NavBar.css';
import NavigationList from "components/layout/NavigationList";

const NavBar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleDropdownMenu = useCallback(() => setDropdownVisible(prev => !prev), []);

    const toggleSidebar = useCallback(() => {
        setSidebarVisible(prev => !prev);
        if (isDropdownVisible) setDropdownVisible(false);
    }, [isDropdownVisible]);

    return (
        <div className="navbar">
            <div className="logo-container">
                <div className="logo-image"></div>
                <Link to="/" className="logo">HOMELY</Link>
            </div>

            <NavigationList
                listClassName="nav-list"
                toggleDropdown={toggleDropdownMenu}
                isDropdownOpen={isDropdownVisible}
            />

            <div className="nav-actions">
                <Search />
                <i className="fas fa-bars sidebar-icon" onClick={toggleSidebar}></i>
                <Sidebar showSidebar={isSidebarVisible} toggleSidebar={toggleSidebar} />
            </div>
        </div>
    );
};

export default NavBar;