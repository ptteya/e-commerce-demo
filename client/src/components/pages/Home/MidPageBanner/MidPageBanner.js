import { Link } from "react-router-dom";
import './MidPageBanner.css';

const MidPageBanner = () => {
    return (
        <div className="mid-page-banner">
            <div className="image-container">
                <img src="/images/ban.png" alt="" />
                <div className="content">
                    <p className='sale'>Best Sale</p>
                    <p className="title">Get Best Discount</p>
                    <p className="text">Transform your living space with our collection of stylish and comfortable designs, perfect for every room.</p>
                    <Link to="/furniture?category=couches" className="banner-btn">See Catalog</Link>
                </div>
            </div>
        </div>
    );
};

export default MidPageBanner;