import { useCollectionManager } from 'hooks/useCollectionManager';
import { RiDeleteBin6Line } from "react-icons/ri";
import './CartItem.css';

const CartItem = ({
    _id,
    name,
    price,
    images,
    size,
}) => {
    let { toggleCollectionItem, updateItemQuantity, quantity } = useCollectionManager(_id, 'cart');

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
                        onClick={() => quantity > 1 && updateItemQuantity(quantity - 1)}>
                        <i className="fas fa-minus"></i>
                    </button>
                    <p className='count'>{quantity}</p>
                    <button
                        className='increase'
                        onClick={() => updateItemQuantity(quantity + 1)}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <p className="price">${price}</p>
            <p className="remove-furniture" onClick={() => toggleCollectionItem()}><RiDeleteBin6Line /></p>
        </div>
    );
};

export default CartItem;