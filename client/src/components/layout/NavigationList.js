import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "contexts/AuthContext";
import DropdownMenu from "./DropdownMenu";

const getAdminNavItems = () => [
    { path: '/furniture/create', label: 'Create' },
    { path: '/admin/users/role', label: 'Promote' },
];

const NavigationList = ({ listClassName, toggleDropdown, isDropdownOpen, toggleSidebar }) => {
    const { user: { role } } = useContext(AuthContext);

    const navItems = useMemo(() => [
        { path: '/about', label: 'About' },
        { path: '/contacts', label: 'Contacts' },
        ...(role === 'admin' ? getAdminNavItems() : []),
    ], [role]);

    return (
        <ul className={listClassName}>
            <li className='nav-item' onClick={toggleSidebar}><Link to="/">Home</Link></li>

            <DropdownMenu
                toggleMenu={toggleDropdown}
                isMenuOpen={isDropdownOpen}
                toggleSidebar={toggleSidebar}
            />

            {navItems.map(item => (
                <li
                    key={item.path}
                    className='nav-item'
                    onClick={toggleSidebar}
                >
                    <Link to={item.path}>{item.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NavigationList;