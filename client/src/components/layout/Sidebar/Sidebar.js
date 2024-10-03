import { useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import NavigationList from "../NavigationList";
import './Sidebar.css';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
    const [isCatalogOpen, setCatalogOpen] = useState(false);

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
            </div>
        </>
    );
};

export default Sidebar;
