import { Link } from "react-router-dom";
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <div className="welcome">
            <div className="welcome-image-container">
                <img src="/images/welcome-banner.png" alt="banner" />
                <div className="welcome-text-container">
                    <p className="welcome-text"><span className="subtitle">Discover Quality</span> Furniture for Every Style</p>
                    <p className="welcome-subtext">Create your perfect home with stylish furniture that offers both beauty and comfort
                    </p>
                    <Link to="/furniture" className="catalog-btn">See Catalog <i className="fas fa-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;