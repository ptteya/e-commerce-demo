import './Cart.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import { CollectionContext } from 'contexts/CollectionContext';
import * as collectionService from 'services/collectionService';
import CartItem from './CartItem/CartItem';
import PaymentForm from './PaymentForm/PaymentForm';

const TAX_AMOUNT = 8;

const Cart = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { guestCart } = useContext(CollectionContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        async function fetchCartItems() {
            const items = await collectionService.getCollectionItems('cart', user, isAuthenticated);
            setCartItems(items);
            setTotalPrice(items.reduce((sum, el) => sum + (el.price * el.quantity), 0));
        }

        fetchCartItems();
    }, [user, isAuthenticated, guestCart]);

    return (
        <div className="cart-container">
            <div className="product-container">
                <p className='title'>Shopping Cart</p>
                <p className='items-num'>You have {cartItems.length} items in your cart</p>
                {cartItems.length > 0 && (
                    <div className='cart-items'>
                        {cartItems.map(item => (
                            <CartItem key={item._id} {...item} totalPrice={totalPrice} />
                        ))}

                        <div className="cart-actions">
                            <Link to="/furniture?category=couches" className="btn btn-back">
                                <i className="fas fa-arrow-left"></i>
                                Continue Shopping
                            </Link>

                            <div className="cart-summary">
                                <p className='price'>Subtotal: <span>${totalPrice}</span></p>
                                <p className='price'>Shipping: <span>${TAX_AMOUNT.toFixed(2)}</span></p>
                                <p className='total-price'>Total Price: <span>${totalPrice + TAX_AMOUNT}</span></p>
                            </div>
                        </div>
                    </div>
                )}
            </div >
            {cartItems.length > 0 && <PaymentForm totalPrice={totalPrice + TAX_AMOUNT} />}
        </div >
    );
};

export default Cart;