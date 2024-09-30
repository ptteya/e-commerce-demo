import { categoryOptions } from "constants/categoryOptions";
import { Link } from "react-router-dom";
import { formatCategoryTitle } from "utils/formatCategoryTitle";

const DropdownMenu = ({ toggleMenu, isMenuOpen, toggleSidebar = null }) => {
    const handleLinkClick = () => {
        toggleMenu();
        if (toggleSidebar) toggleSidebar();
    };

    return (
        <li className="nav-item catalog-item">
            <span className="catalog-toggle" onClick={toggleMenu}>
                Catalog
                <i className={`fas fa-chevron-down arrow-icon ${isMenuOpen ? 'arrow-rotated' : ''}`}></i>
            </span>
            <ul className={`dropdown-menu  ${isMenuOpen ? 'active-menu' : ''}`} >
                {categoryOptions.map(option => (
                    <li key={option} >
                        <Link
                            to={`/furniture?category=${option}`}
                            onClick={handleLinkClick}
                        >
                            {formatCategoryTitle(option)}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link to="/furniture" onClick={handleLinkClick}>
                        All Items
                    </Link>
                </li>
            </ul>
        </li>
    );
};

export default DropdownMenu;