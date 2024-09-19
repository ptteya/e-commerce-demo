import './Home.css';
import { Link } from 'react-router-dom';
import { useFetchFurniture } from 'hooks/useFetchFurniture ';
import CatalogItem from 'components/Catalog/CatalogItem/CatalogItem';

const Home = () => {
    let furniture = useFetchFurniture();

    const couches = furniture
        .filter(el => el.category === 'couches')
        .slice(-4);

    const beds = furniture
        .filter(el => el.category === 'beds')
        .slice(-4);

    return (
        <div className="homepage-wrapper">
            <div className="welcome">
                <div className="welcome-image-container">
                    <img src="/images/welcome-banner.png" alt="banner" />
                    <div className="welcome-text-container">
                        <p className="welcome-text">Elegant Interiors</p>
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
                        <p className="name">Free Shipping</p>
                        <p className='desc'> Enjoy free shipping on all orders or on orders above a certain amount.</p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-undo-alt icon"></i>
                    <div className="info">
                        <p className='name'>Easy Returns</p>
                        <p className='desc'>Hassle-free returns or exchanges within a set period for your satisfaction.
                        </p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-headset icon"></i>
                    <div className="info">
                        <p className='name'>24/7 Customer Support</p>
                        <p className='desc'>Round-the-clock support for any questions or issues you might have.</p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-box icon"></i>
                    <div className="info">
                        <p className='name'>Order Tracking</p>
                        <p className='desc'>Seamlessly track your order from shipment to doorstep delivery.</p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-lock icon"></i>
                    <div className="info">
                        <p className='name'>Secure Payments</p>
                        <p className='desc'>Safe and secure payment methods for a worry-free shopping experience.
                        </p>
                    </div>
                </div>
                <div className="service">
                    <i className="fas fa-couch icon"></i>
                    <div className="info">
                        <p className='name'>Custom Furniture</p>
                        <p className='desc'>Design your own furniture with our custom options tailored to your needs.
                        </p>
                    </div>
                </div>
            </div>

            {couches.length > 0 && (<>
                <div className="recent-items">
                    <div className="section-title">
                        <p>Explore our Couches</p>
                        <Link to="/furniture/catalog?category=couches" className='more-link'>See More</Link>
                    </div>
                    <div className="product-container">
                        <div className="product-cards">
                            {couches.map((f) => <CatalogItem key={f._id} {...f} />)}
                        </div>
                    </div>
                </div>

            </>)}

            {beds.length > 0 && (<>
                <div className="recent-items">
                    <div className="section-title">
                        <p>Explore our Beds</p>
                        <Link to="/furniture/catalog?category=beds" className='more-link'>See More</Link>
                    </div>
                    <div className="product-container">
                        <div className="product-cards">
                            {beds.map((f) => <CatalogItem key={f._id} {...f} />)}
                        </div>
                    </div>
                </div>

            </>)}

            <div className="mid-page-banner">
                <div className="image-container">
                    <img src="/images/ban.png" alt="" />
                    <div className="content">
                        <p className="title">Furnish Your Dream Home Today! </p>
                        <div className="discount">
                            <p className="percent">25% OFF</p>
                            <p className="text">on selected furniture pieces.Transform your living space with our collection of stylish and comfortable designs, perfect for every room. if you're looking to redesign your entire home our high-quality furniture pieces offer unmatched comfort and style.
                            </p>
                        </div>
                        <Link to="/furniture/catalog?category=couches" className="banner-btn">See Catalog</Link>
                    </div>
                </div>
            </div>

            <div className="reviews-section">
                <p className="reviews-title">Customer Reviews</p>
                <div className="reviews-box-container">
                    <div className="review-box">
                        <img src="/images/customers/person1.png" alt="customer" />
                        <div className="review">
                            <h3>Jaxon Lester</h3>
                            <div className="rating-container">
                                <div className="star-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <p>1 week ago</p>
                            </div>
                            <p> Great Furniture and Friendly Service at HOMELY Furniture Shop! The store had a wide range of
                                furniture
                                styles to choose from.</p>
                        </div>
                    </div>
                    <div className="review-box">
                        <img src="/images/customers/person1.png" alt="customer" />
                        <div className="review">
                            <h3>Jaxon Lester</h3>
                            <div className="rating-container">
                                <div className="star-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <p>2 weeks ago</p>
                            </div>
                            <p> Great Furniture and Friendly Service at HOMELY Furniture Shop! The store had a wide range of
                                furniture
                                styles to choose from.</p>
                        </div>
                    </div>

                    <div className="review-box">
                        <img src="/images/customers/person2.png" alt="customer" />
                        <div className="review">
                            <h3>Juliet Chandler</h3>
                            <div className="rating-container">
                                <div className="star-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p>1 week ago</p>
                            </div>
                            <p>I purchased furniture from HOMELY Furniture Shop and was so thrilled with my experience. The
                                store
                                had a great furniture that fit my style and budget.
                            </p>
                        </div>
                    </div>

                    <div className="review-box">
                        <img src="/images/customers/person3.png" alt="customer" />
                        <div className="review">
                            <h3>Andrew Roberts</h3>
                            <div className="rating-container">
                                <div className="star-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <p>1 month ago</p>
                            </div>
                            <p>I had a wonderful experience purchasing from this shop. The quality
                                of the furniture was excellent, and I was able to find exactly what I was looking for.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;