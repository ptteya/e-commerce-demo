import { Link } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import DropdownMenu from "../DropdownMenu";
import './Sidebar.css';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
    const { user } = useContext(AuthContext);
    const [isCatalogOpen, setCatalogOpen] = useState(false);

    const toggleCatalogDropdown = useCallback(() => setCatalogOpen(prev => !prev), []);

    if (!showSidebar) return null;

    return (
        <div className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
                <button className="close-btn">
                    <i className="bi bi-x-lg" onClick={toggleSidebar} ></i>
                </button>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-item" onClick={toggleSidebar}><Link to="/">Home</Link></li>
                <DropdownMenu toggleMenu={toggleCatalogDropdown} isMenuOpen={isCatalogOpen} toggleSidebar={toggleSidebar} />
                <li className="sidebar-item" onClick={toggleSidebar}><Link to="/about">About</Link></li>
                <li className="sidebar-item" onClick={toggleSidebar}><Link to="/contacts">Contacts</Link></li>
                {user.role === 'admin' && (
                    <>
                        <li className="sidebar-item" onClick={toggleSidebar}><Link to="/furniture/create">Create</Link></li>
                        <li className="sidebar-item" onClick={toggleSidebar}><Link to="/admin/promote-users">Promote</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;