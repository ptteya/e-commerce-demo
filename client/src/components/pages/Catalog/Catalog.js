import './Catalog.css';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFetchFurniture } from 'hooks/useFetchFurniture ';
import { formatCategoryTitle } from 'utils/formatCategoryTitle';
import CatalogItem from './CatalogItem/CatalogItem';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import CategoryFilter from './CategoryFilter';

const Catalog = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const furniture = useFetchFurniture(queryParams.toString());

    const category = queryParams.get('category') || '';
    const categoryTitle = useMemo(() => formatCategoryTitle(category), [category]);

    return (
        <div className="catalog-section">
            <div className="catalog-title">
                <h1>{categoryTitle}</h1>
                <div className="path">
                    <Link to='/' className='homepage'>Home</Link> / <span>{categoryTitle}</span>
                </div>
            </div>
            <div className="catalog-container">
                <div className="catalog-content">
                    <div className="filter-sidebar">
                        <CategoryFilter />
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