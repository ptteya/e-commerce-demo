import { AuthContext } from "contexts/AuthContext";
import { CollectionContext } from "contexts/CollectionContext";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './TopHeader.css';

const IconLink = ({ to, iconClass, count }) => (
    <Link to={to}>
        <div className="icon-wrapper">
            <i className={iconClass}></i>
            {count > 0 && <h4 className={`icon-count`}>{count}</h4>}
        </div>
    </Link>
);

const TopHeader = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { guestFavorites, guestCart } = useContext(CollectionContext);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const iconRef = useRef(null);

    const favoritesCount = useMemo(() => (isAuthenticated ? user.favorites.length : guestFavorites.length), [user, isAuthenticated, guestFavorites]);
    const cartCount = useMemo(() => (isAuthenticated ? user.cart?.length : guestCart.length), [user, isAuthenticated, guestCart]);

    const handleClickOutside = useCallback((event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            iconRef.current && !iconRef.current.contains(event.target)
        ) {
            setDropdownVisible(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    const toggleDropdown = () => setDropdownVisible(state => !state);
    const handleLinkClick = () => setDropdownVisible(false);

    return (
        <div className="top-header">
            <div className="top-header-services">
                <p>Fast delivery</p>
                <p>Return in 30 days</p>
                <p>Warranty service</p>
                <p>+359 89 347 2637</p>
            </div>
            <div className="top-header-actions">
                <IconLink to="/favorites" iconClass="far fa-heart favorite-icon" count={favoritesCount} />
                <IconLink to="/cart" iconClass="fas fa-shopping-cart shopping-cart-icon" count={cartCount} />

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
                                        <p>
                                            Logout of the profile
                                            <Link to="/users/logout" className="logout-link" onClick={handleLinkClick}>Logout</Link>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="dropdown-title">Login/Register</h3>
                                    <div className="login-section">
                                        <p>Already have a profile?
                                            <Link to="/users/login" className="login-link" onClick={handleLinkClick}>Login</Link>
                                        </p>
                                    </div>
                                    <div className="register-section">
                                        <p>
                                            You don't have a profile?
                                            <Link to="/users/register" className="register-link" onClick={handleLinkClick}>Register</Link>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;