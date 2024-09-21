import './Cart.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import * as furnitureService from 'services/furnitureService';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { user, isAuthenticated, guestCart } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        async function fetchCartItems() {
            const items = await furnitureService.getCollectionItems('cart', user, isAuthenticated);
            setCartItems(items);
            setTotalPrice(items.reduce((sum, el) => sum + (el.price * el.quantity), 0));
        }

        fetchCartItems();
    }, [user, isAuthenticated, guestCart]);

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            <div className="product-container">
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map(item => (
                            <CartItem key={item._id} {...item} totalPrice={totalPrice} />
                        ))}

                        <div className="total-price">
                            Total Price: $<span className="price">{totalPrice}</span>
                        </div>
                        <div className="buttons">
                            <Link to="/furniture?category=couches" className="btn btn-back">
                                Back to Catalog
                            </Link>
                            <a href="/cart/bought" className="btn btn-buy">
                                Buy
                            </a>
                        </div>
                    </>
                ) : (
                    <p className="no-content">You haven't added any products to the cart!</p>
                )}
            </div>
        </div >
    );
};

export default Cart;