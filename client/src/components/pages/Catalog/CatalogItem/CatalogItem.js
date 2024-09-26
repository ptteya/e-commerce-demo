import './CatalogItem.css';
import { useNavigate } from 'react-router-dom';
import { useCollectionManager } from 'hooks/useCollectionManager';

const CatalogItem = ({
    _id,
    name,
    price,
    size,
    images,
}) => {
    const { added, toggleCollectionItem } = useCollectionManager(_id, 'favorites');
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        if (!e.target.classList.contains('heart-icon')) {
            navigate(`/furniture/${_id}`);
        }
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="image-container">
                <img src={images.mainImage} alt="couch" />
                <i className={`heart-icon ${added ? 'fas fa-heart favorites' : 'far fa-heart'}`} onClick={() => toggleCollectionItem()}></i>
            </div>
            <div className="product-info">
                <div className="container">
                    <h3>{name}</h3>
                </div>
                <p className="size"> Size: {size.width} x {size.height} x {size.length} cm</p>
                <p className="price">${price}</p>
            </div>
        </div>
    );
};

export default CatalogItem;