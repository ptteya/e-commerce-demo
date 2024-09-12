import './Catalog.css';
import { Link, useLocation } from 'react-router-dom';
import CatalogItem from './CatalogItem';
import PriceFilter from 'components/PriceFilter';
import { useFetchFurniture } from 'hooks/useFetchFurniture ';

const Catalog = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const furniture = useFetchFurniture(queryParams.toString());

    const category = queryParams.get('category') || '';
    let categoryTitle = category
        ? category[0].toUpperCase() + category.substring(1)
        : 'Search Result';

    return (
        <div className="catalog-wrapper">
            <div className="catalog-title">
                <h3>Category</h3>
                <h1>{categoryTitle}</h1>
                <p>Find all the new items in this category</p>
            </div>
            <div className="catalog-container">
                <div className="catalog-content">
                    <div className="filter-sidebar">
                        <div className="filter-category">
                            <h2 className="filter-title">Product Categories</h2>
                            <ul>
                                <li><Link to="/furniture/catalog?category=couches">Couches</Link></li>
                                <li><Link to="/furniture/catalog?category=beds">Beds</Link></li>
                                <li><Link to="/furniture/catalog?category=chairs">Chairs</Link></li>
                                <li><Link to="/furniture/catalog?category=tables">Tables</Link></li>
                                <li><Link to="/furniture/catalog?category=lamps">Lamps</Link></li>
                            </ul>
                        </div>
                        <div className="filter-category">
                            <PriceFilter />
                        </div>
                        <div className="filter-category">
                            <h2 className="filter-title">Color <i className="fas fa-regular fa-chevron-up arrow arrow-icon"></i>
                            </h2>
                            <div className="filter-content ">
                                <div className="colors-container">
                                    <div className="color-box white"></div>
                                    <div className="color-box gray"></div>
                                    <div className="color-box black"></div>
                                    <div className="color-box brown"></div>
                                    <div className="color-box green"></div>
                                    <div className="color-box yellow"></div>
                                    <div className="color-box pink"></div>
                                    <div className="color-box blue"></div>
                                    <div className="color-box purple"></div>
                                    <div className="color-box red"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-container">
                        {furniture.length > 0 ? (
                            <div className="product-cards">
                                {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                            </div>
                        ) : (
                            <p className="not-available">No furniture available!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;