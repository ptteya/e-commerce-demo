import { Link } from "react-router-dom";
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <div className="welcome">
            <div className="welcome-image-container">
                <img src="/images/welcome-banner.png" alt="banner" />
                <div className="welcome-text-container">
                    <p className="welcome-text">Furniture</p>
                    <p className="welcome-text"> Made Just for You</p>
                    <p className="welcome-subtext">Transform your space with timeless furniture pieces that blend style and
                        comfort.
                    </p>
                    <Link to="/furniture" className="catalog-btn">See Catalog <i class="fas fa-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;