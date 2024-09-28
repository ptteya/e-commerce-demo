import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { categoryOptions } from 'constants/categoryOptions';
import { formatCategoryTitle } from 'utils/formatCategoryTitle';
import Search from './Search';
import TopHeader from './TopHeader/TopHeader';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <nav className="navbar">
                <TopHeader />

                <div className="main-header">
                    <div className="logo-container">
                        <div className="logo-image"></div>
                        <Link to="/" className="logo">HOMELY</Link>
                    </div>
                    <ul className="nav-group">
                        <li className="nav-item"><Link to="/">Home</Link></li>
                        <li className="nav-item header-catalog-link">
                            <Link className='' onClick={(e) => e.preventDefault()}>
                                Catalog
                                <i className="fas fa-chevron-down arrow-icon"></i>
                            </Link>
                            <ul className='dropdown-menu'>
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
            </nav>
        </header >
    );
};

export default Header;