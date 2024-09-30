import { Link } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import Sidebar from "components/layout/Sidebar/Sidebar";
import Search from "../Search/Search";
import DropdownMenu from "components/layout/DropdownMenu";
import './NavBar.css';

const NavBar = () => {
    const { user } = useContext(AuthContext);
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
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <DropdownMenu toggleMenu={toggleDropdownMenu} isMenuOpen={isDropdownVisible} />
                <li className="nav-item"><Link to="/about">About</Link></li>
                <li className="nav-item"><Link to="/contacts">Contacts</Link></li>
                {user.role === 'admin' && (
                    <>
                        <li className="nav-item"><Link to="/furniture/create">Create</Link></li>
                        <li className="nav-item"><Link to="/admin/promote-users">Promote</Link></li>
                    </>
                )}
            </ul>
            <div className="nav-actions">
                <Search />
                <i className="fas fa-bars sidebar-icon" onClick={toggleSidebar}></i>
                <Sidebar showSidebar={isSidebarVisible} toggleSidebar={toggleSidebar} />
            </div>
        </div>
    );
};

export default NavBar;