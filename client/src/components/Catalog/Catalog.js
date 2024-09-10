import './Catalog.css';
import { Link, useParams } from 'react-router-dom';
import { CatalogItem } from './CatalogItem/CatalogItem';
import { useFurniture } from 'hooks/useFurniture';

const Catalog = () => {
    const { category } = useParams();
    const categoryTitle = category[0].toUpperCase() + category.substring(1);
    const { furniture } = useFurniture(category);

    return (
        <div className="catalog-wrapper">
            <div className="catalog-title">
                <h3>Category</h3>
                {category && <h1>{categoryTitle}</h1>}
                <p>Find all the new items in this category</p>
            </div>
            <div className="catalog-container">
                <div className="catalog-content">
                    <div className="filter-sidebar">
                        <div className="filter-category">
                            <h2 className="filter-title">Product Categories</h2>
                            <ul>
                                <li><Link to="/furniture/catalog/couches">Couches</Link></li>
                                <li><Link to="/furniture/catalog/beds">Beds</Link></li>
                                <li><Link to="/furniture/catalog/chairs">Chairs</Link></li>
                                <li><Link to="/furniture/catalog/tables">Tables</Link></li>
                                <li><Link to="/furniture/catalog/lamps">Lamps</Link></li>
                            </ul>
                        </div>
                        <div className="filter-category">
                            <h2 className="filter-title" htmlFor="price-range">Price Range <i
                                className="fas fa-regular fa-chevron-up arrow arrow-icon"></i></h2>
                            <div className="filter-content">
                                <form className="price-inputs">
                                    <input type="number" id="min-price" name="min-price" min="0" max="1000" defaultValue="100" />
                                    <span className="range-symbol">-</span>
                                    <input type="number" id="max-price" name="max-price" min="0" max="1000" defaultValue="900" />
                                    <button className="price-range-search-btn" type="submit">Filter</button>
                                </form>
                            </div>
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