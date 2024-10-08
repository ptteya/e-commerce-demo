import { Link } from "react-router-dom";
import CatalogItem from "../../Catalog/CatalogItem/CatalogItem";
import './FurnitureCollection.css';

const FurnitureCollection = ({ furniture, subtitle, title }) => {
    if (furniture.length < 0) return null;

    return (
        <div className="collection-section">
            <div className="header-container">
                <div className="title-group">
                    <p className="subtitle">{subtitle}</p>
                    <p className="title">{title}</p>
                </div>
                <Link to="/furniture" className='see-more-link'>See More</Link>
            </div>
            <div className="product-container">
                <div className="product-cards">
                    {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                </div>
            </div>
        </div>
    );
};

export default FurnitureCollection;