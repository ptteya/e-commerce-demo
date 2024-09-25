import { Link } from "react-router-dom";
import './FooterSection.css';

const FooterColumn = ({ className, title, children }) => {
    return (
        <div className={`footer-column ${className}`}>
            {title && <h3 className="col-title">{title}</h3>}
            {children}
        </div>
    );
};

const FooterSection = () => {
    return (
        <div className="footer-section">
            <div className="footer-content">
                <div className='logo'>
                    <Link to={'/'}><div className="logo-image"></div></Link>
                    <Link to={'/'}><h2>HOMELY</h2></Link>
                </div>

                <FooterColumn className='links-col' title='Fast Links'>
                    <ul className="info">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/furniture?category=couches">Catalog</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contacts">Contacts</Link></li>
                    </ul>
                </FooterColumn>

                <FooterColumn title='Information'>
                    <div className="info">
                        <p>Free delivery in Sofia</p>
                        <p>Reliable supplier</p>
                        <p>Personal data protection policy</p>
                        <p>All prices include VAT</p>
                    </div>
                </FooterColumn>

                <FooterColumn title='Contact us'>
                    <div className="info">
                        <p> <i className="fas fa-map-marker-alt contact-icon"></i>6-ti Septemvri 17, Sofia</p>
                        <p> <i className="fas fa-phone-alt contact-icon"></i>+359 89 347 2637</p>
                        <p> <i className="fas fa-envelope contact-icon"></i>homely@gmail.com</p>
                    </div>
                </FooterColumn>

                <FooterColumn title='Follow us'>
                    <div className="icons-row">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                    </div>
                </FooterColumn>
            </div>

            <div className="rights">
                HOMELY Copyright © 2024 HOMELY - All rights reserved
            </div>
        </div>
    );
};

export default FooterSection;