import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import Search from './Search';
import * as furnitureService from 'services/furnitureService';

const Header = () => {
    const { user, isAuthenticated, guestFavorites, guestCart, } = useContext(AuthContext);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const dropdownRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const getFavoritesCount = () => isAuthenticated ? user.favorites?.length : furnitureService.getLocalCollection('favorites').length;
        const getCartCount = () => isAuthenticated ? user.cart?.length : furnitureService.getLocalCollection('cart').length;

        setFavoritesCount(getFavoritesCount() || 0);
        setCartCount(getCartCount() || 0)
    }, [user, isAuthenticated, guestFavorites, guestCart]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                iconRef.current && !iconRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setDropdownVisible(state => !state);

    const handleLinkClick = () => setDropdownVisible(false);

    return (
        <header>
            <nav className="navbar">
                <div className="top-header">
                    <div className="top-header-services">
                        <p>Fast delivery</p>
                        <p>Return in 30 days</p>
                        <p>Warranty service</p>
                        <p>+359 89 347 2637</p>
                    </div>
                    <div className="top-header-actions">
                        <Link to="/favorites">
                            <div className="icon-wrapper">
                                <i className="far fa-heart favorite-icon"></i>
                                {favoritesCount > 0 && (
                                    <h4 className="favoriteItems-num">{favoritesCount}</h4>
                                )}
                            </div>
                        </Link>
                        <Link to="/cart">
                            <div className="icon-wrapper">
                                <i className="fas fa-shopping-cart shopping-cart-icon"></i>
                                {cartCount > 0 && (
                                    <h4 className="cartItems-num">{cartCount}</h4>
                                )}
                            </div>
                        </Link>
                        <div className="user-menu" onClick={toggleDropdown}>
                            <p><i className="fas fa-user login-icon" ref={iconRef}></i></p>
                            <div
                                ref={dropdownRef}
                                className={`dropdown-container ${isDropdownVisible ? 'show' : 'hide'}`}
                            >
                                <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
                                    {isAuthenticated ? (
                                        <>
                                            <h3 className="dropdown-welcome">Welcome, {user.username}!</h3>
                                            <div className="logout-section">
                                                <p>Logout of the profile <Link to="/users/logout" className="logout-link" onClick={handleLinkClick}>Logout</Link></p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="dropdown-title">Login/Register</h3>
                                            <div className="login-section">
                                                <p>Already have a profile? <Link to="/users/login" className="login-link" onClick={handleLinkClick}>Login</Link></p>
                                            </div>
                                            <div className="register-section">
                                                <p>You don't have a profile? <Link to="/users/register" className="register-link" onClick={handleLinkClick}>Register</Link></p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-header">
                    <div className="logo-container">
                        <div className="logo-image"></div>
                        <Link to="/" className="logo">HOMELY</Link>
                    </div>
                    <ul className="nav-group">
                        <li className="nav-item"><Link to="/">Home</Link></li>
                        <li className="nav-item header-catalog-link">
                            <a className='catalog'>
                                Catalog
                                <i className="fas fa-chevron-down arrow-icon"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <Link to="/furniture/catalog?category=couches"><li>Couches</li></Link>
                                <Link to="/furniture/catalog?category=beds"><li>Beds</li></Link>
                                <Link to="/furniture/catalog?category=chairs"><li>Chairs</li></Link>
                                <Link to="/furniture/catalog?category=tables"><li>Tables</li></Link>
                                <Link to="/furniture/catalog?category=lamps"><li>Lamps</li></Link>
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
            </nav>
        </header >
    );
};

export default Header;