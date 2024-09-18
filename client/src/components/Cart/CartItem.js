import { useCollectionToggle } from 'hooks/useCollectionToggle';

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
                    <h2 className='product-name'>{name}</h2>
                    <p className="size">W. {size.width}cm. H. {size.height}cm. L. {size.length}cm</p>
                </div>
            </div>
            <div className="quantity-container">
                <p className='title'>Quantity: </p>
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