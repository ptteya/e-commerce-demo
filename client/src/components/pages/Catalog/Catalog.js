import './Catalog.css';
import { Link, useLocation } from 'react-router-dom';
import { useFetchFurniture } from 'hooks/useFetchFurniture ';
import CatalogItem from './CatalogItem/CatalogItem';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';

const Catalog = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const furniture = useFetchFurniture(queryParams.toString());

    const category = queryParams.get('category') || '';
    let categoryTitle = category
        ? category[0].toUpperCase() + category.substring(1)
        : 'All Items';

    return (
        <div className="catalog-section">
            <div className="catalog-title">
                <div className="path">
                    <Link to='/' className='homepage'>Home</Link> / <span>{categoryTitle}</span>
                </div>
                <h1>{categoryTitle}</h1>
                <p>Find all the new items in this category</p>
            </div>
            <div className="catalog-container">
                <div className="catalog-content">
                    <div className="filter-sidebar">
                        <div className="filter-category">
                            <p className="filter-title">Product Categories</p>
                            <ul>
                                <li><Link to="/furniture?category=couches">Couches</Link></li>
                                <li><Link to="/furniture?category=beds">Beds</Link></li>
                                <li><Link to="/furniture?category=chairs">Chairs</Link></li>
                                <li><Link to="/furniture?category=tables">Tables</Link></li>
                                <li><Link to="/furniture?category=lamps">Lamps</Link></li>
                                <li><Link to="/furniture">All Items</Link></li>
                            </ul>
                        </div>
                        <PriceFilter />
                        <ColorFilter />
                    </div>
                    <div className="product-container">
                        {furniture.length > 0 ? (
                            <>
                                <p className='results'>{`Total Products (${furniture.length})`} </p>
                                <div className="product-cards">
                                    {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                                </div>
                            </>
                        ) : (
                            <p className="not-available">No furniture available!</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Catalog;