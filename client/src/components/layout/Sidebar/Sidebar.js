import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { AuthContext } from "contexts/AuthContext";
import { MdLogin } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import NavigationList from "../NavigationList";
import './Sidebar.css';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
    const [isCatalogOpen, setCatalogOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    const toggleCatalogDropdown = useCallback(() => setCatalogOpen(prev => !prev), []);

    return (
        <>
            <div className={`sidebar-overlay ${showSidebar ? 'active-overlay' : ''}`} onClick={toggleSidebar}></div>
            <div className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
                <MdClose className="close-icon" onClick={toggleSidebar} />

                <NavigationList
                    listClassName="sidebar-list"
                    toggleDropdown={toggleCatalogDropdown}
                    isDropdownOpen={isCatalogOpen}
                    toggleSidebar={toggleSidebar}
                />

                <div className="auth">
                    {isAuthenticated ? (
                        <Link to="/users/logout" onClick={toggleSidebar}>
                            <span className="icon-wrapper"><TbLogout2 className="icon" /></span>
                            Logout
                        </Link>
                    ) : (
                        <>
                            <Link to="/users/login" onClick={toggleSidebar}>
                                <span className="icon-wrapper"><MdLogin className="icon" /></span>
                                Login
                            </Link>
                            <Link to="/users/register" onClick={toggleSidebar}>
                                <span className="icon-wrapper"><IoPersonOutline className="icon" /></span>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
