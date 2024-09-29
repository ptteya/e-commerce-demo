import { Link } from "react-router-dom";
import { categoryOptions } from "constants/categoryOptions";
import { formatCategoryTitle } from "utils/formatCategoryTitle";
import { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import Search from "../Search/Search";
import './NavBar.css';

const NavBar = () => {
    const { user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="navbar">
            <div className="logo-container">
                <div className="logo-image"></div>
                <Link to="/" className="logo">HOMELY</Link>
            </div>
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item catalog-item" onClick={toggleMenu} >
                    <Link className='' onClick={(e) => e.preventDefault()}>
                        Catalog
                        <i className={`fas fa-chevron-down arrow-icon ${isMenuOpen ? 'arrow-rotated' : ''}`}></i>
                    </Link>

                    <ul onClick={toggleMenu} className={`dropdown-menu ${isMenuOpen ? 'active-menu' : ''}`} >
                        {categoryOptions.map(option => (
                            <li key={option}>
                                <Link to={`/furniture?category=${option}`}>
                                    {formatCategoryTitle(option)}
                                </Link>
                            </li>
                        ))}
                        <li><Link to="/furniture"> All Items</Link></li>
                    </ul>
                </li>
                <li className="nav-item"><Link to="/about">About</Link></li>
                <li className="nav-item"><Link to="/contacts">Contacts</Link></li>
                {user.role === 'admin' && (
                    <>
                        <li className="nav-item"><Link to="/furniture/create">Create</Link></li>
                        <li className="nav-item"><Link to="/admin/promote-users">Promote</Link></li>
                    </>
                )}
            </ul>
            <Search />
        </div>
    );
};

export default NavBar;