import { useCollectionToggle } from 'hooks/useCollectionToggle';
import './CartItem.css';

const CartItem = ({
    _id,
    name,
    price,
    images,
    size,
}) => {
    let { handleToggle, quantity } = useCollectionToggle(_id, 'cart');

    const updateQuantity = (action) => {
        if (action === 'increase') {
            handleToggle(quantity + 1, true);
        } else if (action === 'decrease') {
            if (quantity - 1 > 0) {
                handleToggle(quantity - 1, true);
            }
        }
    };

    return (
        <div className="product" >
            <div className="product-info">
                <img src={images.mainImage} alt="furniture" />
                <div>
                    <h3 className='product-name'>{name}</h3>
                    <p className="size">{size.width} x {size.height} x {size.length}cm</p>
                </div>
            </div>
            <div className="quantity-container">
                <div className="quantity">
                    <button
                        className='decrease'
                        onClick={() => updateQuantity('decrease')}>
                        <i className="fas fa-minus"></i>
                    </button>
                    <p className='count'>{quantity}</p>
                    <button
                        className='increase'
                        onClick={() => updateQuantity('increase')}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <p className="price">${price}</p>
            <p className="remove-furniture" onClick={() => handleToggle()}>Remove</p>
        </div>
    );
};

export default CartItem;