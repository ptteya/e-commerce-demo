import { Link } from "react-router-dom";
import './SaleBanner.css';

const SaleBanner = () => {
    return (
        <div className="sale-banner">
            <div className="image-container">
                <img src="/images/sale-banner.png" alt="" />
                <div className="sale-content">
                    <p className='sale-label'>Best Sale</p>
                    <p className="title">Get Amazing Offers</p>
                    <p className="description">Elevate your living space with our collection of stylish and comfortable designs available at incredible prices</p>
                    <p className="short-description">Elevate your space today!</p>
                    <Link to="/furniture" className="banner-btn">Explore Sales</Link>
                </div>
            </div>
        </div>
    );
};

export default SaleBanner;