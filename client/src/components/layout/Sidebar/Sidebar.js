import { useCallback, useState } from "react";
import './Sidebar.css';
import NavigationList from "../NavigationList";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
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

            <NavigationList
                listClassName="sidebar-list"
                toggleDropdown={toggleCatalogDropdown}
                isDropdownOpen={isCatalogOpen}
                toggleSidebar={toggleSidebar}
            />
        </div>
    );
};

export default Sidebar;