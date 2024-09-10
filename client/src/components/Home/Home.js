import './Home.css';
import { Link } from 'react-router-dom';
import { CatalogItem } from 'components/Catalog/CatalogItem/CatalogItem';
import { useFurniture } from 'hooks/useFurniture';

const Home = () => {
    const { furniture } = useFurniture();

    return (
        <div className="homepage-wrapper">
            <div className="welcome">
                <div className="welcome-image-container">
                    <img src="/images/welcome-banner.png" alt="banner" />
                    <div className="welcome-text-container">
                        <p className="welcome-text">The Best Interior Design</p>
                        <p className="welcome-subtext">Transform your space with timeless furniture pieces that blend style and
                            comfort.
                        </p>
                        <Link to="/furniture/catalog/couches" className="catalog-btn">See Catalog</Link>
                    </div>
                </div>
            </div>

            <div className="services">
                <div className="service">
                    <i className="fas fa-truck icon"></i>
                    <div className="info">
                        <h3>Free Shipping</h3>
                        <p> Enjoy free shipping on all orders or on orders above a certain amount.</p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-undo-alt icon"></i>
                    <div className="info">
                        <h3>Easy Returns</h3>
                        <p>Hassle-free returns or exchanges within a set period for your satisfaction.
                        </p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-headset icon"></i>
                    <div className="info">
                        <h3>24/7 Customer Support</h3>
                        <p>Round-the-clock support for any questions or issues you might have.</p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-box icon"></i>
                    <div className="info">
                        <h3>Order Tracking</h3>
                        <p>Seamlessly track your order from shipment to doorstep delivery.</p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-lock icon"></i>
                    <div className="info">
                        <h3>Secure Payments</h3>
                        <p>Safe and secure payment methods for a worry-free shopping experience.
                        </p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-couch icon"></i>
                    <div className="info">
                        <h3>Custom Furniture</h3>
                        <p>Design your own furniture with our custom options tailored to your needs.
                        </p>
                    </div>
                </div>
            </div>

            {furniture.length > 0 && (<>
                <div className="recent-items">
                    <div className="section-title">
                        <h1>Recent Items</h1>
                    </div>

                    <div className="product-container">
                        <div className="product-cards">
                            {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                        </div>
                    </div>
                </div>

            </>)}

            <div className="mid-page-banner">
                <div className="image-container">
                    <img src="/images/ban.png" alt="" />
                    <div className="content">
                        <p className="title">Elevate Your Home with Bestsellers</p>
                        <div className="discount">
                            <p className="text">UP TO</p>
                            <p className="percent">25% OFF</p>
                            <p className="text">Selected Sofas</p>
                        </div>
                        <Link to="/furniture/catalog/couches" className="banner-btn">See Catalog</Link>
                    </div>
                </div>
            </div>

            <div className="reviews_section">
                <div className="section-title">
                    <h1 className="section-title">Customer Reviews</h1>
                </div>

                <div className="reviews_box_container">
                    <div className="review_box">
                        <img src="/images/customers/person1.png" alt="customer" />
                        <h3>Jaxon Lester</h3>
                        <div className="star-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <p> Great Furniture and Friendly Service at HOMELY Furniture Shop! The store had a wide range of
                            furniture
                            styles to choose from.</p>
                    </div>
                    <div className="review_box">
                        <img src="/images/customers/person2.png" alt="customer" />
                        <h3>Juliet Chandler</h3>
                        <div className="star-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <p>I purchased furniture from HOMELY Furniture Shop and was so thrilled with my experience. The
                            store
                            had a great selection of furniture that fit my style and budget.
                        </p>
                    </div>
                    <div className="review_box">
                        <img src="/images/customers/person3.png" alt="customer" />
                        <h3>Andrew Roberts</h3>
                        <div className="star-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <p>I had a wonderful experience purchasing from this shop. The quality
                            of the furniture was excellent, and I was able to find exactly what I was looking for.</p>
                    </div>
                    <div className="review_box">
                        <img src="/images/customers/person4.png" alt="customer" />
                        <h3>Irene Monroe</h3>
                        <div className="star-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <p>I discovered this furniture shop a month ago but it quickly became my go-to place for all my
                            furniture needs. The designs are modern and stylish.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;