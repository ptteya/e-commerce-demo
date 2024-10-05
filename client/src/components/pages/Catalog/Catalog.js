import './Catalog.css';
import { Link } from 'react-router-dom';
import { useQueryHandler } from 'hooks/useQueryHandler';
import { useFetchFurniture } from 'hooks/useFetchFurniture ';
import { formatCategoryTitle } from 'utils/formatCategoryTitle';
import CatalogItem from './CatalogItem/CatalogItem';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import CategoryFilter from './CategoryFilter';

const Catalog = () => {
    const { searchParams } = useQueryHandler();
    const furniture = useFetchFurniture(searchParams.toString());
    const maxPrice = furniture.length > 0 ? Math.max(...furniture.map(item => item.price)) : 0;

    const category = searchParams.get('category') || '';
    const categoryTitle = formatCategoryTitle(category);

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
                        <PriceFilter maxPrice={maxPrice} />
                        <ColorFilter />
                    </div>
                    <div className="product-container">
                        {furniture.length > 0 ? (
                            <>
                                <p className='results'>{`Total Products (${furniture.length})`}</p>
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
        </div>
    );
};

export default Catalog;