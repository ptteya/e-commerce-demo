import './CatalogItem.css';
import { useNavigate } from 'react-router-dom';
import { useCollectionManager } from 'hooks/useCollectionManager';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";

const CatalogItem = ({ _id, name, price, size, images }) => {
    const { added: isFavorite, toggleCollectionItem: toggleFavorites } = useCollectionManager(_id, 'favorites');
    const { added: isInCart, toggleCollectionItem: toggleCart } = useCollectionManager(_id, 'cart');
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        if (!e.target.closest('.action')) {
            navigate(`/furniture/${_id}`);
        }
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="card-image">
                <img src={images.mainImage} alt="couch" />

                <i
                    className={`action heart-icon ${isFavorite ? 'favorite' : ''}`}
                    onClick={() => toggleFavorites()}
                >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </i>

                <div className='action add-cart' onClick={() => toggleCart()}>
                    <div className="text">
                        <RiShoppingBagLine className={`bag-icon ${isInCart ? 'in-cart' : ''}`} />
                        <p>{isInCart ? "Remove from cart" : "Add to cart"}</p>
                    </div>
                </div>
            </div>

            <div className="product-info" >
                <div className="container">
                    <h3>{name}</h3>
                </div>
                <p className="size">Size: {size.width} x {size.height} x {size.length} cm</p>
                <p className="price">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CatalogItem;