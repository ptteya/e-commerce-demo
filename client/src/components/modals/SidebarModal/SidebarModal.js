import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { categoryOptions } from "constants/categoryOptions";
import { formatCategoryTitle } from "utils/formatCategoryTitle";
import './SidebarModal.css';

const SidebarModal = ({ showModal, toggleSidebar }) => {
    const { user } = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleCatalogLinkClick = (e) => {
        e.preventDefault();
        setDropdownOpen(!isDropdownOpen);
    };

    if (!showModal) return null;

    return (
        <div className={`sidebar ${showModal ? 'sidebarModalOpen' : ''}`}>
            <div className="sidebar-header">
                <button className="close-btn">
                    <i className="bi bi-x-lg" onClick={toggleSidebar} ></i>
                </button>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-item" onClick={toggleSidebar}><Link to="/">Home</Link></li>
                <li className="catalog-item" onClick={handleCatalogLinkClick}>
                    <Link className="catalog-toggle" onClick={(e) => e.preventDefault()}>
                        Catalog
                        <i className={`fas fa-chevron-down arrow-icon ${isDropdownOpen ? 'arrow-rotated' : ''}`}></i>
                    </Link>

                    <ul onClick={handleCatalogLinkClick} className={`dropdown-menu  ${isDropdownOpen ? 'active-menu' : ''}`}>
                        {categoryOptions.map(option => (
                            <li key={option} onClick={toggleSidebar}>
                                <Link to={`/furniture?category=${option}`}>
                                    {formatCategoryTitle(option)}
                                </Link>
                            </li>
                        ))}
                        <li><Link to="/furniture"> All Items</Link></li>
                    </ul >
                </li >
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

export default SidebarModal;