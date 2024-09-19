import './CatalogItem.css';
import { useNavigate } from 'react-router-dom';
import { useCollectionToggle } from 'hooks/useCollectionToggle';

const CatalogItem = ({
    _id,
    name,
    price,
    size,
    images,
    rating
}) => {
    const { added, handleToggle } = useCollectionToggle(_id, 'favorites');
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        if (!e.target.classList.contains('heart-icon')) {
            navigate(`/furniture/${_id}`);
        }
    };

    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        const stars = [];

        for (let i = 1; i <= fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
        }

        if (halfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        for (let i = 1; i <= emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }

        return stars;
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="image-container">
                <img src={images.mainImage} alt="couch" />
                <i className={`heart-icon ${added ? 'fas fa-heart favorites' : 'far fa-heart'}`} onClick={() => handleToggle()}></i>
            </div>
            <div className="product-info">
                <div className="container">
                    <h3>{name}</h3>
                    <div className="star-rating">
                        {renderStars()}
                    </div>
                </div>
                <p className="size"> Size: {size.width} x {size.height} x {size.length} cm</p>
                <p className="price">${price}</p>

            </div>
        </div>
    );
};

export default CatalogItem;