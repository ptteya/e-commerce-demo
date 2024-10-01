import { useCallback, useState } from "react";
import './Sidebar.css';
import NavigationList from "../NavigationList";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
    const [isCatalogOpen, setCatalogOpen] = useState(false);

    const toggleCatalogDropdown = useCallback(() => setCatalogOpen(prev => !prev), []);

    return (
        <>
            <div className={`sidebar-overlay ${showSidebar ? 'active-overlay' : ''}`} onClick={toggleSidebar}></div>
            <div className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <button className="close-btn" onClick={toggleSidebar}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <NavigationList
                    listClassName="sidebar-list"
                    toggleDropdown={toggleCatalogDropdown}
                    isDropdownOpen={isCatalogOpen}
                    toggleSidebar={toggleSidebar}
                />
            </div>
        </>
    );
};

export default Sidebar;
