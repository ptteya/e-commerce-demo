import { Link } from "react-router-dom";
import CatalogItem from "../../Catalog/CatalogItem/CatalogItem";
import './RecentItems.css';

const RecentItems = ({ furniture }) => {
    if (furniture.length < 0) return null;

    return (
        <div className="recent-items">
            <div className="section-title">
                <p>Recent Furniture</p>
                <Link to="/furniture" className='more-link'>See More</Link>
            </div>
            <div className="product-container">
                <div className="product-cards">
                    {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                </div>
            </div>
        </div>
    );
};

export default RecentItems;
